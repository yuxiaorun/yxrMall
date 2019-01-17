var mongoose = require("mongoose");
var Schema=mongoose.Schema;
var productSchema=new Schema({
    userid : String,
    receiverName:String,
    postcode:String,
    contact:String,
    address: String
});
module.exports = mongoose.model("addresse", productSchema);
