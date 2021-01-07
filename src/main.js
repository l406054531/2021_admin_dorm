import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/permission';
import '@/style/view.scss'
import '@/assets/icon/iconfont.css';

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios'
//全局引入控件
import myForm from "@/components/Form/form";
Vue.component('my-form', myForm)

Vue.config.productionTip = false

Vue.prototype.$axios = axios

Vue.use(ElementUI);

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')