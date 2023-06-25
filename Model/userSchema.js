const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name:
    {
        type:String,
        required:true,
    },
    email:
    {
        type:String,
        required:true,
        unique: true
    },
    password:
    {
        type:String,
        required:true,
    },
    phone:
    {
        type:String,
        required:true,
    },
    address:
    {
        type:String,
        required:true,
    },
    role:
    {
        type:String,
        default:"user"
    },
})

module.exports = mongoose.model("users", userSchema);