<template>
    <div class="about">
        <p class="item">嗷嗷图床</p>
        <p class="item">Github: https://github.com/Xia-Ao</p>
        <p class="item">联系：xiaao9527@gamil.com</p>
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