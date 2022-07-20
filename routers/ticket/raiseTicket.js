const router = require('express').Router()
const TicketSchema = require('../../models/ticketSchema')


router.post('/raise-ticket', async(req, res)=>{
    try{
        const {wardId, wardNo, waste, address, name, phoneNumber} = req.body
        const newTicket = new TicketSchema({wardId, wardNo, waste, address, name, phoneNumber})
        await newTicket.save()
        return res.status(201).json({
            status: true,
            message: "ticket raised",
            data: null
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