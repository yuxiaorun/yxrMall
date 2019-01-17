var express = require('express');

var router= express.Router();
var mongoose=require('mongoose');
var Goods=require('../models/goods');
var Users=require('../models/users');
var Address=require('../models/address');
var Orders=require('../models/orders');

mongoose.connect('mongodb://yuxiaorun:@127.0.0.1:27017/mall_demo?authSource:admin',{ useNewUrlParser: true });

mongoose.connection.on("connected",()=>{
  console.log("connect success.");

});

mongoose.connection.on("error",(error)=>{
  console.log(error);

});

mongoose.connection.on("disconnected",()=>{
  console.log("disconnect.");

});

function on_err(req, res, err, message){
  console.log(err);
  res.json({
    status:'500',
    error:err,
    message:message
  });
}

router.get("/goods",  (req, res, next) => {
  var sortOrder=parseInt(req.query.sortOrder);
  var priceRange = req.query.priceRange===undefined?undefined:JSON.parse(req.query.priceRange);
  var page=parseInt(req.query.page);
  var pageSize=parseInt(req.query.pageSize);
  var goods_model;
  if(priceRange){
     goods_model=Goods.find({price:{
        $gte:priceRange.start,
        $lte:priceRange.end
      }});
  }else{
    goods_model=Goods.find();
  }
  var goods_query=goods_model.sort({price: sortOrder}).skip((page-1)*pageSize).limit(pageSize);
  goods_query.exec((err, doc) => {
    if(err){
      res.json({
        status:'500',
        message:err.message
      });
    }
    else{
      res.json({
        status:'200',
        msg:"",
        result:{
          count:doc.length,
          list:doc
        }
      });
    }
  });
});

//handle register.
router.post("/register",  (req, res, next) => {

  var username=req.body.username;
  var password=req.body.password;
  var email=req.body.email;
  Users.findOne({username:username },  (err, doc) => {
    if(err){
      on_err(req, res, err, "error when findOne.");
    }else if (doc){
      on_err(req, res, undefined, "user already exist.");
    }else {
      Users.create({
        username: username,
        password: password,
        email: email,
        cartList:[],
        defaultAddress:"",
      },  (err, doc) => {
        if (err){
          on_err(req, res, err, "error when create user.");
        }else{
          res.json({
            status:'200',
            msg:"",
            result:{
            }
          });
        }

      })
    }
  });

});

//handle login.
router.post("/login",  (req, res, next) => {
  var username= req.body.username;
  var password= req.body.password;
  Users.findOne({username:username, password:password}, (err, doc) => {
    if(err){
      on_err(req, res, err, "error when finding user.");
    }else if(!doc) {
      res.json({
        status:'201',
        message:"username or password wrong.",
        error:undefined,
        result:{
        }});

    }else {
      var cartNum=0;
      doc.cartList.forEach((item)=>{
        cartNum+=item.num;
      });
      res.cookie("userid",doc._id.toString(),{
        path:'/',
        maxAge:1000*60*600
      });
      res.cookie("username",doc.username,{
        path:'/',
        maxAge:1000*60*600
      });
      res.json({
        status:'200',
        message:"",
        result:{
          userid:doc._id,
          username:doc.username,
          cartNum:cartNum
        }});

    }
  })
});

router.get("/get_address",  (req, res, next) => {
  var userid=req.query.userid;
  Address.find({userid : userid}, (err, doc)=> {
    if (err) {
      on_err(req, res, err, "error when finding user.");
    }else{
      res.json({
        status:'200',
        message:"",
        result:{
          count:doc.length,
          list:doc,
        }});
    }
    });
});



router.post("/add_address",  (req, res, next) => {
  var userid=req.body.userid;
  var address=req.body.address;
  address.userid=userid;
  Address.create(address, (err, doc)=> {
    if (err) {
      on_err(req, res, err, "error when adding address.");
    }else{
      res.json({
        status:'200',
        message:"",
        result:{
        }});
    }
  });
});

router.get('/delete_address', (req, res, next)=>{
  var addressid=req.query.addressid;
  Address.deleteOne({
    _id:addressid
  }, function (error) {
    if(error){
      on_err(req, res, err, "error when deleting address")
    }else{
      res.json({
        status:'200',
        message:"",
        result:{
        }});
    }
  });
});

router.get('/set_default_address', (req, res, next)=>{
  var addressid=req.query.addressid;
  var userid = req.query.userid;
  Users.findOne({
    _id:userid
  },(err, doc)=>{
    if(err){
      on_err(req,res,err,"find user failed.");
    }else{
      if(addressid){
        doc.defaultAddress=addressid;
      }
      doc.save();
      res.json({
        status:'200',
        message:"",
        result:{
        }});
    }

  });
});
router.get('/delete_default_address', (req, res, next)=>{
  var userid = req.query.userid;
  Users.findOne({
    _id:userid
  },(err, doc)=>{
    if(err){
      on_err(req,res,err,"find user failed.");
    }else{
      doc.defaultAddress="";
      doc.save();
      res.json({
        status:'200',
        message:"",
        result:{
        }});
    }

  });
});


router.get("/get_default_address",(req,res,next)=>{
  var userid=req.query.userid;
  Users.findOne({_id : userid},(err, user)=>{
    if(err || !user){
      on_err(req,res,err,"get user information failed!")
    }
    if(user){
      if(user.defaultAddress===""){
       res.json({
          status:'201',
          message:"",
          result:{
            defaultAddressId:"",
            defaultAddress:-1
          }});
       return;
      }
      Address.findOne({_id:user.defaultAddress}, (err, address)=>{
        if(err || !address){
          on_err(req,res,err,"get address information failed!")
        }
        if(address){
          res.json({
            status:'200',
            message:"",
            result:{
              defaultAddressId:user.defaultAddress,
              defaultAddress:address
            }});
        }

      });
    }
  })

});


router.get("/get_orders",  (req, res, next) => {
  var userid=req.query.userid;
  Orders.find({
    userid : userid,
  }, (err, doc)=> {
    if (err) {
      on_err(req, res, err, "error when finding orders.");
    }else{
      res.json({
        status:'200',
        message:"",
        result:{
          count:doc.length,
          list:doc
        }});
    }
  });
});

router.post("/add_order",  (req, res, next) => {
  var order=req.body.order;
  Orders.create(order, (err, doc)=> {
    if (err) {
      on_err(req, res, err, "error when adding address.");
    }else{
      res.json({
        status:'200',
        message:"",
        result:{
        }});
    }
  });
});

router.post("/add_cart",  (req, res, next) => {
  var good=req.body.good;
  var userid=req.body.userid;

  Users.findOne({_id:userid}, (err, user)=> {
    if (err) {
      on_err(req, res, err, "error when adding address.");
    }else{
      for(var i=0;i<user.cartList.length;i++){
        if(good.productid === user.cartList[i].productid){
          user.cartList[i].num+=good.num;
          user.save();
          res.json({
            status:'200',
            message:"",
            result:{
            }});
          return;
        }
      }
      user.cartList.push(good);
      user.save();
      res.json({
        status:'200',
        message:"",
        result:{
        }});
    }
  });
});

router.post("/edit_cart",  (req, res, next) => {
  var good=req.body.good;
  var userid=req.body.userid;
  var removeAll=req.body.removeAll;
  Users.findOne({_id:userid}, (err, user)=> {
    if (err) {
      on_err(req, res, err, "error when adding address.");
    }else{
      for(var i=0;i<user.cartList.length;i++){
        if(good.productid === user.cartList[i].productid){
          user.cartList[i].num=good.num;
          if(user.cartList[i].num<1){
            user.cartList[i].num=1;
          }
          if (removeAll){


            user.cartList.splice(i, 1);

            break;
          }

        }
      }
      user.save((err)=>{
        console.log(err);
      });
      res.json({
        status:'200',
        message:"",
        result:{
        }});
      return;
    }
  });
});

router.post("/delete_cart",  (req, res, next) => {
  var goods=req.body.goods;
  var userid=req.body.userid;
  Users.findOne({_id:userid}, (err, user)=> {
    if (err) {
      on_err(req, res, err, "error when adding address.");
    }else{
      for(var i=0;i<goods.length;i++){
        var id=goods[i].productid;
        for(var j=0;j<user.cartList.length;j++){
          if(id === user.cartList[j].productid){
            user.cartList.splice(j, 1);
            break;
          }
        }
      }
      user.save((err)=>{
        console.log(err);
      });
      res.json({
        status:'200',
        message:"",
        result:{
        }});
    }
  });
});


router.get("/get_cart",  (req, res, next) => {
  var userid=mongoose.Types.ObjectId(req.query.userid);
  Users.findOne({_id:userid}, (err, user)=> {
    if (err) {
      on_err(req, res, err, "error when adding address.");
    }else{
      res.json({
        status:'200',
        message:"",
        result:{
          cartList:user.cartList
        }});
      }});
  });





module.exports = router;
