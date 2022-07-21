const router = require('express').Router()
const TicketSchema = require('../../models/ticketSchema')
const { sendSms } = require('../../utils/sms')

router.post('/raise-ticket', async(req, res)=>{
    try{
        const {name, phoneNumber, wardNo, houseNo, address, pincode, waste, weight} = req.body
        const newTicket = new TicketSchema({name, phoneNumber, wardNo, houseNo, address, pincode, waste, weight})
        await newTicket.save()
        sendSms(phoneNumber, 
        `
        Your ticket is successfully raised and the ticket ID : ${newTicket._id}
        This message from JUNK REPORT
        `
        )
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