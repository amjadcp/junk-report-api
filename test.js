// const accountSid = 'AC96eba671497b883b77002299be4b958d';
// const authToken = '3bae3332b5bdbfc895897d28de43c5bb';
// const client = require('twilio')(accountSid, authToken);

// client.messages
//   .create({
//      body: 'This is the ship that made the Kessel Run in fourteen parsecs?',
//      from: '+19704995264',
//      to: '+918592052033'
//    })
//   .then(message => console.log(message.sid));

const otpGenerator = require('otp-generator')
const OTP = otpGenerator.generate(4, { upperCaseAlphabets: false, specialChars: false, lowerCaseAlphabets: false })
console.log(OTP);