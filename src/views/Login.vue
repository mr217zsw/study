<script setup>
import { ref, reactive, getCurrentInstance } from 'vue'
import { useAllDataStore } from '@/stores'
import { useRouter } from 'vue-router'
import { View, Hide } from '@element-plus/icons-vue'

const loginForm = reactive({
    username: '',
    password: ''
})
const formRef = ref()
const showPassword = ref(false)

const togglePassword = () => {
    showPassword.value = !showPassword.value
}
const router = useRouter();
const { proxy } = getCurrentInstance();
const store = useAllDataStore();
const handleLogin = async () => {
    let res = await proxy.$api.getMenu(loginForm);
    store.updateMenuList(res.menuList);
    store.setToken(res.token);
    store.addMenu(router);
    router.push(store.currentMenu);
};

</script>



<template>
    <div class="body-login">
        <transition name="fade-slide">
            <el-form ref="formRef" class="login-container" :model="loginForm" status-icon label-width="80px">
                <h1 class="login-title">欢迎登录</h1>

                <el-form-item label="用户名" prop="username" required>
                    <el-input type="text" placeholder="请输入账号" v-model="loginForm.username" />
                </el-form-item>

                <el-form-item label="密码" prop="password" required>
                    <el-input :type="showPassword ? 'text' : 'password'" placeholder="请输入密码"
                        v-model="loginForm.password">
                        <template #suffix>
                            <el-icon @click="togglePassword" class="password-icon">
                                <component :is="showPassword ? View : Hide" />
                            </el-icon>
                        </template>
                    </el-input>
                </el-form-item>

                <el-form-item>
                    <el-button class="login-btn" type="primary" @click="handleLogin">
                        登录
                    </el-button>
                </el-form-item>
            </el-form>
        </transition>
    </div>
</template>



<style scoped lang="less">
@keyframes fadeInUp {
    0% {
        opacity: 0;
        transform: translateY(30px);
    }

    100% {
        opacity: 1;
        transform: translateY(0);
    }
}

.body-login {
    height: 100vh;
    width: 100%;
    background: linear-gradient(135deg, #74ebd5 0%, #acb6e5 100%);
    display: flex;
    justify-content: center;
    align-items: center;
    animation: fadeInUp 0.8s ease;

    .login-container {
        background-color: rgba(255, 255, 255, 0.95);
        padding: 40px 50px;
        border-radius: 16px;
        box-shadow: 0 12px 30px rgba(0, 0, 0, 0.15);
        animation: fadeInUp 1s ease;
        transition: all 0.3s;

        &:hover {
            transform: translateY(-3px);
            box-shadow: 0 16px 40px rgba(0, 0, 0, 0.2);
        }

        .login-title {
            text-align: center;
            font-size: 26px;
            font-weight: bold;
            color: #333;
            margin-bottom: 30px;
        }

        .el-form-item {
            margin-bottom: 24px;
        }

        .password-icon {
            cursor: pointer;
            color: #999;
            transition: color 0.3s;

            &:hover {
                color: #409EFF;
            }
        }

        .login-btn {
            width: 100%;
            transition: all 0.3s;
            font-weight: bold;

            &:hover {
                background-color: #66b1ff;
            }
        }
    }
}

.fade-slide-enter-active {
    animation: fadeInUp 0.8s ease;
}
</style>
