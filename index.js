import express from "express";

import productRouter from "./src/resources/product/product.router.js";
import userRouter from "./src/resources/user/user.router.js";
import cartRouter from "./src/resources/cart/cart.router.js";

import basicAuthorizer from "./src/middlewares/basicAuthorizer.js";
import jwtAuth from "./src/middlewares/jwtTokenAuthorization.js";
import swaggerDocs from "./swagger.js";
import { ApplicationError } from "./src/applicationError.js";

const PORT = 8000;

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
server.use("/api/product", productRouter);
server.use("/api/user", userRouter);
server.use("/api/cart", jwtAuth, cartRouter);

server.use((err, req, res, next) => {
  console.log("error", err);
  //err --> Error  ,ApplicationError
  //Application error (.code,message);
  if (err instanceof ApplicationError) {
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
server.get("/api/test", jwtAuth, (req, res) => {
  return res.status(200).json({
    success: true,
    data: "all-good",
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

server.listen(PORT, (err) => {
  if (err) {
    console.log("error", err);
    return;
  }
  try {
    swaggerDocs(server, PORT);
    console.log("server started at port", PORT);
  } catch (error) {
    console.log("error", error);
  }
});
