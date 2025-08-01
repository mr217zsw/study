<template>
    <el-aside :width>
        <el-menu :collapse="isCollapse" :default-active="activeMenu" :collapse-transition="false"
            active-text-color="#ffd04b" background-color="#545c64" text-color="#fff">
            <h3 v-text="isCollapse ? '后台' : '后台管理系统'"></h3>
            <!-- 遍历菜单列表 -->
            <el-menu-item @click="handleMenu(item)" v-for="item in noChildren" :key="item.name" :index="item.path">
                <component class="icon-item" :is="item.icon"></component>
                <span>{{ item.label }}</span>
            </el-menu-item>
            <el-sub-menu v-for="item in hasChildren" :key="item.name" :index="item.path">
                <template #title>
                    <component class="icon-item" :is="item.icon"></component>
                    <span>{{ item.label }}</span>
                </template>
                <el-menu-item-group v-for="child in item.children" :key="child.name">
                    <el-menu-item :index="child.path" @click="handleMenu(child)">
                        <component class="icon-item" :is="child.icon"></component>
                        <span>{{ child.label }}</span>
                    </el-menu-item>
                </el-menu-item-group>
            </el-sub-menu>
        </el-menu>
    </el-aside>
</template>

<script setup>
import { reactive, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAllDataStore } from '@/stores';
const store = useAllDataStore();
const list = computed(() => store.menuList);
const noChildren = computed(() => {
    return store.menuList.filter(item => !item.children || item.children.length === 0);
});
const hasChildren = computed(() => {
    return store.menuList.filter(item => item.children && item.children.length > 0);
});
const isCollapse = computed(() => store.isCollapse)
const width = computed(() => store.isCollapse ? '64px' : '180px')
const router = useRouter();
const route = useRoute();
const activeMenu = computed(() => route.path)
const handleMenu = item => {
    router.push(item.path)
    store.selectMenu(item)
    store.currentMenu = item.name;
}
</script>

<style scoped lang="less">
.el-aside {
    height: 100vh;
    background-color: #545c64;

    .el-menu {
        border-right: none;
        height: 100%;

        .icon-item {
            margin-right: 5px;
            width: 18px;
        }

        h3 {
            line-height: 48px;
            color: #fff;
            text-align: center;
        }
    }
}
</style>