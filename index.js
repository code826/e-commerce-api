import express from 'express';
import productRouter from './src/resources/product/product.router.js';
import userRouter from './src/resources/user/user.router.js';
import basicAuthorizer from './src/middlewares/basicAuthorizer.js';

const PORT = 8000;

const server = express();

server.use(express.urlencoded({extended:true}));//query --> 
server.use(express.json());//content-type: application/json req.body
// server.use('/',basicAuthorizer);

server.use('/api/product',productRouter);
server.use('/api/user',userRouter);


server.get('/api/test',basicAuthorizer,(req,res) =>{
    return res.status(200).json({
        "success":true,
        "data":"all-good"
    });
});

//middleware provided by express

//last-line
server.use('/',(req,res) =>{
    return res.status(404).json({
        success:false,
        message:'Page Not Found'
    })
})

server.listen(PORT,(err) =>{
    if(err){
        console.log('error',err);
        return;
    }
    console.log('server started at port',PORT);
})