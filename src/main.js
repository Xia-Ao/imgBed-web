/*
 * @Author: ao.xia 
 * @Date: 2020-01-06 00:17:26 
 * @Last Modified by: ao.xia
 * @Last Modified time: 2020-01-08 09:32:19
 */

import VueRouter from 'vue-router';
import Vue from 'vue';


import routes from './router';
import './index.less';

import App from './App.vue';

Vue.use(VueRouter);

new Vue({
    el: '#app',
    router: new VueRouter({routes}),
    components: {App},
    template: '<App/>'
})





