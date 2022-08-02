const express = require('express')
const app = express()
// const low = require("lowdb");
// const FileSync = require("lowdb/adapters/FileSync");
// const {join} = require('path');
const morgan = require("morgan");

require('dotenv').config(`${__dirname}/.env`)
const db = require('./utils/dbconnect')
db.connect()
const cors = require('cors')
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
const swaggerUI = require("swagger-ui-express");
const docs = require('./docs');


// cors
const whitelist = ["http://127.0.0.1:5500", "http://127.0.0.1:5501", "https://junk-report-admin.netlify.app", "https://junkreport-public.netlify.app"];

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
// app.use(morgan("dev"));

const auth = require('./routers/auth/auth')
const admin = require('./routers/admin/admin')
const common = require('./routers/common/common')
const ticket = require('./routers/ticket/ticket')
const wardAdmin = require('./routers/ward-admin/wardAdmin')

app.use('/api-docs',swaggerUI.serve,swaggerUI.setup(docs));

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
    admin.editProfile
])

// ward admin
// app.use('/api/ward-admin', [
// ])

// common
app.use('/api/common', [
    common.getAllWard,
    common.getIssuesByWard,
    common.profile
])

// ticket
app.use('/api/ticket', [
  ticket.raiseTicket,
  ticket.ticketCount,
  wardAdmin.isCollect,
  ticket.issue,
  common.getTicketByWard
])

app.listen(process.env.PORT, ()=>console.log(`http://127.0.0.1:${process.env.PORT}`))