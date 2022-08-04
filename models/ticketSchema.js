const mongoose = require('mongoose')
const TicketSchema = new mongoose.Schema({
    name: String,
    phoneNumber: String,
    wardNo: String,
    houseNo: String,
    address: String,
    pincode: String,
    waste: [String],
    weight: Number,
    isCollect: {
        type: Boolean,
        default: false
    }

},{timestamps:true})

module.exports = mongoose.model("TicketSchema", TicketSchema)