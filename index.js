const express = require('express')
const app = express()
require('dotenv').config(`${__dirname}/.env`)
const db = require('./utils/dbconnect')
db.connect()
const cors = require('cors')
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
// cors
const whitelist = ["http://127.0.0.1:5500"];

app.set("trust proxy", 1);

const corsOptions = {
  // eslint-disable-next-line consistent-return
  origin(origin, callback) {
    if (!origin) { // for mobile app and postman client
      return callback(null, true);
    }
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));

const auth = require('./routers/auth/auth')
const admin = require('./routers/admin/admin')
const common = require('./routers/common/common')
const ticket = require('./routers/ticket/ticket')

// auth
app.use('/api/auth', [
    auth.login,
    auth.verifyOtp  
])

// admin
app.use('/api/admin', [
    admin.createAdmin,
    admin.createWard,
    admin.getAllAdmin,
])

// common
app.use('/api/common', [
    common.getAllWard
])

// ticket
app.use('/api/ticket', [
  ticket.raiseTicket,
  ticket.ticketCount
])

app.listen(process.env.PORT, ()=>console.log(`http://127.0.0.1:${process.env.PORT}`))