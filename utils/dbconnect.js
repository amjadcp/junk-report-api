const mongoose = require('mongoose')

module.exports.connect=()=>{
    mongoose.connect(
        process.env.MONGO_URI,
        {
            serverSelectionTimeoutMS: 5000,
        }
    )
    .then(()=>console.log('DB Connected'))
    .catch(err=>console.log(err))
}