// import Vue from 'vue'
// import App from './App.vue'
// import router from './'
// import store from './store'
// import vuetify from './plugins/vuetify'
// import axios from './plugins/axios'
// import general from './mixins/general'
// import titleMixin from './mixins/titleMixin'
// import * as VeeValidate from 'vee-validate';
// import moment from 'moment'
// // import general from '@/mixins/general'
// // import VueChart from 'vue-chart-js'
// // import titleMixin from './mixins/titleMixin'

// Vue.mixin(titleMixin)

// Vue.prototype.moment = moment

// // Vue.config.productionTip = false
// Vue.use(VeeValidate)
// // Vue.use(VueChart)
// Vue.mixin(general)

// new Vue({
//     router,
//     vuetify,
//     axios,
//     store,
//     render: h => h(App),
// }).$mount('#app')
 

/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

 require('./bootstrap');

 window.Vue = require('vue').default;
 
//  import ConfirmDialog from "./Mixins/ConfirmDialog.vue";
//  import Notification from "./Mixins/Snackbar.vue";
 
//  Vue.mixin(ConfirmDialog);
//  Vue.mixin(Notification);
 
 import vuetify from './plugins/vuetify';
 import router from './plugins/router';
 import store from './store';
//  import apexchart from './plugins/apexchart';
//  import toast from './plugins/toast';
//  import Axios from './plugins/axios';
 
 
 import App from './layouts/App.vue';
 import moment from 'moment'
//  Vue.prototype.$admin = Axios
//  Vue.prototype.moment = moment
 
 
 import Vue from "vue";
//  import VueQrcodeReader from "vue-qrcode-reader";
 
//  Vue.use(VueQrcodeReader);


 const app = new Vue({
     router,
     store,
     vuetify,
     el: '#app',
     render: h => h(App)
 });

 
Vue.filter('formatDate', function(value) {
  if (value) {
    return moment(String(value)).format('MM/DD/YYYY hh:mm')
  }
})
 