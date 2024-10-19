import jwt from "jsonwebtoken";
import UserModel from "../resources/user/user.model.js";
import dotenv from "dotenv";
dotenv.config();

const jwtAuth = async (req, res, next) => {
  //read from the headers

  if (req.headers && req.headers.authorization) {
    console.log("auth", req.headers.authorization);
    const [authType, token] = req.headers.authorization.split(" ");

    if (authType == "Bearer") {
      //decode the token
      let secretKey = process.env.SECRET_KEY;
      try {
        let payloadData = jwt.verify(token, secretKey);
        // it is the same user
        let email = payloadData.email;

        let user = await UserModel.getUserFromEmail(email);
        if (!user) {
          return res.status(401).json({
            success: false,
            message: "Unauthorized",
          });
        }
        req.user = user;
        next();
      } catch (error) {
        console.log("error", error);
        return res.status(401).json({
          success: false,
          message: "Unauthorized",
        });
      }
    }
    // is token for this user is marked is-active
  } else {
    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }
};

export default jwtAuth;
