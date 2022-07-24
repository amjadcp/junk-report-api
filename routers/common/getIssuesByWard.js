const router = require('express').Router()
const { checkAuth } = require('../../middleware/checkAuth')
const IssueSchema = require('../../models/issueSchema')
// const { RoleEnum } = require('../../utils/common')

router.get('/get-issues', checkAuth, async(req, res)=>{
    try{
        const issues = await IssueSchema.find({wardNo: req.user.wardNo})
        return res.status(200).json({
            status: true,
            message: "list of ward",
            data: issues
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
