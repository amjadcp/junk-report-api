const router = require('express').Router()
const TicketSchema = require('../../models/ticketSchema')
const IssueSchema = require('../../models/issueSchema')
const {checkAuth} = require('../../middleware/checkAuth')


router.put('/is-collect/:ticketId', checkAuth, async(req, res)=>{
    try{
        let ticket = await TicketSchema.findOneAndUpdate({_id:req.params.ticketId}, {isCollect: true})
        if(ticket){
            await IssueSchema.findOneAndDelete({ticketId: ticket._id})
            return res.status(200).json({
                status: false,
                message: "collected",
                data: null
            })
        }else{
            return res.status(404).json({
                status: false,
                message: "ticket not found",
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