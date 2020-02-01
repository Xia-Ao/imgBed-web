
import Home from './views/home/index.vue';
import About from './views/about/index.vue';
import NotFound from './views/notFound/index.vue';

interface Route {
    path: string;
    name: string;
    [propName: string]: any;
}

const routes: Route[] = [
    {
        path: '/',
        name: 'default',
        redirect: 'home',
    },
    {
        path: '/home',
        name: 'home',
        component: Home,
    },
    {
        path: '/about',
        name: 'about',
        component: About,
    },
    {
        path: '*',
        name: '404',
        component: NotFound,
    },
];

export default routes;
