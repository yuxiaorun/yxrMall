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
        <v-flex xs10>
          <v-content v-show="addressFlag" style="padding-top: 0px">
            <div class="display-1" style="height: 80px; display: flex; align-items:Center;
" >
              Please choose your address:
            </div>
          <address_section v-on:choose_address="choose_address()" ref="address_section"></address_section>
          </v-content>

          <v-content style="padding-top:0px" v-if="defaultAddress!==null" v-show="!addressFlag">
          <v-layout row wrap>
            <v-flex xs12>
          <div class="display-1" style="height: 80px; display: flex; align-items:Center;
">
            1. Shipping Address:
          </div>
          <v-divider></v-divider>
            </v-flex>
            <v-flex v-bind:class="{'xs6':!is_small, 'xs12':is_small}">
          <v-card color="white" class="black--text"  height="240px" flat
          >

            <v-card-title primary-title >
              <div>
                <h3 class="headline mb-0"> {{defaultAddress.receiverName}}</h3>
                <div>{{defaultAddress.address}}
                  <br>{{defaultAddress.postcode}}
                  <br> Phone Number: {{defaultAddress.contact}}
                  <br><br>
                </div>
              </div>
            </v-card-title>

            <v-card-actions>
              <v-btn  color="black" @click="addressFlag=true"><div style="color: white">Change</div></v-btn>
            </v-card-actions>
          </v-card>

            </v-flex>
            <v-flex xs12>
              <v-divider></v-divider>
              <div class="display-1" style="height: 80px; display: flex; align-items:Center;
">
                2. View Items:
              </div>
              <v-divider></v-divider>
            </v-flex>
            <v-flex xs12>
              <v-toolbar flat>
                <v-layout row >
                  <v-flex xs1>

                  </v-flex>
                  <v-flex xs2>

                  </v-flex>
                  <v-flex xs4>
                    <v-toolbar-title>Items</v-toolbar-title>
                  </v-flex>
                  <v-flex>
                    <v-spacer></v-spacer>
                  </v-flex>
                  <v-flex xs2 >
                    <v-toolbar-title v-show="!is_small">quantity</v-toolbar-title>
                  </v-flex>
                  <v-flex xs2>
                    <v-toolbar-title v-show="!is_small">subtotal</v-toolbar-title>
                  </v-flex>
                </v-layout>
              </v-toolbar>
            </v-flex>
            <v-flex xs12>
              <v-list v-for="(item, index) in items" three-line style="padding: 0px;" >
                <v-list-tile >
                  <v-layout align-center justify-center row fill-height >
                    <v-flex xs1 >
                      {{index+1}}.
                    </v-flex>
                    <v-flex xs2 v-show="!is_small">
                      <div>

                        <v-img v-bind:src="'../../static/img/'+item.productid+'/1.jpg'" height="70px" width="100px" ></v-img>
                      </div>
                    </v-flex>
                    <v-flex xs4>
                      <a>{{item.name}}</a>
                    </v-flex>
                    <v-flex xs1>
                      <v-spacer></v-spacer>
                    </v-flex>
                    <v-flex xs2>
                      <v-list-tile-title style="display: inline">{{item.num}}</v-list-tile-title>
                    </v-flex>
                    <v-flex xs2>
                      <v-list-tile-title style="display: inline">${{item.num*item.price}}</v-list-tile-title>
                    </v-flex>
                  </v-layout>

                </v-list-tile>
                <v-divider></v-divider>
              </v-list>
              </v-flex>
            <v-flex xs12>
              <div style="height: 20px">

              </div>
            </v-flex>
            <v-flex xs12>
              <div style="height: 80px">

                <v-card height="80px" style="display: flex; align-items:Center; justify-content: center">
                  <v-layout>
                    <v-flex xs5 v-show="!is_small">

                    </v-flex >
                    <v-flex xs3 v-show="!is_small">
                    <div class="display-1">
                  Order total:
                    </div>
                    </v-flex>
                    <v-flex xs1 v-show="is_small"></v-flex>
                    <v-flex v-bind:class="{'xs2':!is_small,'xs5':is_small}">
                      <div class="display-1">
                        ${{totalPrice}}
                      </div>
                    </v-flex >
                    <v-flex v-bind:class="{'xs2':!is_small,'xs6':is_small}">
                     <v-btn  color="success" @click="place_order">
                       Place Order
                     </v-btn>
                    </v-flex>
                  </v-layout>
                </v-card>
              </div>
            </v-flex>
          </v-layout>
        </v-content>
        </v-flex>
        <v-flex xs12>
          <nav_footer></nav_footer>
        </v-flex>
        <my_form v-bind:mdShow="thanksShow" v-on:close="close_modal">
          <div slot="text_fields" style="text-align: center">
              <div class="title">Thank your for purchase!</div>
          </div>
          <div slot="btns" style="text-align: center">
            <v-btn
              color="success"
              @click="to_home"
            >
              Continue Shopping
            </v-btn>
          </div>
        </my_form>
      </v-layout>
    </v-container>
  </v-app>
</template>

<script>
  import nav_header from "../components/new_header"
  import nav_footer from "../components/new_footer"
  import nav_breadcrumb from "../components/new_breadcrumb"
  import address_section from "../components/address_section"
  import my_form from "../components/Form"
  import axios from 'axios'
  import Cookies from "js-cookie"

    export default {
        name: "confirm_order",
      data(){
          return {
            items:[],
            userid:"",
            totalPrice:0,
            defaultAddress:null,
            breadcrumbItems:[{
              text:"Home",
              disable:true,
              href:"/"
            },{
              text:"Cart",
              disable:false,
              href:"/#/cart"
            },{
              text:"Confirm Order",
              disable:true,
              href:""
            }],
            addressFlag:false,
            thanksShow:false

          }
      },
      components:{
          nav_header,
        nav_footer,
        nav_breadcrumb,
        address_section,
        my_form,
      },
      computed:{
        is_small(){
          return (this.$vuetify.breakpoint.name==='xs' || this.$vuetify.breakpoint.name==='sm')
        }
      },
      mounted:
     function () {
       this.userid=this.$route.params.userid;
       this.get_default_address();
       this.items=this.$route.params.checked_items;

       this.items.forEach((item)=>{
         this.totalPrice+=item.num*item.price;
       });

     },
      methods:{

        to_address(){
          this.$router.push({
            path:"/ui/address"

          });
        },
        get_default_address() {
          axios.get('api/get_default_address', {
            params: {
              userid: this.userid
            }
          }).then((res) => {
              if (res.data.status === '200') {
                this.defaultAddress=res.data.result.defaultAddress;
              } else {
                this.addressFlag=true;
              }
            }
          ).catch((err) => {
            alert(err);
          });
        },
        delete_item(){
              axios.post('api/delete_cart', {
                goods:this.items,
                userid:this.userid
              }).then((res)=>{
                if(res.data.status!=='200'){
                  alert("edit cart fail!");
                }
              }, (err)=>{
                alert(err);
              });
              for(var i=0;i<this.items.length;i++){
              this.$refs.header.change_cart_num(-1*this.items[i].num);
            }
        },
        place_order(){
          var order={};
          order.userid=this.userid;
          order.destination=this.defaultAddress.address;
          var date=new Date();
          order.ordertime=date.toLocaleTimeString()+' '+date.toDateString();
          order.content=this.items;
          axios.post('api/add_order', {
            order:order,
          }).then((res)=>{
            if (res.data.status === '200') {
              this.delete_item();
              this.thanksShow=true;
            }

          });
        },
        choose_address(){
          this.defaultAddress = this.$refs.address_section.choosedAddress;
          this.addressFlag=false;
        },
        close_modal(){
          this.thanksShow=false;
        },
        to_home(){
          this.$router.push('/');
        }
      }
    }
</script>

<style scoped>

</style>
