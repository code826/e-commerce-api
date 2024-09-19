import validator from "validator";
import UserModel from "./user.model.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { hashPassword, verifyPassword } from "../../utils.js";

//dotenv.config();
export default class UserController {
  //register
  async register(req, res) {
    try {
      const { name, email, password } = req.body;

      if (!validator.isEmail(email)) {
        return res.stattus(400).json({
          success: false,
          message: "Email Is Not Valid",
        });
      }

      //validation for name, password
      let user1 = await UserModel.getUserFromEmail(email);
      if (user1) {
        return res.status(400).json({
          success: false,
          message: `Error : Email ${email} already exist in the system`,
        });
      }

      let user = {
        name: name,
        email: email,
        password: await hashPassword(password),
      };
      let newUser = await UserModel.createUser(user);
      console.log(newUser);
      //delete newUser.password;
      let newUser1 = { ...newUser };
      delete newUser1.password;
      return res.status(200).json({
        success: true,
        data: newUser1,
      });
    } catch (error) {
      console.log("error", error);
      return res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;

      if (!email || !validator.isEmail(email)) {
        return res.status(400).json({
          success: false,
          message: "Email Is Not Valid",
        });
      }

      let user = await UserModel.getUserFromEmail(email);
      if (!user) {
        return res.status(400).json({
          success: false,
          message: "Email/Password Is Not Valid",
        });
      }

      console.log("user", user);
      let passwordMatch = await verifyPassword(password, user.password);
      if (!passwordMatch) {
        return res.status(400).json({
          success: false,
          message: "Email/Password Is Not Valid",
        });
      }
      //headers
      //payload
      //secret key ="asgdksfdk"
      //let token =
      //  process.env.SECRET_KEY
      let payloadData = {
        email: user.email,
        name: user.name,
      };
      let secretKey = "sgdjhsdghsd##$";

      let token = jwt.sign(payloadData, secretKey, { expiresIn: 500 });

      return res.status(200).json({
        success: true,
        token: token,
      });
    } catch (error) {
      console.log("error", error);
      return res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    }
  }

  //login
}
