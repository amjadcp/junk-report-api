const mongoose = require('mongoose')

const AdminSchema = new mongoose.Schema({
    name: String,
    phoneNumber: {
        type: String,
        maxLength: 11,
        unique: true
    },
    role:{
        type: String,
        enum: {
			values: ["admin", "ward-admin"],
			message: "{VALUE} is not supported"
		}
    },
    wardId: mongoose.Schema.Types.ObjectId,
    wardNo: String
},{timestamps:true})

module.exports = mongoose.model('AdminSchema', AdminSchema)