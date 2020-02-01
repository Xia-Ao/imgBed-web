<template>
    <div class="about">
        <p class="item">当前页面没有找到</p>
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