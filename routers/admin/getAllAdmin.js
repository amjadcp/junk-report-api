const router = require('express').Router()
const AdminSchema = require('../../models/adminSchema')
const mongoose = require('mongoose')
const {checkAuth} = require('../../middleware/checkAuth')
const { RoleEnum } = require('../../utils/common')

router.get('/get-all-admin', checkAuth, async(req, res)=>{
    try{
        const admins = await AdminSchema.find({role: RoleEnum.WARD_ADMIN}).sort({wardNo: 1})
        return res.status(200).json({
            status: true,
            message: "list of admin",
            data: admins
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
