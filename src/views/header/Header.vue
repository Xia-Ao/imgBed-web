<template>
  <div class="">
     <Navbar/>
  </div>
</template>

<script lang='ts'>
import Navbar from './Navbar.vue';
import {Vue, Component, Prop} from 'vue-property-decorator';

@Component({
  components: {
    Navbar,
  }
})
export default class Header extends Vue{
  // @Prop() age!:number;
  
}
</script>

<style>

</style>