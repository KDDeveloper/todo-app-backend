const route = require("express").Router();
const user = require("../modules/userModule");

route.post("/signup",user.signUpUser);
route.post("/login",user.loginUser);



module.exports = route;
