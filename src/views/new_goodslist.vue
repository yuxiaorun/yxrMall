<template>
  <div id="app">
    <link href="https://fonts.googleapis.com/css?family=Material+Icons" rel="stylesheet">
    <v-app id="inspire">
      <v-navigation-drawer
        fixed
        v-model="drawer"
        app
        right
        v-if="sideShow"
      >
        <v-list-tile>
          <v-list-tile-title class="title" style="padding-left: 15px">
            Price:
          </v-list-tile-title>
        </v-list-tile>

        <v-divider></v-divider>

        <v-list dense class="pt-0">
          <v-list-tile check @click="set_price_filter('all')">
            <transition name="slide-into">
              <v-list-tile-action v-show="priceChecked==='all'" >
                <v-icon color="red" >keyboard_arrow_right</v-icon>
              </v-list-tile-action></transition>
            <v-list-tile-content>

              <v-list-tile-title>All</v-list-tile-title>
            </v-list-tile-content>

          </v-list-tile>
          <v-list-tile
            v-for="(item, index) in priceRange"
            @click="set_price_filter(index)"
            check
          >
            <transition name="slide-into">
              <v-list-tile-action v-show="priceChecked===index">
                <v-icon color="red" >keyboard_arrow_right</v-icon>
              </v-list-tile-action>
            </transition>
            <v-list-tile-title>{{item.start}}-{{item.end}}</v-list-tile-title>
          </v-list-tile>
        </v-list>
        <v-divider></v-divider>
        <v-list-tile>
          <v-list-tile-title class="title" style="padding-left: 15px">
            Sort By:
          </v-list-tile-title>
        </v-list-tile >
        <v-divider></v-divider>
        <v-list>
          <v-list-tile check @click="change_sort_order">

            <v-list-tile-content>

              <v-list-tile-title>Price</v-list-tile-title>
            </v-list-tile-content>
            <v-list-tile-action >
              <v-icon color="black" v-show="sortOrder===1">arrow_upward</v-icon>
              <v-icon color="black" v-show="sortOrder===-1">arrow_downward</v-icon>

            </v-list-tile-action>

          </v-list-tile>
        </v-list>
      </v-navigation-drawer>
      <v-container style="padding: 0px; margin: 0px; border: 0px" grid-list-md >
        <v-layout align-start justify-start row wrap>
          <v-flex xs12>
            <nav_header ref="header" v-bind:sideShow="sideShow" v-on:show_filter="show_filter">
            </nav_header>
          </v-flex>

      <v-content >
        <v-container fluid grid-list-xl style="margin: 0px; padding: 0px">
          <v-layout  row wrap>
            <v-flex xs12 style="height: 30px; padding-left:40px">
            <nav_breadcrumb v-bind:breadcrumbItems="breadcrumbItems">
            </nav_breadcrumb>
          </v-flex>
            <v-flex xs3 class="hidden-sm-and-down">
              <v-navigation-drawer permanent class="hidden-sm-and-down">

                    <v-list-tile>
                      <v-list-tile-title class="title" style="padding-left: 15px">
                        Price:
                      </v-list-tile-title>
                    </v-list-tile>

                <v-divider></v-divider>

                <v-list dense class="pt-0">
                  <v-list-tile check @click="set_price_filter('all')">
                    <transition name="slide-into">
                    <v-list-tile-action v-show="priceChecked==='all'" >
                      <v-icon color="red" >keyboard_arrow_right</v-icon>
                    </v-list-tile-action></transition>
                    <v-list-tile-content>

                      <v-list-tile-title>All</v-list-tile-title>
                    </v-list-tile-content>

                  </v-list-tile>
                  <v-list-tile
                    v-for="(item, index) in priceRange"
                    @click="set_price_filter(index)"
                    check
                  >
                    <transition name="slide-into">
                    <v-list-tile-action v-show="priceChecked===index">
                      <v-icon color="red" >keyboard_arrow_right</v-icon>
                    </v-list-tile-action>
                    </transition>
                      <v-list-tile-title>{{item.start}}-{{item.end}}</v-list-tile-title>
                  </v-list-tile>
                </v-list>
                <v-divider></v-divider>
                <v-list-tile>
                  <v-list-tile-title class="title" style="padding-left: 15px">
                    Sort By:
                  </v-list-tile-title>
                </v-list-tile >
                <v-divider></v-divider>
                <v-list>
                <v-list-tile check @click="change_sort_order">

                  <v-list-tile-content>

                    <v-list-tile-title>Price</v-list-tile-title>
                  </v-list-tile-content>
                  <v-list-tile-action >
                    <v-icon color="black" v-show="sortOrder===1">arrow_upward</v-icon>
                    <v-icon color="black" v-show="sortOrder===-1">arrow_downward</v-icon>

                  </v-list-tile-action>

                </v-list-tile>
                </v-list>
              </v-navigation-drawer>
            </v-flex>

            <v-flex md9>
              <v-container fluid fill-height  grid-list-sm style="padding: 0px">
                <v-layout align-center justify-start row wrap>
                  <v-flex v-bind:class="content_grid"  v-for="(item, index) in goodslist">

              <v-card color="white" class="black--text" @click="to_details(index)" hover
              >
                <v-layout v-bind:class="{column: !is_small}">
                  <v-hover>
                  <v-flex xs7 slot-scope="{hover}">
                <v-img
                  v-bind:src="'../../static/img/'+item.productid+'/1.jpg'"
                  height="350px"
                  v-show="!hover"
                ></v-img>
                    <v-img
                      v-bind:src="'../../static/img/'+item.productid+'/2.jpg'"
                      height="350px"
                      v-show="hover"
                    ></v-img>

                  </v-flex></v-hover>
                  <v-flex xs5>
                <v-card-text  style="padding: 10px;">

                    <div class="font-weight-thin" style="height: 80px">{{item.name}}</div>
                    <div class="title font-weight-bold" style="height: 30px">${{item.price}}</div>
                </v-card-text>
                  </v-flex>
                </v-layout>
                <!--<v-divider></v-divider>-->
                <!--<v-card-actions>-->
                  <!--<v-spacer></v-spacer>-->
                  <!--<v-btn flat color="red" @click="add_cart(index)">Add</v-btn>-->
                  <!--<v-btn flat color="red">Details</v-btn>-->
                <!--</v-card-actions>-->
              </v-card>

                  </v-flex>
                </v-layout>
              </v-container>
              <div v-infinite-scroll="loadMore" class="load-more" infinite-scroll-disabled="busy" infinite-scroll-distance="30" >
                <img src="../../node_modules/loading-svg/loading-cylon-red.svg" class="Loading-icon" v-show="isLoading" width="500px" height="15px"/>
              </div>
            </v-flex>
          </v-layout>
        </v-container>

      </v-content>

            <v-flex xs12>
              <v-spacer></v-spacer>
      <nav_footer></nav_footer>
            </v-flex>
        </v-layout>
      </v-container>
    </v-app>
  </div>
</template>

<script>
  import Form from "../components/Form"
  import nav_header from "../components/new_header"
  import nav_footer from "../components/new_footer"
  import nav_breadcrumb from "../components/new_breadcrumb"
import Cookies from "js-cookie"
  import axios from 'axios'

  export default {
        name: "new_goodslist",
      data(){
          return{
            userid:"",
            drawer:false,
            loginfmShow:false,
            registerfmShow:false,
            goodslist:[],
            priceRange:[{
              start:0,
              end:100
            },{
              start:100,
              end:500
            },{
              start:500,
              end:1000
            }],
            priceChecked: 'all',
            filterBy:false,
            overLayFlag:false,
            sortOrder:1,
            page:1,
            pageSize: 6,
            busy:false,
            test:0,
            isLoading:false,
            breadcrumbItems:[{
              text:"Home",
              disable:true,
              href:"/"
            }],

          }
      },
      components:{
        nav_header,
        nav_footer,
        nav_breadcrumb
      },
    mounted:function(){
      this.goodslist = this.get_goods_list();
    },
      computed:{
          content_grid(){
            switch (this.$vuetify.breakpoint.name) {
              case 'xs': return 'xs12'
              case 'sm': return 'xs12'
              case 'md': return 'xs4'
              case 'lg': return 'xs4'
              case 'xl': return 'xs4'
            }
          },
        sideShow(){
            if(this.is_small){
              return true;
            }
            return false;
        },
        is_small(){
            return (this.$vuetify.breakpoint.name==='xs' || this.$vuetify.breakpoint.name==='sm')
        }
    },
      methods:{
        get_goods_list(add_flag){
          //get goods data.
          var list=[];
          axios.get('/api/goods',{
            params:{
              sortOrder:this.sortOrder,
              page:this.page,
              pageSize:this.pageSize,
              priceRange: this.priceChecked==='all'?undefined:this.priceRange[this.priceChecked],
            }
          }).then((res)=>{
            console.log(res.data);
            if(!add_flag){
              this.goodslist=res.data.result.list;
              return;
            }else{
              if(res.data.result.list.length===0){
                this.busy=true;
                return;
              }
              this.goodslist=this.goodslist.concat(res.data.result.list);
              this.busy = false;
            }
          },(err)=>{
            alert("cannot connect to server."+err);
          });
        },

        set_price_filter(index){
          this.page=1;
          this.priceChecked = index;
          this.get_goods_list();
          this.close_pop();
          this.busy=false;
        },
        show_filter_pop(){
          this.filterBy=true;
          this.overLayFlag=true;
        },
        close_pop(){
          this.filterBy=false;

          this.overLayFlag=false;
        },
        change_sort_order(){
          if(this.sortOrder === 1){
            this.sortOrder = -1;
          }else{
            this.sortOrder = 1;
          }
          this.page=1;
          this.busy=false;
          this.get_goods_list();
        },
        loadMore(){
          this.isLoading=true;
          this.busy=true;
          setTimeout(() => {
            this.page++;
            this.get_goods_list(true);
            this.isLoading=false;
          }, 1000);
        },
        add_cart(index){
          var good=this.goodslist[index];
          good.num=1;
          axios.post('/api/add_cart',{
            userid:Cookies.get("userid"),
            good: good
          }).then((res)=>{
            if(res.data.status !== '200'){
              console.log(res.data.error);
              alert("error!"+res.data.message);
            }else{
              this.$refs.header.change_cart_num(1);

            }
          }, (err)=>{
            alert("cannot connect to server."+err);
          });
        },

        to_details(index){
          var good=this.goodslist[index];
          this.$router.push({
            name:"details",
            params:{
              good: good,
            }
          });
        },
        show_filter(){
          this.drawer = !this.drawer
        }

      }
    }
</script>

<style >
.btn{
  height: 100px;
}
.load-more{
  height: 50px;
  text-align: center;

}
.slide-into-enter-active {
  transition: all .3s ease;
}
.slide-into-leave-active {
  transition: all .01s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-into-enter, .slide-fade-leave-to
  /* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(-20px);
  opacity: 1;
}
</style>
