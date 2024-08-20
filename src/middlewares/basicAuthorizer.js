//we need to check if user is login and not

import UserModel from "../resources/user/user.model.js";
import { decodeBase64 } from "../utils.js";

const basicAuthorizer = (req,res,next) => {
    //just read the headers
    const dataEncoded = req.headers['authorization'].split(" ")[1];
   
    if(!dataEncoded){
        return res.status(401).json({
            success:false,
            message:'Unauthorized'
        });
    }
    let dataDecode = decodeBase64(dataEncoded);
    const [email,password] = dataDecode.split(":");
    let user = UserModel.userSignIn(email,password);
    if(!user){
        return res.status(401).json({
            success:false,
            message:'Unauthorized'
        });
    }
    req.user = user;
    console.log('user',req.user);
    next();
}

export default basicAuthorizer;