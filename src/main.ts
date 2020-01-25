/*
 * @Author: ao.xia
 * @Date: 2020-01-06 00:17:26
 * @Last Modified by: ao.xia
 * @Last Modified time: 2020-01-25 16:46:44
 */

import VueRouter from 'vue-router';
import Vue from 'vue';

import routes from './router';
import App from './App.vue';
import 'element-ui/lib/theme-chalk/index.css';
import './index.less';

Vue.use(VueRouter);

new Vue({
    router: new VueRouter({
        // mode: 'history',
        routes,
    }),
    render: (h) => h(App),
}).$mount('#app');
