import express from 'express';
import ProductController from './product.controller.js';

const router = express.Router();

const productController = new ProductController();
//product/id --> get,put,delete
//product --> get ,post

///product/
router.get('/',productController.getAllProducts);

// /product/1
router.get('/:id',productController.getProductWithId);


//post 
router.post('/',productController.addProduct);

//put

router.put('/:id',(req,res) =>{
    return res.status(200).json({
        "success":true,
        "data":"put id request"
    });
});

//delete
router.delete('/:id',(req,res) =>{
    return res.status(200).json({
        "success":true,
        "data":"delete id request"
    });
});

export default router;