<template>
  <div id="app">
  <link href="https://fonts.googleapis.com/css?family=Material+Icons" rel="stylesheet">
  <v-app id="inspire">
    <v-container grid-list-md style="margin:0px">
      <v-layout row wrap>
        <v-flex xs12 >
        <nav_header ref="header"></nav_header>
          </v-flex>
        <v-flex xs12>
          <div style="height: 35px"></div>
        </v-flex>
        <v-flex xs12 style="height: 30px">
          <nav_breadcrumb v-bind:breadcrumbItems="breadcrumbItems"></nav_breadcrumb>
        </v-flex>
        <v-flex xs12>
        <v-content style="padding: 0px;padding-bottom: 20px">
            <v-container fluid grid-list-xl style="margin: 0px; padding: 0px">
              <v-layout row wrap>

                <v-flex xs12>
            <v-card>
        <v-toolbar flat style="text-align: center;">
            <v-layout row >
              <v-flex xs4>
          <v-toolbar-title>Items</v-toolbar-title>
              </v-flex>
              <v-flex xs2>
            <v-toolbar-title v-show="!is_small">price</v-toolbar-title>
              </v-flex>
              <v-flex xs2>
              <v-toolbar-title v-show="!is_small">quantity</v-toolbar-title>
              </v-flex>
              <v-flex xs2>
              <v-toolbar-title v-show="!is_small">subtotal</v-toolbar-title>
              </v-flex>
              <v-flex xs2>
            <v-toolbar-title v-show="!is_small">edit</v-toolbar-title>
              </v-flex>
            </v-layout>
        </v-toolbar>
            <v-list three-line v-for="(item, index) in cartList" style="padding: 0px;">
              <v-list-tile style="text-align: center;">
                <v-layout align-center justify-center row fill-height >
                  <v-flex v-bind:class="{'xs1': !is_small,'xs2': is_small}">
                    <v-icon color="black" v-show="item.checked" @click="check_item(item)" style="padding-left: 10px">radio_button_checked</v-icon>
                    <v-icon color="black" v-show="!item.checked" @click="check_item(item)" style="padding-left: 10px">radio_button_unchecked</v-icon>
                  </v-flex>
                  <v-flex v-bind:class="{'xs1': !is_small,'xs2': is_small}" >
                <div>

                  <v-img v-bind:src="'../../static/img/'+item.productid+'/1.jpg'" height="65px" width="50px" ></v-img>
                </div>
                  </v-flex>
                    <v-flex v-bind:class="{'xs2': !is_small,'xs8': is_small}">
                    <a>{{item.name}}</a>
                    </v-flex>
                  <v-flex xs2 v-show="!is_small">
                  <v-list-tile-title style="display: inline">${{item.price}}</v-list-tile-title>
                  </v-flex>
                  <v-flex xs2 v-show="!is_small">
                    <v-btn flat icon @click="edit_cart('-' ,item, index)"> <v-icon color="black" >remove</v-icon></v-btn>
                  <v-list-tile-title style="display: inline">{{item.num}}</v-list-tile-title>
                    <v-btn flat icon @click="edit_cart('+' ,item, index)"> <v-icon color="black" >add</v-icon></v-btn>
                  </v-flex>
                  <v-flex xs2 v-show="!is_small">
                    <v-list-tile-title style="display: inline">${{item.num*item.price}}</v-list-tile-title>
                  </v-flex>
                  <v-flex xs2 v-show="!is_small">
                    <v-btn flat @click="delete_item(index)">
                    <v-icon color="black" >delete</v-icon></v-btn>
                  </v-flex>
                </v-layout>

              </v-list-tile>
              <v-divider></v-divider>

              <div v-show="is_small" style="text-align: center; height: 70px">
                <v-layout align-center justify-center row fill-height >
                  <v-flex xs2 >
                    <v-list-tile-title style="display: inline">${{item.price}}</v-list-tile-title>
                  </v-flex>
                  <v-flex xs5 >
                    <v-btn flat icon @click="edit_cart('-' ,item, index)"> <v-icon color="black" >remove</v-icon></v-btn>
                    <v-list-tile-title style="display: inline">{{item.num}}</v-list-tile-title>
                    <v-btn flat icon @click="edit_cart('+' ,item, index)"> <v-icon color="black" >add</v-icon></v-btn>
                  </v-flex>
                  <v-flex xs1 >
                    <v-list-tile-title style="display: inline">${{item.num*item.price}}</v-list-tile-title>
                  </v-flex>
                  <v-flex xs4 >
                    <v-btn flat @click="delete_item(index)">
                      <v-icon color="black" >delete</v-icon></v-btn>
                  </v-flex>
                </v-layout>
              </div>
              <v-divider></v-divider>
            </v-list>

            </v-card></v-flex>
              </v-layout>
            </v-container>
        </v-content></v-flex>
        <v-flex xs12>
          <v-card>
          <v-list style="padding: 0px;">
          <v-list-tile style="text-align: center; padding-left: 0px">
            <v-layout align-center justify-center row fill-height>
            <v-flex xs1 v-show="!is_small">
              <v-icon color="black" v-show="checkAll" @click="check_all" style="padding-left: 0px;">radio_button_checked</v-icon>
              <v-icon color="black" v-show="!checkAll" @click="check_all" style="padding-left: 0px;">radio_button_unchecked</v-icon>
            </v-flex>
              <v-flex xs1 v-show="!is_small">
                <v-list-tile-title>Select All</v-list-tile-title>
              </v-flex>
              <v-flex xs6 v-show="!is_small">

              </v-flex>
              <v-flex v-bind:class="{'xs1': !is_small,'xs2': is_small}">
                <v-list-tile-title>Total: </v-list-tile-title>
              </v-flex>
              <v-flex v-bind:class="{'xs1': !is_small,'xs5': is_small}">
              <div class="headline font-weight-medium">${{totalPrice}}</div>
              </v-flex>
              <v-flex v-bind:class="{'xs2': !is_small,'xs5': is_small}">
                <v-btn color="black" @click="check_out"><div style="color: white">CheckOut</div></v-btn>
              </v-flex>

        </v-layout>
          </v-list-tile>
            <v-divider></v-divider>
          </v-list></v-card>
        </v-flex>
        <v-flex xs12>
  <nav_footer></nav_footer>
        </v-flex>
      </v-layout>
    </v-container>
  </v-app>
  </div>
</template>

<script>
  import nav_header from "../components/new_header"
  import nav_footer from "../components/new_footer"
  import Cookies from 'js-cookie'
  import nav_breadcrumb from "../components/new_breadcrumb"



  import axios from 'axios'
    export default {
        name: "new_cart",
      data(){
        return {
          cartList:[],
          checkAll:false,
          userid:"",
          breadcrumbItems:[{
            text:"Home",
            disable:true,
            href:"/"
          },{
            text:"Cart",
            disable:false,
            href:"/cart"
          }]
        }
      },
      components:{
          nav_header,
        nav_footer,
        nav_breadcrumb
      },
      mounted:
        function (){
          this.userid=Cookies.get("userid");
          this.get_cart_list();
        },
      computed:{
        totalPrice() {
          var n=0;
          console.log("diaoyong");

          this.cartList.forEach((item)=>{
            if(item.checked) {
              n += parseFloat(item.price) * parseInt(item.num);
            }
          });
          return n;
        },
        is_small(){
          return (this.$vuetify.breakpoint.name==='xs' || this.$vuetify.breakpoint.name==='sm')
        }
      },
      methods:{
        get_cart_list(){
          var userid = Cookies.get('userid');
          axios.get('api/get_cart', {
            params:{
              userid:userid
            }
          }).then((res)=>{
            this.cartList=res.data.result.cartList;
            for(var i=0;i<this.cartList.length;i++){
              this.cartList[i].checked=false;
            }
          });
        },
        check_item(item){
          this.cartList.push({
          });
          this.cartList.pop();
          console.log("check_item");
          item.num+=1;
          item.num-=1;
          item.checked=!item.checked;
          var i=this.totalPrice;
          if(!item.checked)this.checkAll=false;
        },
        edit_cart(flag, item, index){
          if(flag==='+'){
            item.num++;
            this.$refs.header.change_cart_num(1);
          }
          if(flag==='-'){
            item.num--;
            this.$refs.header.change_cart_num(-1);
            if(item.num===0){
              this.delete_item(index);
            }
          }
          axios.post('api/edit_cart', {
            good:item,
            removeAll:false,
            userid:Cookies.get('userid')
          }).then((res)=>{
            if(res.data.status!=='200'){
              alert("edit cart fail!");
            }
          });
        },
        check_all(){
          this.cartList.push({
          });
          this.cartList.pop();
          this.checkAll=!this.checkAll;
          this.cartList.forEach((item)=>{
            item.checked=this.checkAll;

          })
        },
        delete_item(index){
          var item=this.cartList[index];
          axios.post('api/edit_cart', {
            good:item,
            removeAll:true,
            userid:Cookies.get('userid')
          }).then((res)=>{
            if(res.data.status!=='200'){
              alert("edit cart fail!");
            }
          }, (err)=>{
            alert(err);
          });

          this.$refs.header.change_cart_num(-1*this.cartList[index].num);
          this.cartList.splice(index, 1);
        },
        check_out(){
          if(this.totalPrice>0){
            var checked_items=[];
            for(var i=0;i<this.cartList.length;i++){
              if(this.cartList[i].checked){
                checked_items.push(this.cartList[i]);
              }
            }
            this.$router.push({
              name:"confirm_order",
              params:{
                userid:this.userid,
                checked_items:checked_items
              }
            });
          }
        },


      }
    }
</script>

<style scoped>

</style>
