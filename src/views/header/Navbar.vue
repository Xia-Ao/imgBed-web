<template>
    <div class="container">
        <div class="navbar">
            <div class="logo" @click.stop="goHome">
                <img v-if="logoImg" :src="logoImg" alt class="logo-img"/>
                <span class="title">嗷嗷图床</span>
            </div>
            <div class="menu">
                <el-menu
                    mode="horizontal"
                    router
                    :default-active="$route.path"
                    background-color="#545c64"
                    text-color="#fff"
                    active-text-color="#ffd04b"
                    class="menu-container"
                >
                    <el-menu-item
                        v-for="(router, index) in menus"
                        :key="index"
                        :index="router.path"
                        :route="router"
                    >
                        <i v-if="router.icon" :class="router.icon"></i>
                        <span>{{router.label}}</span>
                    </el-menu-item>
                </el-menu>
            </div>
        </div>
    </div>
</template>

<script lang='ts'>
import { Vue, Component } from "vue-property-decorator";
import { Menu, MenuItem, Submenu, MenuItemGroup } from "element-ui";
import menu from "./menu";

Vue.use(Menu);
Vue.use(MenuItem);
Vue.use(Submenu);
Vue.use(MenuItemGroup);
@Component
export default class Navbar extends Vue {
    private menus!: [];
    private logoImg: string =
        "//h0.hucdn.com/open202004/8ef5d2e0798f644d_292x200.png";
    private data() {
        return {
            menus: menu
        };
    }
    private menuClick(path: string): void {}
    /**
     * 回到首页
     */
    private goHome(): void {
        this.$router.push('/')
    }
}
</script>

<style lang="less" scoped>
.container {
    width: 100%;
    background-color: #545c64;
    border-bottom: 1px solid #fff;
}
.navbar {
    width: 1200px;
    margin: auto;
    display: flex;
    align-items: center;
    .logo {
        box-sizing: border-box;
        display: flex;
        align-items: center;
        &:hover {
            cursor: pointer;
        }
        .logo-img {
            width: 40px;
            height: 28px;
        }
        .title {
            margin-left: 10px;
            font-size: 24px;
            color: #ccc;
            font-family: "Courier New", Courier, monospace;
        }
    }
    .menu {
        margin-left: auto;
        .menu-container {
            border-bottom: none;
        }
    }
}
</style>