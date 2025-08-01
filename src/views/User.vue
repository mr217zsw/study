<script setup>
import { ref, reactive, getCurrentInstance, onMounted, nextTick } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
const tableLabel = reactive([
    {
        prop: 'name',
        label: '姓名'
    },
    {
        prop: 'age',
        label: '年龄'
    },
    {
        prop: 'sex',
        label: '性别'
    },
    {
        prop: 'birth',
        label: '出生日期'
    },
    {
        prop: 'addr',
        label: '地址'
    },
])
const tableData = ref([])
const { proxy } = getCurrentInstance();
// 返回用户列表
const getUserData = async () => {
    let data = await proxy.$api.getUserData(config);
    // console.log(data);
    tableData.value = data.list;
    config.total = data.count;
}
const formInline = reactive({
    keyWord: ''
})
const config = reactive({
    keyword: '',
    total: 0,
    page: 1
})
// 搜索指定名字的用户
const handleSearch = () => {
    config.keyword = formInline.keyWord;
    getUserData();
}
// 分页处理
const handleChange = (page) => {
    config.page = page;
    getUserData();
}

// 删除指定用户
const handleDelete = (val) => {
    ElMessageBox.confirm('你确定要删除吗?', 'Confirm',
        {
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancel',
            type: 'Confirm',
        }).then(async () => {
            await proxy.$api.deleteUser({ id: val.id })
            getUserData();
        }).catch(() => {
            ElMessage({
                showClose: true,
                type: 'info',
                message: '删除取消',
            })
        })
}

const action = ref('add');
const dialogVisible = ref(false);
const formUser = reactive({});

const rules = reactive({
    name: [
        { required: true, message: '姓名不能为空', trigger: 'blur' },
        { min: 2, max: 10, message: '姓名长度应为 2 到 10 个字符', trigger: 'blur' },
    ],
    age: [
        { required: true, message: '年龄不能为空', trigger: 'blur' },
        {
            type: 'number',
            message: '年龄必须是数字',
            trigger: 'blur'
        },
        {
            validator: (rule, value, callback) => {
                if (value < 0 || value > 150) {
                    callback(new Error('年龄范围应为 0 到 150'));
                } else {
                    callback();
                }
            },
            trigger: 'blur',
        }
    ],
    sex: [
        { required: true, message: '性别不能为空', trigger: 'change' },
    ],
    birth: [
        { required: true, message: '出生日期不能为空', trigger: 'change' },
        {
            type: 'date',
            message: '出生日期格式不正确',
            trigger: 'change',
        },
    ],
    addr: [
        { required: true, message: '地址不能为空', trigger: 'blur' },
        {
            min: 2,
            max: 100,
            message: '地址长度应在 2 到 100 个字符之间',
            trigger: 'blur',
        },
    ],
});


const handleClose = () => {
    dialogVisible.value = false;
    proxy.$refs['userForm'].resetFields();
}
const handleCancel = () => {
    dialogVisible.value = false;
    proxy.$refs['userForm'].resetFields();
}
const handleAdd = () => {
    dialogVisible.value = true;;
    action.value = 'add';
}
const handleUpdate = value => {
    action.value = 'update';
    dialogVisible.value = true;
    nextTick(() => {
        Object.assign(formUser, value);
    })
}
// 日期格式化
function formatDate(date) {
    const d = new Date(date);
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
}
// 新增和修改用户
const onSubmit = () => {
    proxy.$refs['userForm'].validate(async vaild => {
        if (vaild) {
            try {
                formatDate(formUser.birth);
                if (action.value === 'add') {
                    await proxy.$api.addUser(formUser);
                } else {
                    await proxy.$api.updateUser(formUser);
                }
                dialogVisible.value = false;
                proxy.$refs['userForm'].resetFields();
                getUserData();
            } catch (error) {
                ElMessage({
                    showClose: true,
                    message: '请输入正确的内容',
                    type: 'error'
                })
            }
        }
    })
}
onMounted(() => {
    getUserData();
})
</script>

<template>
    <div class="user-header">
        <el-button type="primary" @click="handleAdd">
            新增
        </el-button>
        <el-form :inline="true" :model="formInline">
            <el-form-item label="请输入">
                <el-input placeholder="请输入用户名" v-model="formInline.keyWord" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="handleSearch">
                    搜索
                </el-button>
            </el-form-item>
        </el-form>
    </div>
    <div class="table-block">
        <el-table :data="tableData" style="width: 100%">
            <el-table-column v-for="item in tableLabel" :key="item.prop" :prop="item.prop" :label="item.label" />
            <el-table-column fixed="right" label="操作" min-width="120">
                <template #default="scope">
                    <el-button type="primary" size="small" @click="handleUpdate(scope.row)">编辑</el-button>
                    <el-button type="danger" size="small" @click="handleDelete(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination class="pager" background layout="prev, pager, next" :total="config.total"
            @current-change="handleChange" />
    </div>
    <el-dialog v-model="dialogVisible" :title="action === 'add' ? '新增用户' : '编辑用户'" width="35%"
        :before-close="handleClose">
        <el-form :inline="true" :model="formUser" :rules="rules" ref="userForm">
            <el-row>
                <el-col :span="12">
                    <el-form-item label="姓名" prop="name">
                        <el-input v-model="formUser.name" placeholder="请输入姓名" />
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="年龄" prop="age">
                        <el-input v-model.number="formUser.age" placeholder="请输入年龄" />
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item class="select-clearn" label="性别" prop="sex">
                        <el-select v-model="formUser.sex" placeholder="请选择" clearable>
                            <el-option label="男" value="男" />
                            <el-option label="女" value="女" />
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="出生日期" prop="birth">
                        <el-date-picker v-model="formUser.birth" type="date" placeholder="请输入" style="width: 100%;" />
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-form-item label="地址" prop="addr">
                    <el-input v-model="formUser.addr" placeholder="请输入地址" />
                </el-form-item>
            </el-row>
            <el-row>
                <el-form-item style="margin-inline: center;">
                    <el-button type="primary" @click="handleCancel">取消</el-button>
                    <el-button type="primary" @click="onSubmit">确定</el-button>
                </el-form-item>
            </el-row>
        </el-form>
    </el-dialog>
</template>

<style scoped lang="less">
.user-header {
    display: flex;
    justify-content: space-between;
}

.table-block {
    .pager {
        margin-top: 30px;
        display: flex;
        justify-content: end;
    }
}

.select-clearn {
    display: flex;
}
</style>
