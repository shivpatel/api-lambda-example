provider "aws" {
  region = var.region
}

data "aws_caller_identity" "current" {}

variable "region" {
  default = "us-east-1"
}