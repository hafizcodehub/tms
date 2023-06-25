const mongoose = require('mongoose');

const ticketSchema = mongoose.Schema({
    username: {
        type: String,
        required : true
    },
    useremail: {
        type: String,
        required : true
    },
    subject :{
        type:String,
        required:true
    },
    message :{
        type:String,
        required:true
    },
    assignedAgent :{
        type:String,
        default: "Not Assigned Yet"
    },
    status :{
        type:String,
        default: "pending"
    },

})

module.exports = mongoose.model("tickets", ticketSchema)