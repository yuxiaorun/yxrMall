import Vue from 'vue'
import Router from 'vue-router'
import new_goodslist from '../views/new_goodslist'
import new_cart from '../views/new_cart'
import new_address from '../views/new_address'
import confirm_order from '../views/confirm_order'
import orders from '../views/new_orders'
import details from '../views/new_details'



Vue.use(Router);

export default new Router({
  routes: [
    {
      path:'/',
      name:'goodlist',
      component: new_goodslist,
    },
    {
      path:'/cart',
      name:'cart',
      component: new_cart,
    },
    {
      path:'/address',
      name: 'address',
      component: new_address,
    },
    {
      path:'/confirm_order',
      name:"confirm_order",
      component: confirm_order
    },
    {
      path:'/orders',
      name:"orders",
      component: orders
    },
    {
      path:'/details',
      name:"details",
      component: details
    }

  ]})

