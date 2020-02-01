
interface Imenu {
    name: string;
    label: string;
    icon: string;
    path: string;
}

const menu: Imenu[] = [
    {
        name: 'home',
        label: '图床',
        icon: 'el-icon-picture',
        path: '/home',
    },
    {
        name: 'about',
        label: 'About',
        icon: 'el-icon-document',
        path: '/about',
    },
];

export default menu;
