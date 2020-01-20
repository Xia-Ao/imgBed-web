# 图床web端


## 代办事宜

语言环境使用ts

eslint -> tslint

## vue TS 改造

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

#### vue文件
`vue2.x` 不支持TS写法，所以使用 `vue-property-decorator` 插件对vue文件进行改造。

```vue
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
    private data() {
        return {
            age: 26,
        }
    }
    private testMothods() {
        let a:number = 0;
        console.log(a, '0-000--000');
    }
}
</script>
```


Q: vue-property-decorator 和 vue-class-component 有什么区别？

A: 
vue class component 是vue 官方出的,
vue property decorator 是社区出的,
其中vue class component 提供了 vue component 等等,
vue property decorator 深度依赖了 vue class component 拓展出了很多操作符 @Prop @Emit @Inject 等等 可以说是 vue class component 的一个超集,
正常开发的时候 你只需要使用 vue property decorator 中提供的操作符即可 不用再从vue class componen 引入vue component,


### tslint



