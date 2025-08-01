<script setup>
import { getImageUrl } from '@/utils'
</script>

<template>
    <div class="error">
        <img :src="getImageUrl('404')" alt="404"></img>
    </div>
</template>

<style scoped lang="less">
.error {
    text-align: center;

    img {
        object-fit: cover;
    }
}
</style>
