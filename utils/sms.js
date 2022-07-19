const client = require('twilio')(process.env.ACCOUNT_SID, process.env.AUTH_TOKEN);

module.exports.sendSms=async(to, body)=>{
    await client.messages
    .create({
        body: body,
        from: process.env.TWILIO_NUMBER,
        to: `+91${to}`
    })
    .then(message => console.log(message.sid))
    .catch(err=>console.log(err))
}