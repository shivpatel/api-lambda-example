import mongoose from 'mongoose'

const PersonSchema = new mongoose.Schema({
  name: String
}, { timestamps: true })

module.exports = (ctx) => ctx.db.model('Person', PersonSchema)