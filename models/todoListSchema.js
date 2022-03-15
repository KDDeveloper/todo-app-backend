const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const todoListSchema = new Schema({

    date:{
        type:String,
        required:true,
    },

    title:{
        type:String,
        required:true,
    },

    userId:{
        type:String,
        required:true
    },

    todo:{
        type:[{
            todoItem:{
                type:String,
            },
            completed:{
                type:Boolean,
            }
        }]
    }

 
});

const TodoList = mongoose.model("todoList",todoListSchema,"todoList");

module.exports = TodoList;