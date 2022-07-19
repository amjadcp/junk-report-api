const router = require('express').Router()
const AdminSchema = require('../../models/adminSchema')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')

router.post('/verify-otp', async(req, res)=>{
    try{
        if (req.headers.authorization) {
            const token = req.headers.authorization.split(" ")[1]
            const {otp} = req.body
            const payload = jwt.verify(token, process.env.SECRET)
            console.log(payload);
            if(payload && payload.otp===otp){
                const admin = await AdminSchema.findOne({_id: mongoose.Types.ObjectId(payload.id)})
                if(admin && admin!==null){
                    const token = jwt.sign(
                        {
                            id: admin._id.toString(), 
                            name: admin.name,
                            role: admin.role,
                            phoneNumber: admin.phoneNumber,
                            ward: admin.ward
                        }, 
                        process.env.SECRET, { expiresIn: '30d' });
                    return res.status(200).json({
                        status: true,
                        message: "logged in",
                        data: {token, role: admin.role}
                    })
                }
                else{
                    return res.status(404).json({
                        status: false,
                        message: "Invalid cred",
                        data: null
                    }) 
                }
            }
            else{
                return res.status(404).json({
                    status: false,
                    message: "Invalid cred",
                    data: null
                }) 
            }
        }
        else{
            return res.status(404).json({
                status: false,
                message: "jwt not found",
                data: null
            }) 
        }
    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            status: false,
            message: "something went wrong",
            data: null
        })
    }
    
})

module.exports = router
