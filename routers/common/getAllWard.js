const router = require('express').Router()
const WardSchema = require('../../models/wardSchema')
// const {checkAuth} = require('../../middleware/checkAuth')
// const { RoleEnum } = require('../../utils/common')

router.get('/get-all-ward', async(req, res)=>{
    try{
        const wards = await WardSchema.find({})
        return res.status(200).json({
            status: true,
            message: "list of ward",
            data: wards
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
