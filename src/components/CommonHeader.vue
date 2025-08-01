<template>
    <div class="header">
        <div class="l-content">
            <el-button size="small" @click="handleCollapse">
                <component is="menu" class="icons"></component>
            </el-button>
            <el-breadcrumb separator="/" class="bread">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item v-if="current" :to="current.path">{{ current.label }}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="r-content">
            <el-dropdown>
                <span class="el-dropdown-link">
                    <img :src="getImageUrl('user')" alt="user" class="user">
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item>个人中心</el-dropdown-item>
                        <el-dropdown-item @click="handleLoginOut">退出</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </div>
</template>

<script setup>
import { reactive, computed } from 'vue';
import { useAllDataStore } from '@/stores';
import { getImageUrl } from '@/utils'
import { useRouter, useRoute } from 'vue-router';
const store = useAllDataStore();
const router = useRouter();
const route = useRoute();

const handleCollapse = () => {
    store.isCollapse = !store.isCollapse;
}
const handleLoginOut = () => {
    store.clean(router);
    router.push('login');
}
const current = computed(() => {
    if (route.name === 'home') {
        return false;
    }
    return store.tags.find(r => r.name === route.name);
});
</script>

<style scoped lang="less">
.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 100%;
    background-color: #333;

    .l-content {
        display: flex;
        align-items: center;

        .el-button {
            margin-inline: 20px;
        }
    }

    .r-content {
        .user {
            width: 40px;
            aspect-ratio: 1;
            object-fit: cover;
            border-radius: 50%;
            margin-right: 20px;
        }
    }
}

.icons {
    width: 20px;
}

:deep(.bread span) {
    color: #fff !important;
    cursor: pointer !important;
}
</style>