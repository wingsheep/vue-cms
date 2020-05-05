<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="友链名称">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="友链地址">
        <el-input v-model="form.url" />
      </el-form-item>
      <el-form-item label="友链图片地址">
        <el-input v-model="form.img_url" />
      </el-form-item>
      <el-form-item label="友链描述">
        <el-input v-model="form.desc" />
      </el-form-item>
      <el-form-item label="友链状态">
        <el-switch v-model="form.state" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">保存</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getFriendlink, addFriendlink, editFriendlink } from '@/api/friendlink'

export default {
  name: 'FriendlinkDetail',
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      form: {
        name: '',
        url: '',
        img_url: '',
        desc: '',
        state: false
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
      getFriendlink(id).then(res => {
        this.form = res.data
        this.copyForm = JSON.parse(JSON.stringify(this.form))
      }).catch(err => {
        console.log(err)
      })
    },
    onSubmit() {
      this.isEdit ? this.editFriendlink() : this.addFriendlink()
    },
    addFriendlink() {
      const params = this.form
      addFriendlink(params).then(res => {
        this.$message('submit!')
      }).catch(err => {
        console.log(err)
      })
    },
    editFriendlink() {
      console.log(params)
      const params = this.form
      editFriendlink(params).then(res => {
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

