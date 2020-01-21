
import Layout from './views/Layout.vue';
import Header from './views/header/index.vue';

interface Route {
    path: string;
    // name: string;
    // redirect?: object;
    // component?: object;
    [propName: string]: any;
}

const routes: Route[] = [
    {
        path: '/',
        name: 'home',
        component: Layout,
    },
    {
        path: '/home',
        name: 'home1',
        redirect: '/',
    },
    {
        path: '/header',
        name: 'header',
        component: Header,
    },
];

export default routes;
