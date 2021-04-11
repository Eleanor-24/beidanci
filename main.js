import Vue from 'vue'
import App from './App'
import uView from "uview-ui";
import request from 'common/api.js'
Vue.use(uView);
Vue.prototype.$request=request
Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	
    ...App
})
app.$mount()
