const mongoose = require('mongoose')

const IssueSchema = new mongoose.Schema({
    ticketId: mongoose.Schema.Types.ObjectId,
    wardNo: String,
    phoneNumber: String,
    solved: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model("IssueSchema", IssueSchema)