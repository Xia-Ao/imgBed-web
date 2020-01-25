
import Home from './views/home/index.vue';
import imgDetail from './views/detail/index.vue';

interface Route {
    path: string;
    name: string;
    [propName: string]: any;
}

const routes: Route[] = [
    {
        path: '/',
        name: 'home',
        component: Home,
    },
    // {
    //     path: '*',
    //     name: 'home',
    //     redirect: '/',
    // },
    {
        path: '/detail',
        name: 'detail',
        component: imgDetail,
    },
];

export default routes;
