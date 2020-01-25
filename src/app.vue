<template>
    <Layout/>
</template>

<script lang='ts'>
import Layout from './views/Layout.vue';
import { Vue, Component } from 'vue-property-decorator';

@Component({
  components: {
    Layout,
  }
})
export default class App extends Vue {
}
</script>

<style>
</style>