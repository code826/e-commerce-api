import express from "express";

import productRouter from "./src/resources/product/product.router.js";
import userRouter from "./src/resources/user/user.router.js";
import cartRouter from "./src/resources/cart/cart.router.js";

import basicAuthorizer from "./src/middlewares/basicAuthorizer.js";
import jwtAuth from "./src/middlewares/jwtTokenAuthorization.js";
import swaggerDocs from "./swagger.js";
import cors from "cors";
import { writeLog } from "./src/utils.js";

const PORT = 8000;

const server = express();
const corsOptions = {
  origin: "http://localhost:8001",
  methods: ["GET"],
};

server.use(express.urlencoded({ extended: true })); //query -->
server.use(express.json()); //content-type: application/json req.body
server.use(cors());
// server.use('/',basicAuthorizer);
// server.options("/api/test", (req, res) => {
//   res.header("Access-Control-Allow-Origin", "http://localhost:8000");
//   res.header("Access-Control-Allow-Method", "GET,POST");
//   return res.sendStatus(200);
// });

server.use("/api/product", productRouter);
server.use("/api/user", userRouter);
server.use("/api/cart", jwtAuth, cartRouter);

server.get("/api/test", (req, res) => {
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
