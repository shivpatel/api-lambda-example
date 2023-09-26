locals {
  zip_name = "api_code.zip"
}

data "archive_file" "api_code" {
  type        = "zip"
  source_dir  = "../../src"
  output_path = local.zip_name
}

resource "aws_lambda_function" "api" {
  function_name = "api-lambda-example-dev"
  runtime       = "nodejs18.x"
  role          = aws_iam_role.lambda.arn

  vpc_config {
    subnet_ids = ["subnet-0", "subnet-1"]
    security_group_ids = ["sg-0"]
  }

  filename         = local.zip_name
  handler          = "handler.handler"
  source_code_hash = data.archive_file.api_code.output_base64sha256

  environment {
    variables = {
        MONGO_URI = "..."
    }
  }

}

resource "aws_lambda_permission" "api_gw" {
  statement_id  = "AllowExecutionFromAPIGateway"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.api.function_name
  principal     = "apigateway.amazonaws.com"

  source_arn = "${aws_apigatewayv2_api.api.execution_arn}/*/*"
}