<template>
    <div class="tags">
        <el-tag v-for="tag in tags" :key="tag.name" :closable="tag.name != 'home'"
            :effect="route.name === tag.name ? 'dark' : 'plain'" @click="handleMenu(tag)"
            @close="handleClose(tag, index)">
            {{ tag.label }}
        </el-tag>
    </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAllDataStore } from '@/stores';
const store = useAllDataStore();

const tags = computed(() => store.tags);
const route = useRoute();
const router = useRouter();

const handleMenu = tag => {
    router.push(tag.path);
    store.currentMenu = tag.name;
}

const handleClose = tag => {
    store.updateTags(tag);
    router.push(store.currentMenu);
}
</script>

<style scoped lang="less">
.tags {
    margin: 20px 0 0 20px;
}

.el-tag {
    margin-left: 10px;
    cursor: pointer;
}
</style>