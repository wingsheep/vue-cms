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
      <el-table-column label="用户名">
        <template slot-scope="scope">
          {{ scope.row.Sortname }}
        </template>
      </el-table-column>
      <el-table-column label="昵称">
        <template slot-scope="scope">
          <span>{{ scope.row.nickname }}</span>
        </template>
      </el-table-column>
      <el-table-column label="邮箱" min-width="100">
        <template slot-scope="scope">
          {{ scope.row.email }}
        </template>
      </el-table-column>
      <el-table-column label="年龄">
        <template slot-scope="scope">
          {{ scope.row.age }}
        </template>
      </el-table-column>
      <el-table-column label="电话号码">
        <template slot-scope="scope">
          {{ scope.row.telephone }}
        </template>
      </el-table-column>
      <el-table-column label="生日">
        <template slot-scope="scope">
          <span>{{ scope.row.birthday }}</span>
        </template>
      </el-table-column>
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
import { getSortList, getSort, deleteSort, addSort, editSort } from '@/api/Sorts'
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
