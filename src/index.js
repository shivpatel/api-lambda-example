import mongoose from 'mongoose'

import CustomError from './component/error/custom'
import env from './component/config/env'
import router from './router'

let ctx = { db: null, env }

module.exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;

  if (ctx.db === null) {
    ctx.db = mongoose.createConnection(env.mongoUri, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      serverSelectionTimeoutMS: 5000
    })
  }

  await ctx.db.asPromise();

  let body
  let statusCode = 200
  const headers = { 'Content-Type': 'application/json' }

  try {
    const handler = router[event.requestContext?.resourceId]

    if (handler === undefined) {
      throw new CustomError(`unsupported route: '${event.requestContext?.resourceId}'`, 400)
    }

    body = await handler(ctx, event.pathParameters, event.queryStringParameters, event.body)

  } catch (err) {
    statusCode = err.code || 500
    body = err.message || err.toString()
    
  }

  return {
    statusCode,
    body: JSON.stringify(body),
    headers,
  }
}