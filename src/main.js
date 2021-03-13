import Vue from 'vue';
import store from './store';
import router from './router'
import App from './App.vue';
import axios from 'axios';
import echarts from 'echarts'
axios.defaults.withCredentials = true;
Vue.prototype.$echarts = echarts;
Vue.prototype.$http = axios;
Vue.config.productionTip = false;
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
//江南江北一条街,打听打听谁是爹
