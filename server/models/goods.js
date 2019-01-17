
var mongoose = require("mongoose");
var Schema=mongoose.Schema;
var productSchema=new Schema({
  productid: Number,
  name: String,
  price: Number,
  img: String,
  descr: String
});
module.exports = mongoose.model("good", productSchema);

