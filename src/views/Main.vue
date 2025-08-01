<script setup>
import CommonAside from '@/components/CommonAside.vue';
import CommonHeader from '@/components/CommonHeader.vue';
import CommonTab from '@/components/CommonTab.vue';
</script>

<template>
    <div class="common-layout">
        <el-container class="lay-container">
            <!-- 左侧组件 -->
            <common-aside />
            <!-- 右侧组件 -->
            <el-container>
                <el-header class="el-header">
                    <common-header />
                </el-header>
                <common-tab />
                <el-main class="right-main">
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<style scoped lang="less">
.common-layout,
.lay-container {
    height: 100%;
    width: 100%;
    overflow: hidden;
}

.el-header {
    padding: 0;
    background-color: #f5f5f5;
    border-bottom: 1px solid #e8e8e8;
}
</style>
