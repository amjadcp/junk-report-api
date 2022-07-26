const router = require('express').Router()
const TicketSchema = require('../../models/ticketSchema')
const AdminSchema = require('../../models/adminSchema')
const {checkAuth} = require('../../middleware/checkAuth')


router.put('/edit-profile/:wardNo', checkAuth, async(req, res)=>{
    try{
        let {wardNo} = req.params
        let {name, phoneNumber} = req.body
        if(isNaN(wardNo)) wardNo = req.user.wardNo
        if(name==='' || phoneNumber===''){
            return res.status(400).json({
                status: false,
                message: "fields cant be empty",
                data: null
            })
        }
        let user = await AdminSchema.findOneAndUpdate({wardNo: wardNo}, {name, phoneNumber})
        // console.log(req.user.id);
        if(user&& user!==null){
            return res.status(200).json({
                status: false,
                message: "data updated",
                data: user
            })
        }else{
            return res.status(404).json({
                status: false,
                message: "user not found",
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