<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column prop="name" label="标签名称" />
      <el-table-column prop="alias" label="标签别名" />
      <el-table-column prop="description" label="标签描述" />
      <el-table-column min-width="100px" prop="createdAt" label="创建时间">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.createdAt | formatDate }}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="100px" prop="updatedAt" label="修改时间">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.updatedAt | formatDate }}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="100px" prop="op" label="操作">
        <template slot-scope="scope">
          <router-link :to="'/Label/edit/'+scope.row.id">
            <el-button type="text">
              编辑
            </el-button>
          </router-link>
          <el-button type="text" @click="deleteLabel(scope.row.id)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getLabelList, getLabel, deleteLabel, addLabel, editLabel } from '@/api/labels'
export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list: null,
      listLoading: true,
      singleLabel: {}
    }
  },
  created() {
    this.getLabelList()
  },
  methods: {
    getLabel(id) {
      getLabel(id).then(res => {
        this.singleLabel = res.data[0]
      })
    },
    addLabel(params) {
      addLabel(params).then(res => {
        if (res.data) {
          this.$message.success('新增成功')
          this.getLabelList()
        }
      })
    },
    editLabel(params) {
      editLabel(params).then(res => {
        if (res.data) {
          this.$message.success('编辑成功')
          this.getLabelList()
        }
      })
    },
    getLabelList() {
      this.listLoading = true
      getLabelList().then(res => {
        this.list = res.data
        this.listLoading = false
      })
    },
    deleteLabel(id) {
      this.listLoading = true
      deleteLabel(id).then(res => {
        if (res.data) {
          this.$message.success('删除成功')
          this.getLabelList()
        }
      })
    }
  }
}
</script>
