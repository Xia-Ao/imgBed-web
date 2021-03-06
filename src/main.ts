/*
 * @Author: ao.xia
 * @Date: 2020-01-06 00:17:26
 * @Last Modified by: ao.xia
 * @Last Modified time: 2020-02-01 15:13:20
 */

import VueRouter from 'vue-router';
import Vue from 'vue';
import axios from 'axios';

import routes from './router';
import {baseApi} from './common/ts/global';
import App from './App.vue';
import 'element-ui/lib/theme-chalk/index.css';
import './index.less';

axios.defaults.baseURL = baseApi;

// 在实例已创建后修改默认值

Vue.use(VueRouter);

new Vue({
    router: new VueRouter({
        routes,
    }),
    render: (h) => h(App),
}).$mount('#app');
