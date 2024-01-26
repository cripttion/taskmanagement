const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async ()=>{
    try{
        await mongoose.connect(process.env.DATABASE_URL);
        console.log('connected to MongoDB');
    }catch(error)
    {
        console.error('Error while connecting to database: ',error.message);
    }
}

module.exports= connectDB;