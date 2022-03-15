const jwt = require("jsonwebtoken");

exports.authUser = (req,res,next)=>{
    {
          const token = req.cookies.userToken;
          console.log(token)
          if (token){
            try{
              req.admin = jwt.verify(token,"T0D/@");
              next();
            }
            catch(error){
                
              res.status(401).send({message:"token Invalid",error});
          }
        } else{
            
            res.status(401).send({message:"Token does not exist"});
          }
        }
}