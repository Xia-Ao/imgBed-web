<template>
    <div class="home">
        <h1>sdfsdkjh</h1>上岛咖啡哈电视
        <Header 
            :age=age
        />
        <img
            src="http://img.xiaao.xin/image/M00/00/00/L2Kexl4MmImAbs2CAAAJp9zm3p4727.png"
            alt
            class
        />
        <button @click.stop="testMothods">按钮</button>
    </div>
</template>

<script lang='ts'>
import Header from './views/header/index.vue';
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
        console.log(a, '0-000--000');
    }
}
</script>

<style>
</style>