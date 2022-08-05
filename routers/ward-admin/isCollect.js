const router = require('express').Router()
const TicketSchema = require('../../models/ticketSchema')
const IssueSchema = require('../../models/issueSchema')
const {checkAuth} = require('../../middleware/checkAuth')
const { sendSms } = require('../../utils/sms')


router.put('/is-collect/:ticketId', checkAuth, async(req, res)=>{
    try{
        let ticket = await TicketSchema.findOneAndUpdate({_id:req.params.ticketId}, {isCollect: true})
        if(ticket){
            const issue = IssueSchema.findOne({ticketId: ticket._id, solved: false})
            console.log(issue);
            if(issue){
                sendSms('9746825733',
                `
                Issue solved
                Issue ID : ${issue._id}
                Ward No  : ${issue.wardNo}
                This message from JUNK REPORT

                `
                )
            }
            let i = await IssueSchema.findOne({ticketId: ticket._id})
            i.solved = true
            await i.save()
            sendSms(ticket.phoneNumber,
            `
            Waste collection completed
            Ticket ID : ${ticket._id}
            This message from JUNK REPORT
            ` 
            )
            
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