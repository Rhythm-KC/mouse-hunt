const mongoose = require('mongoose')

const connectDB = async ()=>{
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log(`connect to: ${conn.connection.host}`)
    }catch(er){
        console.log(er)
        process.exit(1)
    }
}

module.exports = connectDB