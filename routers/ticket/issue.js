const router = require('express').Router()
const IssueSchema = require('../../models/issueSchema')
const TicketSchema = require('../../models/ticketSchema')
const { sendSms } = require('../../utils/sms')
router.post('/report', async(req, res)=>{
    try{
        let { ticketId, phoneNumber } = req.body
        let ticket = await TicketSchema.findOne({_id: ticketId, phoneNumber: phoneNumber})
        if(ticket && ticket!==null){
            newIssue = new IssueSchema({ticketId, wardNo: ticket.wardNo, phoneNumber})
            await newIssue.save()
            sendSms(phoneNumber, 
            `
            Your issue is successfully send to the admin.
            Your issue ID : ${newIssue._id}
            This message from JUNK REPORT
            `
            )
            return res.status(201).json({
                status: true,
                message: "issue created",
                data: null
            })
        }else{
            return res.status(404).json({
                status: true,
                message: "Ticket not found",
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