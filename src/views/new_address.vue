<template>
  <v-app id="inspire">
    <link href="https://fonts.googleapis.com/css?family=Material+Icons" rel="stylesheet">

    <v-container grid-list-md style="margin:0px">
      <v-layout align-start justify-start row wrap>
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
        <v-flex xs12>
          <v-content style="padding-top: 0px">
            <div class="display-1" style="height: 80px; display: flex; align-items:Center; padding: 20px;
">
              Your Address:
            </div>
        <address_section></address_section>
            </v-content>
        </v-flex>
  <v-flex xs12>
  <nav_footer></nav_footer></v-flex>
      </v-layout>
    </v-container>
  </v-app>
</template>

<script>
  import nav_header from "../components/new_header"
  import nav_footer from "../components/new_footer"
  import nav_breadcrumb from "../components/new_breadcrumb"
  import address_section from "../components/address_section"
  import axios from 'axios'
  import Cookies from "js-cookie"


  export default {
        name: "new_address",
      data(){
          return{
            breadcrumbItems:[{
              text:"Home",
              disable:true,
              href:"/"
            },{
              text:"Address",
              disable:false,
              href:"/address"
            }]
          }
      },
      mounted:function(){
      },
      computed:{
        content_grid(){
          switch (this.$vuetify.breakpoint.name) {
            case 'xs': return 'xs12'
            case 'sm': return 'xs12'
            case 'md': return 'xs3'
            case 'lg': return 'xs3'
            case 'xl': return 'xs3'
          }
        }
      },
      components:{
          nav_header,
          nav_footer,
          address_section,
          nav_breadcrumb
      },
      methods:{

      }
    }
</script>

<style scoped>

</style>
