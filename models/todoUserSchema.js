const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const todoUserSchema = new Schema({

    date:{
        type:String,
        required:true,
    },

    firstName:{
        type:String,
        minlength:3,
        maxlength:20,
        required:true
    },

    lastName:{
        type:String,
        minlength:3,
        maxlength:20,
        required:true
    },

    emailId:{
        type:String,
        required:true,
    },

    password:{
        type:String,
        required:true
    },

    todoList:{
        type:[Object],
    }
});

const User = mongoose.model("User",todoUserSchema,"User");

module.exports = User;