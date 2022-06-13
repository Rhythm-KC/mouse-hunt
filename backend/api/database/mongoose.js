const mongoose = require('mongoose')
const uri = process.env.MONGO_URI 
mongoose.Promise = global.Promise;
mongoose.connect(uri).then(console.log('connected to the database'))
.catch((error)=>console.log(error));

module.exports = mongoose;