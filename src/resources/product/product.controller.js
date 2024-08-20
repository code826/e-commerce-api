//get 

import validator from "validator";
import ProductModel from "./product.model.js";


export default class ProductController {
    getAllProducts(req,res){
        try {
            let products = ProductModel.getAllProducts();
            return res.status(200).json({
                success:true,
                data:products
            });
        } catch (error) {
            console.log('error',error);
            return res.status(500).json({
                success:false,
                message:'Internal Server Error'
            });
        }
      
    }

    getProductWithId(req,res){
        //get the data 
        console.log('hello');

        try {
            let {id} = req.params;
            //validate the data 
            id = Number(id);
            
            if(Number.isNaN(id)){
                return res.status(400).json({
                    success:false,
                    message:'Invalid Product Id'
                });
            }
    
            let product = ProductModel.getProductWithId(id);
            if(!product){
                return res.status(400).json({
                    success:false,
                    message:'Product Not Found'
                }); 
            }
    
            return res.status(200).json({
                success:true,
                data:product
            });
            
        } catch (error) {
            console.log('error',error);
            return res.status(500).json({
                success:false,
                message:'Internal Server Error'
            });
        }
    }

    addProduct(req,res){
        try {
            console.log('body',req.body);
            const {name,describtion,category,price,imageUrl,sizes} = req.body;

            //validate the data
    
            if(!name || !describtion || !category || !imageUrl || !sizes){
                return res.status(400).json({
                    success:false,
                    message:'Invalid Input'
                });
            }
    
            if(!validator.isAlpha(name)){
                return res.status(400).json({
                    success:false,
                    message:'Name Should Be String'
                });
            }
    
            if(name.length < 4){
                errorMssg = `Name Should Have min 3 character you have given ${name.length}`;
                return res.status(400).json({
                    success:false,
                    message:errorMssg
                });
            }
    
            let priceToInsert = Number(price);
            if(Number.isNaN(priceToInsert) || price <= 0){ 
              errorMssg = `Price Should be greater than 0`;
              return res.status(400).json({
                    success:false,
                    message:errorMssg
                });
            }
    
            if(!ProductModel.isCatgeoryValid(category)){
                return res.status(400).json({
                    success:false,
                    message:`Category ${category} Is Not Valid`
                });
            }
    
            if(!Array.isArray(sizes)){
                return res.status(400).json({
                    success:false,
                    message:'Sizes Should Be Array'
                });
            }
            //["s","m"]
            for(let i =0;i<sizes.length;i++){
                if(!ProductModel.isSizeValid(sizes[i])){
                    return res.status(400).json({
                        success:false,
                        message:`Size ${sizes[i]} is not valid ` 
                    });
                }
            }
    
            let obj = {
                name:name,
                describtion:describtion,
                category:category,
                price:price,
                imageUrl:imageUrl,
                sizes:sizes
            };
    
            let newProduct = ProductModel.addNewProduct(obj);
    
            return res.status(200).json({
                succss:true,
                data:newProduct
            });
            
        } catch (error) {
            console.log('error',error);
            return res.status(500).json({
                success:false,
                message:'Internal Server Error'
            });
        }

    }
    filterProduct(req,res){

        try {
            let {minPrice,maxPrice,category} = req.query;

            //validate
    
            minPrice = Number(minPrice);
            if(Number.isNaN(minPrice) || minPrice <= 0){
                return res.status(400).json({
                    success:false,
                    message : 'Price Should be Number greater than zero'
                });
            }
            maxPrice = Number(maxPrice);
            if(Number.isNaN(maxPrice) || maxPrice <= 0){
                return res.status(400).json({
                    success:false,
                    message : 'Price Should be Number greater than zero'
                });
            }
            if(minPrice > maxPrice){
                return res.status(400).json({
                    success:false,
                    message : 'Min Price Should Be Greater Than Max Price'
                });
            }
    
            if(!category || !ProductModel.isCatgeoryValid(category)){
                return res.status(400).json({
                    success:false,
                    message : 'Category Is Not Valid'
                });
            }
    
            let products = ProductModel.productFilter(minPrice,maxPrice,category);
    
            return res.status(200).json({
                success:true,
                data:products
            });
            
        } catch (error) {
            console.log('error',error);
            return res.status(500).json({
                success:false,
                message:'Internal Server Error'
            });
        }

    }
}