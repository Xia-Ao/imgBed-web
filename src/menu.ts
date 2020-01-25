
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
        icon: 'el-icon-menu',
        path: '/',
    },
    {
        name: 'detail',
        label: '图片详情',
        icon: 'el-icon-document',
        path: '/detail',
    },
];

export default menu;
