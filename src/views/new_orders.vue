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

                  <v-flex xs12 v-for="(order, order_index) in orders">
                    <v-card>
                      <v-toolbar flat >
                        <v-layout row >
                          <v-flex xs7>
                            <v-toolbar-title v-show="!is_small">Order:#{{order._id}}</v-toolbar-title>
                          </v-flex>
                          <v-flex xs5 v-bind:class="{'xs5':!is_small, 'xs12':is_small}">
                            <v-toolbar-title>Time:{{order.ordertime}}</v-toolbar-title>
                          </v-flex>
                        </v-layout>
                      </v-toolbar>
                      <v-list v-for="(item, index) in order.content" three-line style="padding: 0px;" >
                        <v-list-tile >
                          <v-layout align-center justify-center row fill-height >
                            <v-flex xs1 >
                              {{index+1}}.
                            </v-flex>
                            <v-flex v-bind:class="{'xs2':!is_small, 'xs5':is_small}" >
                              <div style="padding-left:10px">

                                <v-img v-bind:src="'../../static/img/'+item.productid+'/1.jpg'" height="70px" width="100px" ></v-img>
                              </div>
                            </v-flex>
                            <v-flex v-bind:class="{'xs4':!is_small, 'xs6':is_small}">
                              <a>{{item.name}}</a>
                            </v-flex>
                            <v-flex xs1 v-show="!is_small">
                              <v-spacer></v-spacer>
                            </v-flex>
                            <v-flex xs2 v-show="!is_small">
                              <v-list-tile-title style="display: inline">quantity: {{item.num}}</v-list-tile-title>
                            </v-flex>
                            <v-flex xs2 v-show="!is_small">
                              <v-list-tile-title style="display: inline">subtotal:${{item.num*item.price}}</v-list-tile-title>
                            </v-flex>
                          </v-layout>

                        </v-list-tile>
                        <v-divider></v-divider>
                        <div v-show="is_small" >
                          <v-layout row wrap>
                          <v-flex xs6 >
                            <v-list-tile-title style="display: inline; padding-left: 10px">quantity: {{item.num}}</v-list-tile-title>
                          </v-flex>
                          <v-flex xs6>
                            <v-list-tile-title style="display: inline">subtotal: ${{item.num*item.price}}</v-list-tile-title>
                          </v-flex>
                          </v-layout>
                        </div>
                        <v-divider></v-divider>
                      </v-list>
                    </v-card>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-content></v-flex>

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
  import axios from 'axios'
  import nav_breadcrumb from "../components/new_breadcrumb"

  export default {
        name: "new_orders",
    data(){
          return {
            breadcrumbItems:[{
              text:"Home",
              disable:true,
              href:"/"
            },{
              text:"Orders",
              disable:false,
              href:"/orders"
            }],
            userid:"",
            orders:[]
          }
          },
    mounted:function(){
          this.userid = Cookies.get("userid");
          this.get_orders();
    },
    components:{
      nav_header,
      nav_footer,
      nav_breadcrumb
    },
    computed:{
      is_small(){
        return (this.$vuetify.breakpoint.name==='xs' || this.$vuetify.breakpoint.name==='sm')
      }
    },
    methods:{
          get_orders(){
            axios.get('api/get_orders',{
              params:{
                userid:this.userid
              }
            }).then((res)=>{
              if(res.data.status === '200'){
                this.orders=res.data.result.list;
              }else{
                alert(res.data.message);
              }
            });
          }
    }
    }
</script>

<style scoped>

</style>
