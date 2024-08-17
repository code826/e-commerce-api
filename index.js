import express from 'express';
import productRouter from './src/resources/product/product.router.js';

const PORT = 8000;

const server = express();

server.use(express.urlencoded({extended:true}));//query --> 
server.use(express.json());//content-type: application/json req.body


server.use('/api/product',productRouter);



server.post('/test',(req,res) =>{
    return res.status(200).json({
        "success":false,
        "data":"unauthroized"
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