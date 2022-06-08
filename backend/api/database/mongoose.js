const mongoose = require('mongoose')
const uri = "mongodb+srv://rk7527:18113rkc@cluster0.skdeuog.mongodb.net/?retryWrites=true&w=majority"
mongoose.Promise = global.Promise;
mongoose.connect(uri).then(console.log('connected to the database'))
.catch((error)=>console.log(error));

module.exports = mongoose;