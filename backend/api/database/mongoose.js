const env = require('dotenv')
env.config()
const mongoose = require('mongoose')
mongoose.Promise = global.Promise;
console.log(process.env.MONGO_URI)
mongoose.connect(process.env.MONGO_URI).then(console.log('connected to the database'))
.catch((error)=>console.log(error));

module.exports = mongoose;