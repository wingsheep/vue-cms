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
import { getSort, addSort, editSort } from '@/api/sorts'

export default {
  name: 'SortDetail',
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
      getSort(id).then(res => {
        this.form = res.data
        this.copyForm = JSON.parse(JSON.stringify(this.form))
      }).catch(err => {
        console.log(err)
      })
    },
    onSubmit() {
      this.isEdit ? this.editSort() : this.addSort()
    },
    addSort() {
      const params = this.form
      addSort(params).then(res => {
        this.$message('submit!')
      }).catch(err => {
        console.log(err)
      })
    },
    editSort() {
      console.log(params)
      const params = this.form
      editSort(params).then(res => {
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

