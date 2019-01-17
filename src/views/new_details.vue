<template>
  <v-app id="inspire">
    <link href="https://fonts.googleapis.com/css?family=Material+Icons" rel="stylesheet">

    <v-container grid-list-md style="margin:0px">
      <v-layout align-center justify-center row wrap>
        <v-flex xs12>
          <nav_header ref="header">
          </nav_header>
        </v-flex>


        <v-flex xs12>
          <div style="height: 35px"></div>
        </v-flex>
        <v-flex xs12 style="height: 30px">
          <nav_breadcrumb v-bind:breadcrumbItems="breadcrumbItems"></nav_breadcrumb>
        </v-flex>
        <v-content style="padding-top: 0px">
        <v-layout  row wrap>
          <v-flex xs1>
            <v-layout row wrap>
              <v-flex xs12 v-for="i in 5">
                <v-card hover style="height: 90px; width: 60px" @click="imgIndex=i">
                  <v-img v-bind:src="'../../static/img/'+good.productid+'/'+i+'.jpg'"
                  ></v-img>
                </v-card>
              </v-flex>
            </v-layout>
          </v-flex>
          <v-flex xs1>

          </v-flex>
          <v-flex xs4>
            <v-card flat >
              <v-img v-bind:src="'../../static/img/'+good.productid+'/'+imgIndex+'.jpg'"
              ></v-img>
            </v-card>
          </v-flex>
          <v-flex xs1>

          </v-flex>
          <v-flex xs4>
            <v-layout row wrap>
              <v-flex xs12>
            <h2> {{good.name}}<br></h2>
              </v-flex>

            <div class="font-weight-bold"><br>${{good.price}}</div>
            <div class="font-weight-thin"><br>{{good.descr}}
            </div>
            <div style="height: 100px"></div>
              <v-flex xs12>
            <div style="display: flex; width: 100px" >
              <v-btn flat icon @click="minus1" style="display: inline"> <v-icon color="black" >remove</v-icon></v-btn>
              <div style="margin: auto">{{num}}</div>
              <v-btn flat icon @click="num+=1" style="display: inline"> <v-icon color="black" >add</v-icon></v-btn>
            </div>
              </v-flex>

            <v-btn color="black" @click="add_cart"><div style="color: white">Add to cart</div></v-btn>
            </v-layout>
          </v-flex>
          <v-flex xs1>

          </v-flex>
        </v-layout>
      </v-content>
        <v-flex xs12>
          <nav_footer></nav_footer>
        </v-flex>
      </v-layout>
    </v-container>
  </v-app>
</template>

<script>
  import nav_header from "../components/new_header"
  import nav_footer from "../components/new_footer"
  import nav_breadcrumb from "../components/new_breadcrumb"
  import axios from "axios"
  import Cookies from "js-cookie"
    export default {
        name: "details",
      data(){
        return {
          breadcrumbItems:[{
            text:"Home",
            disable:true,
            href:"/"
          },{
            text:"Details",
            disable:false,
            href:"/details"
          }],
          goodsid:2,
          imgIndex:1,
          good:null,
          num:1
        }
      },
      mounted:
      function(){
        this.good=this.$route.params.good;
      },
      components:{
          nav_header,
          nav_footer,
          nav_breadcrumb
      },
      methods:{
        add_cart(){
          var good=this.good;
          good.num=this.num;
          axios.post('/api/add_cart',{
            userid:Cookies.get("userid"),
            good: good
          }).then((res)=>{
            if(res.data.status !== '200'){
              console.log(res.data.error);
              alert("error!"+res.data.message);
            }else{
              this.$refs.header.change_cart_num(this.num);
            }
          }, (err)=>{
            alert("cannot connect to server."+err);
          });
        },
        minus1(){
          if(this.num >1){
            this.num-=1;
          }
        }
      }
    }
</script>

<style scoped>

</style>
