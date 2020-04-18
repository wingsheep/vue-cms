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
      <el-table-column prop="name" label="分类名称" />
      <el-table-column prop="alias" label="分类别名" />
      <el-table-column prop="description" label="分类描述" />
      <el-table-column prop="createdAt" label="创建时间">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.createdAt | formatDate }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="updatedAt" label="修改时间">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.updatedAt | formatDate }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="op" label="操作">
        <template slot-scope="scope">
          <router-link :to="'/Sort/edit/'+scope.row.id">
            <el-button type="text">
              编辑
            </el-button>
          </router-link>
          <el-button type="text" @click="deleteSort(scope.row.id)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getSortList, getSort, deleteSort, addSort, editSort } from '@/api/sorts'
export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    },
    formatDate(val) {
      return val ? val.slice(0, 10) : ''
    }
  },
  data() {
    return {
      list: null,
      listLoading: true,
      singleSort: {}
    }
  },
  created() {
    this.getSortList()
  },
  methods: {
    getSort(id) {
      getSort(id).then(res => {
        this.singleSort = res.data[0]
      })
    },
    addSort(params) {
      addSort(params).then(res => {
        if (res.data) {
          this.$message.success('新增成功')
          this.fetchData()
        }
      })
    },
    editSort(params) {
      editSort(params).then(res => {
        if (res.data) {
          this.$message.success('编辑成功')
          this.fetchData()
        }
      })
    },
    getSortList() {
      this.listLoading = true
      getSortList().then(res => {
        this.list = res.data
        this.listLoading = false
      })
    },
    deleteSort(id) {
      this.listLoading = true
      deleteSort(id).then(res => {
        if (res.data) {
          this.$message.success('删除成功')
          this.fetchData()
        }
      })
    }
  }
}
</script>
