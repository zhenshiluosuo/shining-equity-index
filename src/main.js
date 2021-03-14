import Vue from 'vue';
import store from './store';
import router from './router'
import App from './App.vue';
import axios from 'axios';
import echarts from 'echarts'
axios.defaults.withCredentials = true;
const allPendingRequestsRecord = []
function removeAllPendingRequestsRecord () {
  allPendingRequestsRecord.forEach((item) => {
    item.cancel('page changes') // 取消请求
  })
  allPendingRequestsRecord.splice(0) // 移除所有记录
}

function removePendingRequestRecord (config) {
  allPendingRequestsRecord.some((item, index) => {
    if (item.url === config.url) {
      item.cancel() // 取消请求
      allPendingRequestsRecord.splice(index, 1) // 移除记录
      return true
    }
  })
}
axios.interceptors.request.use(
  config => {
    // 在发送请求之前做些什么


    // 在请求发送前执行一下取消操作，防止重复发送请求
    removePendingRequestRecord(config)

    // 设置请求的 cancelToken
    config.cancelToken = new axios.CancelToken(function executor (cancel) {
      // 添加记录，记录请求的url和取消方法
      allPendingRequestsRecord.push({ url: config.url, cancel })
    })


    return config
  },
  error => {
    // 对请求错误做些什么
    Promise.reject(error)
  }
)

axios.interceptors.response.use(
  res => {
    // 对响应数据做点什么

    // 请求成功后移除记录
    removePendingRequestRecord(res.config)

    if (!res.data) {
      return Promise.reject(res)
    }

    return res
  },
  error => {
    // 对响应错误做点什么
    // 请求失败，移除记录
    removePendingRequestRecord(error.response.config)

    return Promise.reject(error)
  }
)

Vue.prototype.$echarts = echarts;
Vue.prototype.$http = axios;
Vue.config.productionTip = false;

router.beforeEach((to, from, next) => {
  console.log("已清空所以http请求")
  removeAllPendingRequestsRecord()
  next()
})


new Vue({
  
  router,
  store,
  render: h => h(App),
}).$mount('#app');
//江南江北一条街,打听打听谁是爹
