function requireEnv(varName) {
  const val = process.env[varName]
  if (val === undefined) {
    throw `${varName} required`
  }
  return val
}

module.exports = {
  mongoUri: requireEnv('MONGO_URI'),
}