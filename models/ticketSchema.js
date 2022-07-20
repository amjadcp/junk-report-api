const mongoose = require('mongoose')

const TicketSchema = new mongoose.Schema({
    wardId: mongoose.Schema.Types.ObjectId,
    wardNo: String,
    waste: String,
    address: String,
    name: String,
    phoneNumber: String,
    isCollect: {
        type: Boolean,
        default: false
    }

},{timestamps:true})

module.exports = mongoose.model("TicketSchema", TicketSchema)