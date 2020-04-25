<template>
  <div class="app-container">
    <el-table v-loading="listLoading" :data="list" border fit highlight-current-row style="width: 100%">
      <el-table-column min-width="180px" prop="title" label="文章标题" />
      <el-table-column min-width="180px" prop="views" label="浏览量" />
      <el-table-column min-width="180px" prop="sort" label="文章分类">
        <template slot-scope="scope">
          <el-tag v-for="item in scope.row.sorts" :key="item.id" type="danger" size="mini" style="margin-left: 4px">{{ item.name }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column min-width="180px" prop="label" label="文章标签">
        <template slot-scope="scope">
          <el-tag v-for="item in scope.row.labels" :key="item.id" type="info" size="mini" style="margin-left: 4px">{{ item.name }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column min-width="180px" prop="comment" label="评论总数" />
      <el-table-column min-width="180px" prop="date" label="发表时间">
        <template slot-scope="scoped">
          {{ scoped.row.date | formatDate }}
        </template>
      </el-table-column>
      <el-table-column min-width="180px" prop="like_count" label="点赞数量" />

      <el-table-column min-width="100px" prop="op" label="操作">
        <template slot-scope="scope">
          <router-link :to="'/article/edit/'+scope.row.id">
            <el-button type="text">
              编辑
            </el-button>
          </router-link>
          <el-button type="text" @click="deleteRow(scope.row.id)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" /> -->
  </div>
</template>

<script>
import { getArticleList, deleteArticle } from '@/api/article'

// import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

export default {
  name: 'ArticleList',
  // components: { Pagination },
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
        page: 1,
        limit: 20
      }
    }
  },
  created() {
    this.getArticleList()
  },
  methods: {
    getArticleList() {
      this.listLoading = true
      getArticleList().then(res => {
        if (res.result) {
          this.list = res.data
          this.listLoading = false
        }
      })
    },
    deleteRow(id) {
      this.listLoading = true
      deleteArticle(id).then(res => {
        if (res.result) {
          this.listLoading = false
          this.$message.success('删除文章成功')
          this.getArticleList()
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
