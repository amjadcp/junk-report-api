const router = require('express').Router()
const { checkAuth } = require('../../middleware/checkAuth')
const TicketSchema = require('../../models/ticketSchema')

router.get('/ticket-count', checkAuth, async(req, res)=>{
    try{
        let filter = {isCollect:false}
        if(req.user.role==="ward-admin") filter.wardNo=req.user.wardNo
        const total = await TicketSchema.find(filter).count()
        const pending = await TicketSchema.find(filter).count()
        return res.status(200).json({
            status: true,
            message: "ticket count",
            data: { total:total, pending:pending, completed:total-pending }
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