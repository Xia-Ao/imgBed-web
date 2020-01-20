<template>
  <div class="">
    <h2>HEADER2</h2>
    从App传入过来的参数：{{age}}
  </div>
</template>

<script lang='ts'>
import {Vue, Component, Prop} from 'vue-property-decorator';

@Component
export default class Header extends Vue{
  @Prop() age!:number;
  
}
</script>

<style>

</style>