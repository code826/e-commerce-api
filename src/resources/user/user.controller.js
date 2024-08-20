import validator from "validator";
import UserModel from "./user.model.js";

export default class UserController{
    //register
    register(req,res){

        try {
            const {name,email,password} = req.body;
        
            if(!validator.isEmail(email)){
                return res.stattus(400).json({
                    success:false,
                    message:'Email Is Not Valid'
                });
            }

            //validation for name, password

            if(UserModel.getUserFromEmail(email)){
                return res.status(400).json({
                    success:false,
                    message:`Error : Email ${email} already exist in the system`
                });
            }

            let user = {
                name:name,
                email:email,
                password:password
            };
            let newUser = UserModel.createUser(user);
            //delete newUser.password;
            let newUser1 = {...newUser};
            delete newUser1.password;
            return res.status(200).json({
                success:true,
                data:newUser1
            });
            
        } catch (error) {
            console.log('error',error);
            return res.status(500).json({
                success:false,
                message:'Internal Server Error'
            });
        }
    }

    login(req,res){
        try {
            const {email,password} = req.body;

            if(!email || !validator.isEmail(email)){
                return res.status(400).json({
                    success:false,
                    message:'Email Is Not Valid'
                });
            }
    
           
            let user = UserModel.getUserFromEmail(email);
            if(!user){
                return res.status(400).json({
                    success:false,
                    message:'Email/Password Is Not Valid'
                });
            }

            console.log('user',user);
          
            if(user.password !== password){
                return res.status(400).json({
                    success:false,
                    message:'Email/Password Is Not Valid'
                });
            }
            return res.status(200).json({
                success:true,
                data:'Login Success'
            })
            
        } catch (error) {
            console.log('error',error);
            return res.status(500).json({
                success:false,
                message:'Internal Server Error'
            });
        }
       
    
    }

   
    //login
}