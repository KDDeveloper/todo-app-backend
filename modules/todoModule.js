const TodoList = require("../models/todoListSchema");

exports.createTodoList = async(req,res,next)=>{
    // let id = req.params.id
try {
    const newTodoList = await new TodoList({
        date:req.body.date,
        title:req.body.title,
        userId:req.body.id,
        todo:[{todoItem:req.body.todoItem,completed:false}]
    })

    const savedTodoList = await newTodoList.save();

    // const addFirstTodoItem = await TodoList.findOneAndUpdate({agentId:req.body.agentId},{
    //     $push:{todoList:req.body.todoItem}})

    res.send(savedTodoList);

} catch (error) {
     res.status(500).send({message:"Error creating the todo list-",error});
}

};

exports.addToTodoList = async(req,res,next)=>{
    try {
        const todoid = req.params.todoid
        const response = await TodoList.findByIdAndUpdate(todoid,{
            $push:{todo:{todoItem:req.body.todoItem, completed:false}}
        }) 
        res.send(response);
    } catch (error) {
        res.status(500).send({message:"Error adding the todo-",error});
    }
}

exports.getAlltodoLists = async(req,res,next) =>{
    try {
        
        const response = await TodoList.find({userId:req.params.id})

        res.send(response);

    } catch (error) {
        res.status(500).send({message:"Error finding todo lists-",error});
    }
}


exports.getOneTodoLists = async(req,res,next) =>{
    try {
        
        const response = await TodoList.findById(req.params.id);

        res.send(response);

    } catch (error) {
        res.status(500).send({message:"Error finding todo list-",error});
    }
}

exports.deleteOneTodoLists = async(req,res,next) =>{
    try {
        
        const response = await TodoList.findByIdAndDelete(req.params.id);

        res.send(response);

    } catch (error) {
        res.status(500).send({message:"Error finding todo list-",error});
    }
}

exports.findandUpdateCompleted = async(req,res,next) =>{
    try {
        
        const response = await TodoList.updateOne({_id:req.params.id,"todo._id":`${req.params.itemid}`},{
            $set:{
                "todo.$.completed":`${req.body.completed}`
            }
        });

        res.send(response);

    } catch (error) {
        res.status(500).send({message:"Error updating completed status-",error});
    }
}

exports.findandDeleteOneTodoItem = async(req,res,next) =>{
    try {
        
        const response = await TodoList.findOneAndUpdate({_id:req.params.id},{
            $pull:{
                todo:{_id:req.params.itemid}
            }
        });

        res.send(response);

    } catch (error) {
        res.status(500).send({message:"Error updating completed status-",error});
    }
}

