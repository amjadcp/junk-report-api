const router = require('express').Router()
const TicketSchema = require('../../models/ticketSchema')
const AdminSchema = require('../../models/adminSchema')
const {checkAuth} = require('../../middleware/checkAuth')


router.get('/profile', checkAuth, async(req, res)=>{
    try{
        let user = await AdminSchema.findOne({_id: req.user.id})
        // console.log(req.user.id);
        if(user&& user!==null){
            return res.status(200).json({
                status: false,
                message: "data fetch",
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