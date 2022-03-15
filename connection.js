exports.connect = ()=>{
    try {
        const mongoose = require("mongoose");
        mongoose.connect("mongodb+srv://KD:KD1996@cluster0.m6jd5.mongodb.net/todo-app-db?retryWrites=true&w=majority",{useNewUrlParser:true, useUnifiedTopology:true});
        console.log("connected");
    } catch (error) {
        console.warn(error);
        process.exit();
    }
}