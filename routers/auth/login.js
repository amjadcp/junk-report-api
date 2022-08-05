const router = require('express').Router()
const AdminSchema = require('../../models/adminSchema')
const otpGenerator = require('otp-generator')
const { sendSms } = require('../../utils/sms')
const jwt = require('jsonwebtoken')

router.post('/login', async(req, res)=>{
    try{
        const {phoneNumber} = req.body
        const admin = await AdminSchema.findOne({phoneNumber: phoneNumber})
        if(admin && admin!==null){
            const otp = otpGenerator.generate(4, { upperCaseAlphabets: false, specialChars: false, lowerCaseAlphabets: false })
            sendSms(admin.phoneNumber, `OTP for login to JUNK REPORT : ${otp}`)
            console.log(otp);
            const token = jwt.sign({id: admin._id.toString(), otp: otp.toString()}, process.env.SECRET, { expiresIn: '1d' });
            return res.status(200).json({
                status: true,
                message: "otp sends",
                data: {token}
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