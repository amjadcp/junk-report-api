const mongoose = require('mongoose')

// const obj = {
//     name: {type: String},
//     phoneNumber: {
//         type: String,
//         maxLength: 11,
//         unique: true
//     },
//     role:{
//         type: String,
//         enum: {
// 			values: ["admin", "ward-admin"],
// 			message: "{VALUE} is not supported"
// 		}
//     },
//     wardId: {type: mongoose.Schema.Types.ObjectId},
//     wardNo: {type: String}
// }
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
    wardId: {type: mongoose.Schema.Types.ObjectId},
    wardNo: {type: String}
},{timestamps:true})

module.exports = mongoose.model('AdminSchema', AdminSchema)
// module.exports = AdminSchema