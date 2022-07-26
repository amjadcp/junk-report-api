const router = require('express').Router()
const { checkAuth } = require('../../middleware/checkAuth')
const TicketSchema = require('../../models/ticketSchema')
const IssueSchema = require('../../models/issueSchema')

router.get('/ticket-count/:wardNo', checkAuth, async(req, res)=>{
    try{
        
        let {wardNo} = req.params
        let filterTicket = {}
        let filterIssue = {solved: false}
        console.log(req.query.date);
        if(req.query.date!=='null'){
            filterTicket.createdAt = {
                "$gte": new Date(new Date(req.query.date).setHours(00, 00, 00)),
                "$lt": new Date(new Date(req.query.date).setHours(23, 59, 59))
            }
            filterIssue.createdAt = {
                "$gte": new Date(new Date(req.query.date).setHours(00, 00, 00)),
                "$lt": new Date(new Date(req.query.date).setHours(23, 59, 59))
            }
        }
        if(req.user.role==="ward-admin"){
            filterTicket.wardNo=req.user.wardNo
            filterIssue.wardNo=req.user.wardNo
        }else if(wardNo!=='null'){
            filterTicket.wardNo=wardNo
            filterIssue.wardNo=wardNo
        }
        const total = await TicketSchema.find(filterTicket).count()
        filterTicket.isCollect=false
        const pending = await TicketSchema.find(filterTicket).count()
        const issues = await IssueSchema.find(filterIssue).count()
        return res.status(200).json({
            status: true,
            message: "ticket count",
            data: { total:total, pending:pending, completed:total-pending, issues }
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