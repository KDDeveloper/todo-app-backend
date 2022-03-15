const route = require("express").Router();
const todoModule = require("../modules/todoModule");
const authenticate = require("../modules/authenticate");

route.post("/create",authenticate.authUser,todoModule.createTodoList);
route.patch("/add/:todoid",authenticate.authUser,todoModule.addToTodoList);
route.patch("/updatecompletestatus/:id/:itemid",authenticate.authUser,todoModule.findandUpdateCompleted);
route.get("/getAll/:id",authenticate.authUser,todoModule.getAlltodoLists);
route.get("/getOne/:id",authenticate.authUser,todoModule.getOneTodoLists);
route.delete("/deleteOne/:id",authenticate.authUser,todoModule.deleteOneTodoLists);
route.delete("/deleteOneTodoItem/:id/:itemid",authenticate.authUser,todoModule.findandDeleteOneTodoItem);

module.exports = route;