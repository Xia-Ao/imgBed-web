/*
 * @Author: ao.xia
 * @Date: 2020-01-06 00:17:26
 * @Last Modified by: ao.xia
 * @Last Modified time: 2020-01-21 14:40:19
 */

import VueRouter from 'vue-router';
import Vue from 'vue';

import routes from './router';
import './index.less';
import App from './App.vue';

Vue.use(VueRouter);

new Vue({
    router: new VueRouter({
        mode: 'history',
        routes,
    }),
    render: (h) => h(App),
}).$mount('#app');
