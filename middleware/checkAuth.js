const jwt = require('jsonwebtoken')

module.exports.checkAuth=(req, res, next)=>{
    try{
        if (req.headers.authorization) {
            const token = req.headers.authorization.split(" ")[1]
            req.user = jwt.verify(token, process.env.SECRET)
            next()
        }
        else{
            return res.status(404).json({
                status: false,
                message: "jwt?",
                data: null
            })
        }
    }catch(err){
        console.log(err);
        return res.status(500).json({
            status: false,
            message: "something went wrong",
            data: null
        })
    }
}