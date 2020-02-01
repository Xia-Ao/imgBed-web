<template>
    <div class="container">
        <div class="announcement">公告</div>
    </div>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
export default class Announcement extends Vue {}
</script>
<style lang="less" scoped>
.container {
    width: 100%;
    .announcement {
        max-width: 1200px;
        margin: auto;
        height: 50px;
        text-align: center;
    }
}
</style>