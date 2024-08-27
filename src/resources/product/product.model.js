import UserModel from "../user/user.model.js";

const categories = ["category_a", "category_b", "category_c"];

const sizes = ["s", "m", "l", "xl"];
export default class ProductModel {
  constructor(_id, _name, _describtion, _category, _price, _imageUrl, _sizes) {
    this.id = _id;
    this.name = _name;
    this.describtion = _describtion;
    this.category = _category;
    this.price = _price;
    this.imageUrl = _imageUrl;
    this.sizes = _sizes;
    this.ratings = []; // because rating will come once product is created
  }

  static getAllProducts() {
    //
    return products;
  }
  static getProductWithId(_id) {
    let products = this.getAllProducts();
    for (let i = 0; i < products.length; i++) {
      if (products[i].id === _id) {
        return products[i];
      }
    }
    return null;
  }
  static isCatgeoryValid(category) {
    return categories.indexOf(category) >= 0;
  }
  static isSizeValid(size) {
    return sizes.indexOf(size) >= 0;
  }
  static addNewProduct(obj) {
    let id = this.getAllProducts().length + 1;
    let product = new ProductModel(
      id,
      obj.name,
      obj.describtion,
      obj.category,
      obj.price,
      obj.imageUrl,
      obj.sizes
    );
    products.push(product);
    return product;
  }
  //make sure  all three params are present

  static productFilter(minPrice, maxPrice, category) {
    let products = this.getAllProducts();
    let result = products.filter((item) => {
      if (
        item.price >= minPrice &&
        item.price <= maxPrice &&
        item.category === category
      ) {
        return true;
      }
      return false;
    });
    return result;
  }
  static rateProduct(userId, productId, rating) {
    // this user Id exist or not;
    let users = UserModel.getAllUsers();
    let user = users.find((user) => {
      return user.id === userId;
    });
    if (!user) {
      return {
        success: false,
        message: "User Not Found",
      };
    }

    //products exits
    let product = this.getAllProducts().find(
      (product) => product.id === productId
    );
    if (!product) {
      return {
        success: false,
        message: "Product Not Found",
      };
    }
    let userFound = false;
    for (let i = 0; i < product.ratings.length; i++) {
      let item = product.ratings[i];
      if (item.userId === userId) {
        userFound = true;
        product.ratings[i].rating = rating;
        break;
      }
    }
    if (!userFound) {
      product.ratings.push({
        userId: userId,
        rating: rating,
      });
    }
    return {
      success: true,
      data: product,
    };
  }
}

const products = [
  new ProductModel(1, "Product_1", "desc_1", "category_a", 10, "image1.png", [
    "s",
  ]),
  new ProductModel(2, "Product_2", "desc_2", "category_b", 140, "image2.png", [
    "s",
  ]),
  new ProductModel(3, "Product_3", "desc_3", "category_a", 130, "image3.png", [
    "s",
    "l",
  ]),
  new ProductModel(4, "Product_4", "desc_4", "category_b", 150, "image4.png", [
    "s",
    "m",
  ]),
];
