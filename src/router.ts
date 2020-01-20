
import App from './App.vue';
import Header from './views/header/index.vue';

export default [
    {
        path: '/',
        redirect: App,
    },
    {
        path: '/header',
        component: Header,
    },
]