/*
 * @Author: ao.xia 
 * @Date: 2020-01-24 17:36:18 
 * @Last Modified by: ao.xia
 * @Last Modified time: 2020-01-25 21:37:16
 */
<template>
    <div class="layout">
        <Announcement v-if="announcement" />
        <Header class="header" />
        <div class="content">
            <div class="center">
                <router-view />
            </div>
        </div>
        <Footer class="footer" />
    </div>
</template>

<script lang='ts'>
import Header from "./header/Header.vue";
import Announcement from "./header/Announcement.vue";
import Footer from "./footer/index.vue";
import { Vue, Component } from "vue-property-decorator";

@Component({
    components: {
        Announcement,
        Header,
        Footer
    }
})
export default class App extends Vue {
    private announcement: boolean = false;
}
</script>

<style lang='less' scoped>
.layout {
    background: #fff;
    display: flex;
    flex-direction: column;
    height: 100vh;
    .navbar {
        width: 100%;
    }
    .footer {
        width: 100%;
    }
    .content {
        width: 1200px;
        margin: 40px auto auto;
        background: #fff;
    }
}
</style>