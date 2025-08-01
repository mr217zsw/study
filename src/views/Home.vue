<script setup>
import { getImageUrl } from '@/utils'
import { ref, onMounted, getCurrentInstance } from 'vue'
import * as echarts from 'echarts';
const { proxy } = getCurrentInstance();
let tableData = ref([])
let countData = ref([])
let observer = ref(null);
const tableLabel = ref({
    name: '课程',
    todayBuy: "今日购买",
    monthBuy: "本月购买",
    totalBuy: "总购买"
})

const getTableData = async () => {
    const data = await proxy.$api.getTableData();
    tableData.value = data.tableData;
}
const getCountData = async () => {
    const data = await proxy.$api.getCountData();
    countData.value = data;
}
const getChartData = async () => {
    const { orderData, userData, videoData } = await proxy.$api.getChartData();
    // 折线图配置
    const oneEchart = echarts.init(proxy.$refs['echart'])
    oneEchart.setOption({
        tooltip: {
            trigger: 'axis',
            axisPointer: { type: 'cross' }
        },
        legend: {
            top: 0
        },
        xAxis: {
            type: 'category',
            data: orderData.date,
        },
        yAxis: {
            type: 'value'
        },
        series: Object.keys(orderData.data[0]).map(val => {
            return {
                name: val,
                type: 'line',
                data: orderData.data.map(item => item[val])
            }
        })
    });
    // 柱状图配置
    const twoEchart = echarts.init(proxy.$refs['userEchart'])
    twoEchart.setOption({
        tooltip: {
            trigger: 'axis',
            axisPointer: { type: 'cross' }
        },
        legend: {
            top: 0
        },
        xAxis: {
            type: 'category',
            data: userData.map(item => item.date),
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                name: '新增用户',
                data: userData.map(item => item.new),
                type: 'bar'
            },
            {
                name: '活跃用户',
                data: userData.map(item => item.active),
                type: 'bar'
            }
        ]
    });
    // 饼状图配置
    const threeEchart = echarts.init(proxy.$refs['videoEchart'])
    threeEchart.setOption({
        legend: {
            top: 0
        },
        series: [
            {
                type: 'pie',
                data: videoData
            }
        ]
    });
    //根据页面的变化监听图表的尺寸改变
    observer.value = new ResizeObserver(en => {
        oneEchart.resize()
        twoEchart.resize()
        threeEchart.resize()
    })
    observer.value.observe(proxy.$refs['echart'])
}
onMounted(() => {
    getTableData()
    getCountData()
    getChartData()
})
</script>

<template>
    <el-row class="home" :gutter="20">
        <el-col :span="8">
            <el-card shadow="hover">
                <div class="user">
                    <img :src="getImageUrl('user')" alt="user" class="user">
                    <div class="user-info">
                        <p class="en">admin</p>
                        <p class="ch">超级管理员</p>
                    </div>
                </div>
                <div class="login-info">
                    <p>上次登录时间:<span>2025-06-30</span></p>
                    <p>上次登录地点:<span>长沙</span></p>
                </div>
            </el-card>

            <el-card shadow="hover" class="user-table">
                <el-table :data="tableData">
                    <el-table-column v-for="(val, key) in tableLabel" :key="key" :prop="key" :label="val" />
                </el-table>
            </el-card>
        </el-col>
        <el-col :span="16">
            <el-row :gutter="10" class="count">
                <el-col :span="8" v-for="item in countData" :key="item.name">
                    <el-card :body-style="{
                        display: 'flex',
                        'align-items': 'center',
                        padding: 0,
                    }">
                        <component :is="item.icon" class="icons" :style="{ background: item.color }"></component>
                        <div class="detail">
                            <p class="num">￥{{ item.value }}</p>
                            <p class="txt">￥{{ item.name }}</p>
                        </div>
                    </el-card>
                </el-col>
            </el-row>
            <el-row :gutter="10">
                <el-col :span="24">
                    <el-card class="top-echart">
                        <div ref="echart" style="height:300px"></div>
                    </el-card>
                </el-col>
                <el-col :span="12">
                    <el-card>
                        <div ref="userEchart" style="height:300px"></div>
                    </el-card>
                </el-col>
                <el-col :span="12">
                    <el-card>
                        <div ref="videoEchart" style="height:300px"></div>
                    </el-card>
                </el-col>
            </el-row>
        </el-col>
    </el-row>
</template>

<style scoped lang="less">
.home {
    height: 100%;
    overflow: hidden;

    .el-card {
        padding: 10px;
        margin-bottom: 20px;

        .user {
            display: flex;
            align-items: center;
            border-bottom: 1px solid #ccc;
            margin-bottom: 20px;

            img {
                max-width: 150px;
                width: 100%;
                aspect-ratio: 1;
                object-fit: cover;
                border-radius: 50%;
                margin-right: 20px;
            }

            p {
                margin: 10px 0;

                &.ch {
                    color: #999;
                }

                &.en {
                    font-size: 35px;
                    text-transform: capitalize;
                }
            }
        }

        .login-info {
            p {
                line-height: 30px;
                font-size: 14px;
                color: #999;

                span {
                    color: #666;
                    margin-left: 30px;
                }
            }
        }
    }

    .count {
        .el-card {
            margin-bottom: 10px;
            padding: 0;

            .icons {
                max-width: 60px;
                width: 100%;
            }

            .detail {
                margin-left: 20px;

                .num {
                    font-size: 30px;
                    margin-bottom: 10px;
                }

                .txt {
                    color: #999;
                    font-size: 12px;
                }
            }
        }
    }
}
</style>
