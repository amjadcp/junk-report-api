const express = require('express')
const app = express()
require('dotenv').config(`${__dirname}/.env`)
const db = require('./utils/dbconnect')
db.connect()

const auth = require('./routers/auth/auth')
const admin = require('./routers/admin/admin')
const common = require('./routers/common/common')

app.use(express.json());

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

app.listen(process.env.PORT, ()=>console.log(`http://127.0.0.1:${process.env.PORT}`))