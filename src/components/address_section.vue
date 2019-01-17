<template>
  <v-container fluid fill-height  grid-list-sm>
    <v-layout align-center justify-start row wrap>
      <v-flex v-bind:class="content_grid"   v-for="(item, index) in addressList">
        <v-card color="white" class="black--text"  height="240px" hover
        >
          <v-layout column >
              <h3 class="headline mb-0" style="padding-left: 20px; padding-right: 20px;padding-top: 10px">{{item.receiverName}}</h3>
            <v-flex xs9 style="height: 132px" @click="choose_address(index)">
              <div style="padding: 20px">{{item.address}}
                <br>{{item.postcode}}
                <br> Phone Number: {{item.contact}}
              </div>
            </v-flex>
            <v-flex xs3>
              <v-card-actions>
                <div v-show="index===defaultAddressIndex" style="padding-left: 20px">Default</div>
                <v-btn flat color="black" v-show="index!==defaultAddressIndex" @click="set_default(index)">Set Default</v-btn>
                <v-spacer></v-spacer>
                <v-btn flat color="black" @click="delete_address(index)">Delete</v-btn>
              </v-card-actions>
            </v-flex>
          </v-layout>
        </v-card>

      </v-flex>
      <v-flex v-bind:class="content_grid" >
        <v-card color="white" class="black--text"
                height="200px" hover style="height: 240px; display: flex; justify-content:center; align-items:Center;"
                @click="addFlag=true">

          <v-icon size="100">add</v-icon>

        </v-card>

      </v-flex>
    </v-layout>
    <my_form v-bind:mdShow="deleteFlag" v-on:close="close_modal('delete')">
      <div slot="text_fields" >
        <h2>Are you sure you want to delete your default address?</h2>
      </div>
      <div slot="btns">
        <v-layout row wrap style="text-align: center">
          <v-flex xs6>
            <v-btn
              color="success"
              @click="delete_default_address()"
            >
              Delete it
            </v-btn>
          </v-flex>
          <v-flex xs6>
            <v-btn
              color="red"
              @click="deleteFlag=false"
            >
              Cancel
            </v-btn>
          </v-flex>
        </v-layout>
      </div>
    </my_form>
    <my_form v-bind:mdShow="addFlag" v-on:close="close_modal('add')">
      <div slot="text_fields" >
        <h2>Input New Address:</h2>
        <v-text-field
          v-model="newAddress.receiverName"
          label="Receiver's Name"
          :rules="[required]"
          required
        ></v-text-field>
        <v-text-field
          v-model="newAddress.address1"
          label="Address 1st line"
          :rules="[required]"
          required
        ></v-text-field>
        <v-text-field
          v-model="newAddress.address2"
          label="Address 2nd line"
        ></v-text-field>
        <v-text-field
          v-model="newAddress.postcode"
          label="Postcode"
          :rules="[required]"

          required
        ></v-text-field>
        <v-text-field
          v-model="newAddress.contact"
          label="Phone Number"
          :rules="[required]"

          type="phone"
          required
        ></v-text-field>
      </div>
      <div slot="btns">
        <v-layout row wrap style="text-align: center">
          <v-flex xs6>
            <v-btn
              color="success"
              @click="add_address"
            >
              Add
            </v-btn>
          </v-flex>
          <v-flex xs6>
            <v-btn
              color="red"
              @click="close_modal()"
            >
              Close
            </v-btn>
          </v-flex>
        </v-layout>
      </div>
    </my_form>
  </v-container>
</template>

<script>
  import axios from 'axios'
  import Cookies from "js-cookie"
  import my_form from "./Form"
    export default {
        name: "address_section",
      data(){
        return{
          addressList:[],
          checkIndex:0,
          limit:3,
          defaultAddressId:"",
          defaultAddressIndex:-1,
          choosedAddress:null,
          successmdShow:false,
          newAddress:{
            receiverName:"",
            postcode:"",
            contact:"",
            address1: "",
            address2:""
          },
          addFlag:false,
          deleteFlag:false,
          required: value => !!value || 'Required.',
        }
      },
      mounted:function(){
        this.get_address();
        this.get_default_address();

      },
      components:{
          my_form
      },
      computed:{
        addressShown(){
          return this.addressList.slice(0, this.limit);
        },
        content_grid(){
          switch (this.$vuetify.breakpoint.name) {
            case 'xs': return 'xs12';
            case 'sm': return 'xs12';
            case 'md': return 'xs4';
            case 'lg': return 'xs4';
            case 'xl': return 'xs4';
          }
        }
      },
      methods:{
        get_address(){
          axios.get('api/get_address',{
            params:{
              userid: Cookies.get('userid'),
            }
          }).then((res)=>{
            if(res.data.status==='200'){
              this.addressList=res.data.result.list;
              if(this.addressList.length===1){
                this.set_default(0);
              }
            }else{
              alert("get address failed!");
            }
          });
        },
        add_address(){
          var address={};
          address.receiverName=this.newAddress.receiverName;
          this.newAddress.receiverName="";
          address.address=this.newAddress.address1+' '+this.newAddress.address2;
          this.newAddress.address1="";
          this.newAddress.address2="";
          address.postcode=this.newAddress.postcode;
          this.newAddress.postcode="";
          address.contact=this.newAddress.contact;
          this.newAddress.contact="";
          axios.post('api/add_address', {
            userid:Cookies.get('userid'),
            address:address
          }).then((res)=>{
            if(res.data.status!=='200'){
              alert(res.data.message);
            }
            this.close_modal();
            this.get_address();


          });
        },
        delete_address(index){
          if(this.defaultAddressIndex===index){
            this.deleteFlag=true;
            return;
          }
          var addressid=this.addressList[index]._id;
          axios.get('api/delete_address', {
            params:{
              addressid:addressid
            }
          }).then((res)=> {
            if (res.data.status !== '200') {
              alert(res.data.message);
            }
            this.addressList.splice(index, 1);
            if(index<this.defaultAddressIndex)this.defaultAddressIndex--;
          });
        },
        delete_default_address(){
          var addressid=this.addressList[this.defaultAddressIndex]._id;
          axios.get('api/delete_address', {
            params:{
              addressid:addressid
            }
          }).then((res)=> {
            if (res.data.status !== '200') {
              alert(res.data.message);
            }
            this.addressList.splice(this.defaultAddressIndex, 1);
            this.defaultAddressIndex=-1;
            this.defaultAddressId="";
            this.deleteFlag=false;
          });
          axios.get('api/delete_default_address',{
            params:{
              userid:Cookies.get("userid")
            }
          }).then((res)=> {
            if (res.data.status !== '200') {
              alert(res.data.message);
            }

          });
        },
        get_default_address() {
          axios.get('api/get_default_address', {
            params: {
              userid: Cookies.get('userid')
            }
          }).then((res) => {
              if (res.data.status === '200') {
                this.defaultAddressId = res.data.result.defaultAddressId;
                if(this.defaultAddressId==="")return;
                for(var i=0;i<this.addressList.length;i++){
                  if(this.addressList[i]._id===this.defaultAddressId){
                    this.defaultAddressIndex=i;
                  }
                }

              } else {

              }
            }
          ).catch((err) => {
            alert(err);
          });
        },
        show_more(){
          if(this.limit===3){
            this.limit=this.addressList.length;
          }else{
            this.limit=3;
          }
        },
        set_default(index){
          var addressid=this.addressList[index]._id;
          this.defaultAddressId=addressid;
          axios.get("api/set_default_address", {
            params:{
              userid:Cookies.get("userid"),
              addressid:addressid
            }
          }).then((res)=>{
            if(res.data.status==="200"){
              this.defaultAddressIndex=index;
            }else{
              alert("set default address failed!");
            }
          });
        },
        choose_address(index){
          this.choosedAddress=this.addressList[index];
          this.$emit("choose_address");
        },
        close_modal(){
          this.addFlag=false;
        }
      }
    }
</script>

<style scoped>

</style>
