const admin = require('../models/adminSchema')
const keys = Object.keys(admin.paths)
let schema = {}

const typeEnum = {
    String: "String",
    Number: "Number",
    Date: "Date",
    Boolean: "Boolean",
    ObjectId: "ObjectId"
}

keys.forEach(key=>{
    let type = admin.paths[key].options.type.toString().split(' ')
    if(type.length>1){
        type = type[1]
        if(type.includes(typeEnum.String)) type = typeEnum.String
        else if(type.includes(typeEnum.Number)) type = typeEnum.Number
        else if(type.includes(typeEnum.Date)) type = typeEnum.Date
        else if(type.includes(typeEnum.Boolean)) type = typeEnum.Boolean
        else if(type.includes(typeEnum.ObjectId)) type = typeEnum.ObjectId
        schema[key] = type
    }
})


module.exports = {
    "/login": {
        get: {
            tags: ["auth"],
            description: "Login to the system",
            parameters:[
                {
                    name: "phoneNumber",
                    in: "body",
                    description: "test",
                    required: true
                },
                {
                    name: "phoneNumber",
                    in: "path",
                    description: "test",
                    required: true
                },
                {
                    name: "phoneNumber",
                    in: "query",
                    description: "test",
                    required: true
                }
            ],
            requestBody:{
                content: {
                    "application/json":{
                        schema: {
                            type: "object",
                            properies: {
                                schema
                            }
                        }
                    }
                }
            },
            responses: {
                200: {
                    description: "OK",
                    content: {
                        "application/json":{
                            schema: {
                                type: "object",
                                example: {
                                    status: true,
                                    message: "login successfully",
                                    data: schema
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}