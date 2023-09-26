import CustomError from '../component/error/custom'

export default async function(pathParams = {}, queryParams = {}, body = '') {
  body = JSON.parse(body)

  if (2 != 2) {
    throw new CustomError('some error msg', 400)
  }

  return true
}