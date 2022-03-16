const User = require("../models/todoUserSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.signUpUser = async(req,res,next)=>{
    
    try {
        const user = await User.findOne({emailId:req.body.emailId});
        if(user){
           return res.status(400).send({error:"This email id already is in use."});
        }

        const salt = await bcrypt.genSalt();
        req.body.password = await bcrypt.hash(req.body.password,salt);

        
        
        const newUser = await new User({
            date:req.body.date,
            firstName:req.body.firstName,
            lastName:req.body.lastName,
            emailId:req.body.emailId,
            password:req.body.password,
        })
        const savedUser = await newUser.save();
        res.send(savedUser);
        // res.send({message:"Registeration is successful!"});
    } catch (error) {
        res.status(500).send({message:"Error registering User-",error});
        // res.sendStatus(500);
    }
}

exports.loginUser = async(req,res,next) =>{
    try {
 
        const user = await User.findOne({emailId:req.body.emailId});
        if(!user){
           return res.status(403).send({error:"This email id has no account, please sign up."});
        }  

        const isValid = await bcrypt.compare(req.body.password,user.password);

        if(!isValid){
            return res.status(403).send({error:"The email or password is incorrect"});
    
        }

        const authToken = jwt.sign({userId:user._id, emailId:user.emailId},"T0D/@",{expiresIn:"10d"});

        res.cookie('userToken',authToken,{
            expires: new Date(new Date().getTime() + 360 * 1000),
            sameSite:'None',
            secure:true,
            httpOnly: true
        });

        res.send(user);

    } catch (error) {
        res.status(500).send({message:"Error logging in User-",error});
    }
}