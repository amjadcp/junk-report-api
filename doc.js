const {AutoDoc} = require('express-openapi3.0-generator')

const doc = new AutoDoc()

doc.init({ 
    title: "testinnnnnn",  
    servers: ["http://127.0.0.1:8000"] 
})

doc.endPoints([
    {   
        url: "/login",
        get: {
            tag: "tag",
            description: "somthing",
            summary: "summary",
            body: {
                phoneNumber: {
                    description: "body",
                    required: true,
                }
            },
            path: {
                id: {
                    description: "id",
                    required: true
                }
            },
            query: {
                test: {
                    description: "test",
                    required: false
                }
            },
            responses: {
                200: {
                    description: "OK",
                    response: {
                        sucess: true,
                        message: "yesss",
                        data: {
                            message: "hi"
                        }
                    }
                }
            }
        },
    }
])

module.exports.document = doc.render()