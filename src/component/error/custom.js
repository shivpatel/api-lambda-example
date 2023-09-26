export default class CustomError extends Error {
  constructor(message = 'unknown error', code = 500) {
    super(message)

    this.name = 'CustomError'
    this.message = message
    this.code = code
  }
}