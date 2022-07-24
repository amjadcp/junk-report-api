const router = require('express').Router()
const TicketSchema = require('../../models/ticketSchema')
const {checkAuth} = require('../../middleware/checkAuth')


router.get('/get-ticket/:wardNo', checkAuth, async(req, res)=>{
    try{
        let {wardNo} = req.params
        if(isNaN(wardNo)) wardNo = req.user.wardNo
        let tickets = await TicketSchema.find({wardNo:wardNo, isCollect: false})
        if(tickets.length!==0){
            return res.status(200).json({
                status: false,
                message: "collected",
                data: tickets
            })
        }else{
            return res.status(404).json({
                status: false,
                message: "tickets not found",
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