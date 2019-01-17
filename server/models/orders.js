var mongoose = require("mongoose");
var Schema=mongoose.Schema;
var productSchema=new Schema({
  userid: String,
  destination: String,
  ordertime: String,
  content: [
    {
      productid: Number,
      name: String,
      price: Number,
      num: Number
    }
  ]
});
module.exports = mongoose.model("order", productSchema);
