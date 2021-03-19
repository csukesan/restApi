const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    Userid:{
        type: Number,
        required: true,
        unique: true
    },
    Name:{
        type: String,
        required: true
    },
    Surname:{
        type: String,
        required: true
    },
    Email:{
        type: String,
        required: true,
        unique: true
    },
});



module.exports = mongoose.model("Users", UserSchema);