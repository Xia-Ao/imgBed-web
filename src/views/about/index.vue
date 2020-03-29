<template>
    <div class="about">
        <p class="item">联系：</p>
        <p class="item">Github: <a href="https://github.com/Xia-Ao/imgBed-web" class="">Github</a></p>
        <p class="item">Email：<a href="xiaao9527@gamil.com" class=""></a>xiaao9527@gamil.com</p>
    </div>
</template>

<script lang="ts">
import {Vue, Component} from 'vue-property-decorator';
@Component
export default class About extends Vue {

}
</script>
<style lang="less" scoped>
.about {
    box-sizing: border-box;
    color: #999;
    .item {
        margin: 10px auto;
    }
}
</style>