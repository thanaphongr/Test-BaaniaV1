
/* eslint-disable */
import Vue from 'vue'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue'
import axios from 'axios'
import VueMaterial from 'vue-material'
import VueSimpleAlert from "vue-simple-alert"
import swal from 'sweetalert';

import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import '../node_modules/bootstrap-vue/dist/bootstrap-vue.css'
import 'vue-search-select/dist/VueSearchSelect.css'

Vue.use(BootstrapVue, { css: true });
Vue.use(VueMaterial);
Vue.use(VueSimpleAlert);

Vue.config.productionTip = false;

Vue.prototype.$https = axios;

new Vue({
  render: h => h(App),
}).$mount('#app')
