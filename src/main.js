import Vue from 'vue'
import App from './App.vue'

import 'animate.css';
import axios from 'axios';
import detectPrefixs from './utilities/detectTransitionsPrefix.js';
import animations from './utilities/animations.js';
import env from './utilities/detectEnv.js';
const prefixs = detectPrefixs();
Vue.prototype.$animations = animations;
Vue.prototype.$animationEnd = prefixs.animationEnd;
Vue.prototype.$transitionEnd = prefixs.transitionEnd;
axios.defaults.baseURL = env.baseUrl;
Vue.prototype.$http = axios;
Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')