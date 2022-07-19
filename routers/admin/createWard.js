const router = require('express').Router()
const WardSchema = require('../../models/wardSchema')
const {checkAuth} = require('../../middleware/checkAuth')
router.post('/create-ward', checkAuth, async(req, res)=>{
    try{
        const {wardNo} = req.body
        let newWard = new WardSchema({wardNo: wardNo})
        newWard = await newWard.save()
        console.log(newWard);
        return res.status(201).json({
            status: true,
            message: "ward created",
            data: {wardId: newWard._id}
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
