
import App from './App';
import Header from './views/header/index';

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