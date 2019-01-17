<template>
  <div v-show="mdShow">
  <v-form ref="form" lazy-validation v-bind:class="{'my-form':!is_small, 'my-form-sm':is_small}" style="padding: 20px">
    <v-container>
    <slot name="text_fields"></slot>
    <slot name="btns"></slot>
    </v-container>
  </v-form>
    <div class="md-overlay" v-if="mdShow" @click="close_modal"></div>
  </div>
</template>

<script>
    export default {
        name: "Form",
      props:["mdShow","type"],
      data(){
          return {
          }
      },
      computed:
        {
          is_small(){
            return (this.$vuetify.breakpoint.name==='xs' || this.$vuetify.breakpoint.name==='sm')
          }
        },
      methods:{
        close_modal(){
          this.$emit("close");
        },

      }
    }
</script>

<style >
  .my-form {
    background-color: white;
    position: fixed;
    top: 50%;
    left: 50%;
    width: 535px;
    /*height: 50%;*/
    -webkit-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    z-index: 201;
  }
  .my-form-sm {
    background-color: white;
    position: fixed;
    top: 50%;
    left: 50%;
    width: 300px;
    /*height: 50%;*/
    -webkit-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    z-index: 201;
  }
  .md-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 200;
  }
</style>
