<template>
  <div>
  <v-toolbar color="black" dark app>
    <v-toolbar-title>YXR'S MALL</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items>
      <v-btn flat @click="open_modal('register')" v-show="!loginFlag">Register</v-btn>
      <v-btn flat @click="open_modal('login')" v-show="!loginFlag">Login</v-btn>
      <v-menu offset-y>
      <v-btn flat @click="" v-show="loginFlag"  slot="activator">{{username}}  <v-icon
        small
        color="white lighten-1"
      >
        keyboard_arrow_down
      </v-icon></v-btn>
        <v-list>
          <v-list-tile
            check
            @click="to_orders"
          >
            <v-list-tile-title>your orders</v-list-tile-title>
          </v-list-tile>
          <v-list-tile
            check
            @click="to_address"
          >
            <v-list-tile-title check @click="">your address</v-list-tile-title>
          </v-list-tile>
          <v-list-tile
            check
            @click=""
          >
            <v-list-tile-title check @click="">your payments</v-list-tile-title>
          </v-list-tile>
          <v-list-tile
            check
            @click="logout"
          >
            <v-list-tile-title @click="logout" check>logout</v-list-tile-title>
          </v-list-tile>
        </v-list></v-menu>
      <v-btn flat @click="to_cart_list">
        <v-badge right color="red" v-show="cartNum!==0">
          <span slot="badge">{{this.cartNum}}</span>
          <v-icon
            medium
            color="white lighten-1"
          >
            shopping_cart
          </v-icon>
        </v-badge>
        <v-icon
          medium
          color="white lighten-1"
          v-show="cartNum===0"
        >
          shopping_cart
        </v-icon>
      </v-btn>
      <v-toolbar-side-icon v-show="sideShow" @click="show_filter"></v-toolbar-side-icon>
    </v-toolbar-items>
  </v-toolbar>
    <my_form v-bind:mdShow="loginmdShow" v-bind:type="'login'" v-on:close="close_modal('login')">
      <div slot="text_fields" >
        <h2>Login</h2>
        <div class="subheading" style="color: red" v-show="tipShow"> {{errorTip}} </div>

        <v-text-field
        v-model="username"
        :counter="15"
        :rules="nameRules"
        label="Name"
        border="0px"
        required
      ></v-text-field>
        <v-text-field
          v-model="password"
          :rules="passwordRules"
          label="Password"
          type="password"
          required
        ></v-text-field>

      </div>
      <div slot="btns">
        <v-layout row wrap style="text-align: center">
          <v-flex xs6>
        <v-btn
          color="success"
          @click="login"
        >
          Login
        </v-btn>
          </v-flex>
          <v-flex xs6>
        <v-btn
          color="red"
          @click="close_modal('login')"
        >
          Close
        </v-btn>
          </v-flex>
        </v-layout>
      </div>
    </my_form>
    <my_form v-bind:mdShow="registermdShow" v-bind:type="'register'" v-on:close="close_modal('register')">
      <div slot="text_fields" >
        <h2>Register</h2>
        <v-text-field
          v-model="username"
          :counter="15"
          :rules="nameRules"
          label="Name"
          required
        ></v-text-field>
        <v-text-field
          v-model="password"
          :rules="passwordRules"
          label="Password"
          type="password"
          required
        ></v-text-field>
        <v-text-field
          v-model="rpassword"
          :rules="rpasswordRules"
          label="Repeat Password"
          type="password"
          required
        ></v-text-field>
        <v-text-field
          v-model="email"
          :rules="emailRules"
          label="Email"
          required
        ></v-text-field>

      </div>
      <div slot="btns">
        <v-layout row wrap style="text-align: center">
          <v-flex xs6>
        <v-btn
          color="success"
          @click="register"
        >
          Register
        </v-btn>
          </v-flex>
          <v-flex xs6>
        <v-btn
          color="red"
          @click="close_modal('register')"
        >
          Close
        </v-btn>
          </v-flex>
        </v-layout>
      </div>
    </my_form>
  </div>
</template>

<script>
  import my_form from "../components/Form"
  import axios from "axios"
  import Cookies from "js-cookie"
    export default {
        name: "new_header",
      props:["sideShow"],
      data(){
          return {
            nameRules:[
              v => !!v || 'Name is required',
              v => (v && v.length <= 15) || 'Name must be less than 15 characters'
            ],
            passwordRules:[
              v => !!v || 'Password is required',
            ],
            rpasswordRules:[
              v => !!v || 'Password is required',
              v => v === this.password || 'Password is not consistant'
            ],
            emailRules:[
              value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || 'Invalid e-mail.'
        }
            ],
            loginmdShow:false,
            registermdShow:false,
            tipShow:false,
            userid:"",
            username:"",
            password:"",
            rpassword:"",
            loginFlag:false,
            email:"",
            cartNum:0,
            errorTip:"username or password wrong.",
            id:"",}
      },
      mounted: function(){
        this.check_login();
      },
    components:{
      my_form
    }
    ,
      methods:{
        open_modal(modal){
          this.errorTip="";
          this.tipShow=false;
          if(modal==="login"){
            this.loginmdShow=true;
          }
          if(modal==="register"){
            this.registermdShow=true;
          }
        },
        close_modal(modal){
          this.errorTip="";
          this.tipShow=false;
          if(modal==="login"){
            this.loginmdShow=false;
            this.username="";
            this.password="";
          }

          if(modal==="register"){
            this.registermdShow=false;
            this.username="";
            this.password="";
            this.email="";
          }
        },
        login(){
          if(this.username==="" || this.password===""){
            this.errorTip="username or password cannot be empty!";
            this.tipShow=true;
          }else{
            axios.post("/api/login", {
              username: this.username,
              password: this.password
            }).then((res)=>{
              if(res.data.status==="200"){
                this.userid=res.data.result.userid;
                this.password="";
                this.loginFlag=true;
                this.cartNum=res.data.result.cartNum;
                Cookies.set("cartNum", this.cartNum);
                this.close_modal('login');
                this.username=res.data.result.username;

              }else{
                this.errorTip=res.data.message;
                this.tipShow=true;
              }
            },(error)=>{
              alert("cannot connect to server.");
            })
          }

        },
        logout(){
          Cookies.remove('username');
          Cookies.remove('userid');
          Cookies.remove('cartNum');
          this.cartNum=0;
          this.$router.push(
            '/'
          );
          this.loginFlag=false;
        },

        check_login(){
          console.log("asdad");
          this.id=Cookies.get('userid');
          if(this.id){
            this.loginFlag=true;
            this.username=Cookies.get('username');
            this.cartNum=parseInt(Cookies.get('cartNum'));
          }
        },
        register(){
          if(this.username==="" || this.password===""||this.rpassword===""||this.email===""){
            this.errorTip="username or password cannot be empty!";
            this.tipShow=true;
            return;
          }
          if(this.password !== this.rpassword){
            this.errorTip="two passwords inconsistant!";
            this.tipShow=true;
          }else{
            axios.post("/api/register", {
              username: this.username,
              password: this.password,
              email: this.email
            }).then((res)=>{
              if(res.data.status==="200"){
                alert("success register!");
                this.close_modal('register');
              }else{
                this.errorTip=res.data.message;
                this.tipShow=true;
              }
            },(error)=>{
              alert("cannot connect to server.");
            })
          }
        },
        to_cart_list(){
          if(this.loginFlag){
            this.$router.push('/cart');
          }else{
            alert("login first!");
          }
        },
        change_cart_num(num){
          this.cartNum+=num;
          Cookies.set("cartNum", this.cartNum);
        },
        to_address(){
            this.$router.push('/address');
        },
        to_orders(){
          this.$router.push('/orders');
        },
        show_filter(){
          this.$emit("show_filter");
        }

      }
    }
</script>

<style scoped>

</style>
