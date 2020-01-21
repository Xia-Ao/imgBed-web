<template>
    <div class="home">
        <h1>sdfsdkjh</h1>上岛咖啡哈电视
        <!-- <Header 
            :age=age
        /> -->
        <img
            src="http://img.xiaao.xin/image/M00/00/00/L2Kexl4MmImAbs2CAAAJp9zm3p4727.png"
            alt
            class
        />
        <button @click.stop="testMothods">按钮</button>
        <br>
        <router-link to="/">Go to home</router-link>
        <router-link to="/header">Go to header</router-link>

        <router-view/>
    </div>
</template>

<script lang='ts'>
import Header from './header/index.vue';
import { Vue, Component } from 'vue-property-decorator';

@Component({
  components: {
    Header,
  }
})
export default class App extends Vue {
    private data() {
        return {
            age: 26,
        }
    }
    private testMothods() {
        let a:number = 0;
        let arr = [1,2,4];
        console.log(arr.includes(2));
        console.log(a, '0-000--000');
    }
}
</script>

<style>
</style>