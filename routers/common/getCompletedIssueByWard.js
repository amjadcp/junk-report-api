const router = require('express').Router()
const { checkAuth } = require('../../middleware/checkAuth')
const IssueSchema = require('../../models/issueSchema')
const TicketSchema = require('../../models/ticketSchema')
// const { RoleEnum } = require('../../utils/common')

router.get('/get-completed-issues/:wardNo', checkAuth, async(req, res)=>{
    try{
        let {wardNo} = req.params
        if(isNaN(wardNo)) wardNo = req.user.wardNo
        const issues = await IssueSchema.find({wardNo: wardNo, solved: true})
        let ids  = []
        if(issues.length !==0){
            issues.forEach(issue=> ids.push(issue.ticketId))
            const tickets = await TicketSchema.find({_id: {$in: ids}})
            return res.status(200).json({
                status: true,
                message: "list of tickets",
                data: tickets
            })
        }else{
            return res.status(404).json({
                status: true,
                message: "issues not found",
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
