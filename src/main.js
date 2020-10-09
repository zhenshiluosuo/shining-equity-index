import Vue from 'vue';
import Vuex from 'vuex';
import router from './router'
import App from './App.vue';
import axios from 'axios';
import echarts from 'echarts'
Vue.prototype.$echarts = echarts;
Vue.prototype.$http = axios;
Vue.config.productionTip = false;
Vue.use(Vuex);
new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
