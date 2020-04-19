<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="分类名称">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="分类别名">
        <el-input v-model="form.alias" />
      </el-form-item>
      <el-form-item label="分类描述">
        <el-input v-model="form.description" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">保存</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getLabel, addLabel, editLabel } from '@/api/labels'

export default {
  name: 'LabelDetail',
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
        alias: '',
        description: ''
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
      getLabel(id).then(res => {
        this.form = res.data
        this.copyForm = JSON.parse(JSON.stringify(this.form))
      }).catch(err => {
        console.log(err)
      })
    },
    onSubmit() {
      this.isEdit ? this.editLabel() : this.addLabel()
    },
    addLabel() {
      const params = this.form
      addLabel(params).then(res => {
        this.$message('submit!')
      }).catch(err => {
        console.log(err)
      })
    },
    editLabel() {
      console.log(params)
      const params = this.form
      editLabel(params).then(res => {
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

