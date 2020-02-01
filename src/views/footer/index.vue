<template>
    <div class="footer-container">
        <div class="footer-content">
            <p class="item">请勿上传违反中国大陆和香港法律的图片，违者后果自负。</p>
            <p class="item">Copyright 2022Ⓒ ao.xia. All rights reserved.</p>
        </div>
    </div>
</template>
<script lang='ts'>
import {Vue, Component} from 'vue-property-decorator';

@Component
export default class Footer extends Vue {
    
}
</script>

<style lang="less" scoped>
.footer-container {
    width: 100%;
    background: #eee;
    .footer-content {
        max-width: 1200px;
        margin: auto;
        box-sizing: border-box;
        padding: 5px 0;
        font-size: 12px;
        color: #333;
        text-align: center;
        .item {
            margin: 5px;
        }
    }
}
</style>>