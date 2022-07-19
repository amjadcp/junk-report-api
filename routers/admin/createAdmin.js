const router = require('express').Router()
const AdminSchema = require('../../models/adminSchema')
const WardSchema = require('../../models/wardSchema')
const {RoleEnum} = require('../../utils/common')
const mongoose = require('mongoose')
const {checkAuth} = require('../../middleware/checkAuth')

router.post('/create-admin', checkAuth, async(req, res)=>{
    try{
        console.log(req.body);
        const {name, phoneNumber, wardId} = req.body
        let newAdmin = new AdminSchema({name: name, phoneNumber: phoneNumber, role: RoleEnum.WARD_ADMIN, wardId: mongoose.Types.ObjectId(wardId)})
        newAdmin = await newAdmin.save()
        let ward = await WardSchema.findOne({_id: mongoose.Types.ObjectId(wardId)})
        ward.wardAdmin = newAdmin._id
        await ward.save()
        return res.status(201).json({
            status: true,
            message: "admin created",
            data: null
        })
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
