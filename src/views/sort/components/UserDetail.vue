<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="用户名">
        <el-input v-model="form.username" />
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="form.password" />
      </el-form-item>
      <el-form-item label="昵称">
        <el-input v-model="form.nickname" />
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="form.email" />
      </el-form-item>
      <el-form-item label="电话号码">
        <el-input v-model="form.telephone" />
      </el-form-item>
      <el-form-item label="生日">
        <el-date-picker v-model="form.birthday" type="date" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">保存</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getUser, addUser, editUser } from '@/api/users'

export default {
  name: 'UserDetail',
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      form: {
        username: '',
        nickname: '',
        email: '',
        password: '',
        age: undefined,
        delivery: false,
        telephone: '',
        birthday: ''
      },
      copyForm: {}
    }
  },
  created() {
    if (this.isEdit) {
      const id = this.$route.params && this.$route.params.id
      this.fetchData(id)
    }
  },
  methods: {
    fetchData(id) {
      getUser(id).then(res => {
        this.form = res.data
        this.copyForm = JSON.parse(JSON.stringify(this.form))
      }).catch(err => {
        console.log(err)
      })
    },
    onSubmit() {
      this.isEdit ? this.editUser() : this.addUser()
    },
    addUser() {
      const params = this.form
      addUser(params).then(res => {
        this.$message('submit!')
      }).catch(err => {
        console.log(err)
      })
    },
    editUser() {
      console.log(params)
      const params = this.form
      editUser(params).then(res => {
        this.$message('submit!')
      }).catch(err => {
        console.log(err)
      })
    },
    onCancel() {
      this.form = JSON.parse(JSON.stringify(this.copyForm))
      this.$message({
        message: 'cancel!',
        type: 'warning'
      })
    }
  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
</style>

