const mongoose = require('mongoose')

const WardSchema = new mongoose.Schema({
    wardNo: {
        type: String,
        unique: true,
    },
    wardAdmin: mongoose.Schema.Types.ObjectId,

},{timestamps:true})

module.exports = mongoose.model("WardSchema", WardSchema)