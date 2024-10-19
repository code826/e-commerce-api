import express from "express";

import productRouter from "./src/resources/product/product.router.js";
import userRouter from "./src/resources/user/user.router.js";
import cartRouter from "./src/resources/cart/cart.router.js";
import likeRouter from "./src/resources/likes/like.router.js";

import basicAuthorizer from "./src/middlewares/basicAuthorizer.js";
import jwtAuth from "./src/middlewares/jwtTokenAuthorization.js";
import swaggerDocs from "./swagger.js";
import { ApplicationError } from "./src/applicationError.js";
import { connectToMongDB } from "./src/config/mongodb.js";
import { connectToMongoDBFromMongoose } from "./src/config/mongoose.js";

const PORT = process.env.PORT || 8000;

const server = express();

server.use(express.urlencoded({ extended: true })); //query -->
server.use(express.json()); //content-type: application/json req.body
// server.use('/',basicAuthorizer);

// server.use("/api", (req, res, next) => {
//   //req.path
//   // /api/user /api/post
//   logger.info("req-body".JSON.stringfy(req.body));
//   next();
// });

server.get("/", (req, res) => {
  return res.send("<h1>welcome to the ecommerce api </h1>");
});
server.get("/api/test/error", (req, res) => {
  throw new ApplicationError("test", 200);
});

server.use("/api/product", productRouter);
server.use("/api/user", userRouter);
server.use("/api/cart", jwtAuth, cartRouter);
server.use("/api/like", likeRouter);

server.use((err, req, res, next) => {
  console.log("error-index", err);
  //err --> Error  ,ApplicationError
  //Application error (.code,message);
  if (err instanceof ApplicationError) {
    console.log("error coms here");
    return res.status(err.code).json({
      success: false,
      message: err.message,
    });
  }
  //server error
  res.status(503).json({
    success: false,
    message: "Something went wrong",
  });
});

//middleware provided by express

//last-line
// server.use('/',(req,res) =>{
//     return res.status(404).json({
//         success:false,
//         message:'Page Not Found'
//     })
// })
async function startServer() {
  try {
    //await connectToMongDB(); //connect To Database
    await connectToMongoDBFromMongoose();
    server.listen(PORT, (err) => {
      if (err) {
        console.log("error", err);
        throw new Error(err);
      }
      console.log("server started at port", PORT);
    });
  } catch (error) {
    console.log("error", error);
  }
}
startServer();

// server.listen(PORT, (err) => {
//   if (err) {
//     console.log("error", err);
//     return;
//   }
//   try {
//     swaggerDocs(server, PORT);
//     console.log("server started at port", PORT);
//   } catch (error) {
//     console.log("error", error);
//   }
// });
