// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuetify from 'vuetify'
import './plugins/vuetify'
import ElementUI from 'element-ui';
import 'vuetify/dist/vuetify.min.css';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App'
import router from './router'
import infiniteScroll from 'vue-infinite-scroll'

Vue.use(Vuetify);
Vue.use(infiniteScroll);
Vue.config.productionTip = false;
Vue.use(ElementUI);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  router,
  components: { App },
  template: '<App/>'
});
