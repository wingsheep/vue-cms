<template>
  <div class="app-container">
    <el-table v-loading="listLoading" :data="list" border fit highlight-current-row style="width: 100%">
      <el-table-column min-width="180px" prop="content" label="评论内容" />
      <el-table-column min-width="180px" prop="user_nickname" label="用户名" />
      <el-table-column min-width="180px" prop="user_email" label="用户邮箱" />
      <el-table-column min-width="180px" prop="user_url" label="用户网站" />
      <el-table-column min-width="180px" prop="like_count" label="点赞数量" />
      <el-table-column min-width="180px" prop="title" label="评论文章" />
      <el-table-column min-width="100px" prop="op" label="操作">
        <template slot-scope="scope">
          <el-button type="text" @click="deleteRow(scope.row.id)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.offset" :limit.sync="listQuery.limit" @pagination="getCommentList" />
  </div>
</template>

<script>
import { getCommentList, deleteComment } from '@/api/comments'

import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

export default {
  name: 'ArticleList',
  components: { Pagination },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list: null,
      total: 0,
      listLoading: false,
      listQuery: {
        offset: 1,
        limit: 10
      }
    }
  },
  created() {
    this.getCommentList()
  },
  methods: {
    getCommentList() {
      this.listLoading = true
      getCommentList(this.listQuery).then(res => {
        if (res.result) {
          this.list = res.data.rows
          this.total = res.data.count
          this.listLoading = false
        }
      })
    },
    deleteRow(id) {
      this.listLoading = true
      deleteComment(id).then(res => {
        if (res.result) {
          this.listLoading = false
          this.$message.success('删除文章成功')
          this.getCommentList()
        }
      })
    }
  }
}
</script>

<style scoped>
.edit-input {
  padding-right: 100px;
}
.cancel-btn {
  position: absolute;
  right: 15px;
  top: 10px;
}
</style>
