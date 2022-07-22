const router = require('express').Router()
const TicketSchema = require('../../models/ticketSchema')
const {checkAuth} = require('../../middleware/checkAuth')


router.get('/get-ticket', checkAuth, async(req, res)=>{
    try{
        let tickets = await TicketSchema.find({wardNo:req.user.wardNo})
        console.log(req.user.wardNo, tickets);
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