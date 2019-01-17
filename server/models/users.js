var mongoose = require("mongoose");
var Schema=mongoose.Schema;
var productSchema=new Schema({
  username: String,
  password: String,
  email: String,
  cartList:[
    {
      productid: Number,
      name: String,
      price: Number,
      num:Number
    }
  ],
  defaultAddress:String
});
module.exports = mongoose.model("user", productSchema);
