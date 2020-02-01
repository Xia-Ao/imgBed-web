# 嗷嗷图床web端

## 介绍
嗷嗷图床是自建的图床平台，调研发现没有找到一个好用的免费图床平台，其实网上有不少比较好用的图床平台，比如七牛云（你的又一个备案域名）SM.SM等，但是无奈公司网络限制，绝大部分图床平台资源不允许访问，所以很多好的平台就被阉割了，无奈之下只能自己搭建图床。

### 技术栈
- web端使用 vue2.x + ts + element-ui，
- 服务端使用 node + koa ，项目地址：https://github.com/Xia-Ao/fdfs_server
- 图片服务器使用`fastdfs`存储，
- 运维层采用`nginx`部署。

### 功能
v1.0
- 支持批量上传、批量删除
- 支持粘贴上传图片
- 支持https http访问
- 同时支持vscode插件上传，在vscode中写md是粘贴图片直接生成链接。

## 目录
方面以后维护迭代快速回忆

```
├── README.md
├── build                                       // 工程构建配置
│   ├── webpack.base.config.js
│   ├── webpack.dev.config.js
│   └── webpack.prod.config.js
├── package-lock.json
├── package.json
├── postcss.config.js                           // postcss插件配置
├── public                                      // 公共资源
│   └── index.html
├── src                                         // 源码
│   ├── App.vue
│   ├── assets                                  // 静态资源
│   │   └── logo.png
│   ├── common                                  // 公共文件
│   │   ├── less                                // 样式
│   │   │   └── reset.less                      // 全局样式
│   │   └── ts                                  // ts
│   │       └── global.ts                       // 全局变量
│   ├── index.less                              // 入口index.less
│   ├── main.ts                                 // 入口文件
│   ├── router.ts                               // 路由
│   ├── shime-global.d.ts                       // 全局变量 ts 声明
│   ├── shims-vue.d.ts                          // vue 全局变量 ts 声明
│   └── views                                   // 页面资源
│       ├── Layout.vue                          // 布局
│       ├── about                               // about页面
│       │   └── index.vue
│       ├── footer                              // 页脚
│       │   └── index.vue
│       ├── header                              // 头部
│       │   ├── Announcement.vue                // 头部声明
│       │   ├── Header.vue                      // 头部文件入口
│       │   ├── Navbar.vue                      // 顶部导航菜单
│       │   └── menu.ts                         // 顶部导航菜单配置
│       ├── home                                // 主页
│       │   ├── api.ts
│       │   ├── index.vue
│       │   └── table.ts                        // 表格配置文件
│       └── notFound                            // 404 页面
│           └── index.vue
├── tsconfig.json                               // ts配置
├── tslint.json                                 // tslint配置
└── yarn.lock
```



## vue TS 改造

备注： 原js代码分支 `vue+js`

1. 安装typescript相关npm包
2. 修改webpack和ts配置文件
3. js文件和vue文件改造


参考文档： 
- [TS官网对vue工程的改造](https://github.com/Microsoft/TypeScript-Vue-Starter#typescript-vue-starter)
- [Vue官网TS接入](https://cn.vuejs.org/v2/guide/typescript.html)
- [vue-property-decorator](https://github.com/kaorun343/vue-property-decorator)


### 安装typescript相关npm包
基础依赖两个包， 就可以将vue工程改造成 TS支持
- `typescript`
- `ts-loader` 

但是为了更好的体验，通常我们还会安装以下几个包，让你的开发体验更加友好
- `tslint` tslint校验库
- `tslint-loader` tslint的loader
- `tslint-config-standard`  用于tslint默认校验规则
- `vue-property-decorator`  用于在.vue文件中使用ts语法

### 修改webpack和ts配置文件

```js
module.exports = {
    entry: './src/main.ts',
    output: {
        filename: 'main.[hash:8].js',
        path: resolve('dist'),
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                include: resolve('src'),
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                    }, 
                    {
                        loader: 'ts-loader',
                    }
                ]
            },
            {
                test: /\.vue$/,
                use: [
                    {
                        loader: 'vue-loader',
                    },
                ]
            },
        ]
    },
    resolve: {
        extensions: ['.ts', '.js', '.vue', '.json', '.less'],
        alias: {
            '@': resolve('src'),
            'vue': 'vue/dist/vue.esm',
        },
    }
};

```

1. 首先是将入口文件`main.js` 改为 `main.ts`;
2. 添加对 `ts`以及 `tsx`文件的处理，使用 `ts-loader`;
<!-- 3. 添加对 `vue` 文件的处理， -->
对 resolve 文件的扩展名添加 `.ts`文件的查找，优先级设为最高


### js文件和vue文件改造

项目中所有js文件全部都要改为ts，这里针对 `router.js`和`main.js` 进行改造，需要注意一点，ts无法识别 `.vue`文件，需要在`src`目录下创建一个 `shims-vue.d.ts`文件，将vue文件当作一个对象暴露出去, 同时在`.ts`文件中， `import`一个 vue 文件时，需要写`.vue`文件全称，ts读取文件的时候不会报找不到  `component`。

#### JS文件
以 `main.ts`为例：里面引用的`router.ts`文件请看完整代码。
```ts
import VueRouter from 'vue-router';
import Vue from 'vue';
import axios from 'axios';

import routes from './router';
import {baseApi} from './common/ts/global';
import App from './App.vue';
import 'element-ui/lib/theme-chalk/index.css';
import './index.less';

axios.defaults.baseURL = baseApi;
Vue.use(VueRouter);

new Vue({
    router: new VueRouter({
        routes,
    }),
    render: (h) => h(App),
}).$mount('#app');
```

#### vue文件
`vue2.x` 不支持TS写法，所以使用 `vue-property-decorator` 插件对vue文件进行改造。`vue-property-decorator`支持哪些写法详见[`vue-property-decorator`](https://github.com/kaorun343/vue-property-decorator)

```ts
<script lang='ts'>
import Header from './views/header/index.vue';
import { Vue, Component } from 'vue-property-decorator';

@Component({
  components: {
    Header,
  }
})
export default class App extends Vue {
    @Prop() name!:string;
    private age:number = 16;
    private testMothods():void {
        let a:number = 0;
        console.log(a, '0-000--000');
    }
}
</script>
```

#### ts改造过程遇到的问题

Q: `vue-property-decorator` 和 `vue-class-component` 有什么区别？

A: `vue-class-component` 是vue 官方出的,`vue-property-decorator` 是社区出的,
其中`vue-class-component`提供了 `vue component` 等等,`vue-property-decorator` 深度依赖了 `vue-class-component` 拓展出了很多操作符 `@Prop` `@Emit` `@Inject` 等等。可以说是 `vue-class-component` 的一个超集,正常开发的时候,你只需要使用 `vue-property-decorator` 中提供的操作符即可 不用再从`vue-class-component` 引入`vue component`,

Q: 按需引用 `element-ui`组件时，会报 ts 语法语法错误。
A: 因为没有声明全局的`element-ui`对象，需要在 `src`目录下添加 `shime-global.d.ts`文件
```ts
declare module "element-ui";
```
同理，因为使用ts语法，当用到 `window`,`document`等全局对象时，可能会报ts语法错误，在 `shime-global.d.ts` 文件中声明即可。

### tslint
- 安装`tslint`: `npm i tslint -D` 
- 使用命令 `tslint --init` 初始化 `tslint.json`
- 配置 `tslint`

个人配置如下， 其余都是默认配置
```json
{
    "defaultSeverity": "error",
    "extends": [
        "tslint:recommended"
    ],
    "rules": {
        "indent": [true, "spaces", 2],      
        "semicolon": [true, "always"],
        "quotemark": [true, "single"],
        "ordered-imports": false,
        "object-literal-sort-keys": false,
        "interface-name": false
    },
    "rulesDirectory": []
}
```


