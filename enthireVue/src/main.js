import Vue from 'vue'

// import VeeValidate from "vee-validate";

import App from './App.vue'
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
 import * as VeeValidate from "vee-validate";
 import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

Vue.use(VeeValidate);

// import uuid from "uuid";
// Vue.use(VeeValidate);
Vue.config.productionTip = false


new Vue({
  render: h => h(App),
}).$mount('#app')
