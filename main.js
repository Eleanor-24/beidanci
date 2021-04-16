import Vue from 'vue'
import App from './App'
import uView from "uview-ui";
import request from 'common/api.js'
import btfRequest from 'common/btfSentenceRequest.js'
Vue.use(uView);
Vue.prototype.$request=request
Vue.prototype.$btfRequest=btfRequest
Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	
    ...App
})
app.$mount()
