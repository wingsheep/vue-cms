<template>
  <div class="app-container">
    <el-card style="margin-bottom: 15px">
      <el-form ref="form" :model="form" label-width="80px" size="small">
        <el-row :gutter="15">
          <el-col :span="6">
            <el-form-item label="文章标题">
              <el-input v-model="form.title" style="width: 100%;" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="发布时间">
              <el-date-picker
                v-model="form.date"
                type="daterange"
                range-separator="-"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                style="width: 100%;"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-button type="primary" size="small" @click="getArticleList">
              查询
            </el-button>
            <el-button type="warning" size="small">
              重置
            </el-button>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
    <el-card style="margin-bottom: 15px">
      <div slot="header">
        <el-row type="flex" justify="between" style="margin-bottom: 15px">
          <el-col>
            查询表格
          </el-col>
          <el-col align="right">
            <router-link to="/article/create">
              <el-button type="primary" size="small" icon="el-icon-plus">
                新增
              </el-button>
            </router-link>
            <el-divider direction="vertical" />
            <el-dropdown :show-timeout="100" trigger="click">
              <el-tooltip effect="dark" content="密度" placement="top">
                <i style="font-size: 16px; cursor: pointer;margin-right: 15px" class="el-icon-s-operation" />
              </el-tooltip>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>
                  <el-radio-group v-model="size" style="padding: 10px;">
                    <el-radio label="medium">默认</el-radio>
                    <el-radio label="small">中等</el-radio>
                    <el-radio label="mini">紧凑</el-radio>
                  </el-radio-group>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <el-tooltip effect="dark" content="刷新" placement="top">
              <i style="font-size: 16px; cursor: pointer;" class="el-icon-refresh-right" @click="getArticleList" />
            </el-tooltip>
          </el-col>
        </el-row>
        <el-alert type="info" :closable="false" title=" 已选择0项，共计浏览量30" show-icon />
      </div>
      <el-table
        v-loading="listLoading"
        :data="list"
        fit
        highlight-current-row
        style="width: 100%;"
        :size="size"
      >
        <el-table-column type="selection" min-width="50px" align="center" fixed />
        <el-table-column min-width="150px" prop="title" label="文章标题" show-overflow-tooltip fixed />
        <el-table-column min-width="150px" prop="views" label="浏览量" />
        <el-table-column min-width="150px" prop="comment" label="评论总数" />
        <el-table-column min-width="150px" prop="like_count" label="点赞数量" />
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

        <el-table-column min-width="180px" prop="date" label="发表时间">
          <template slot-scope="scoped">
            {{ scoped.row.date | formatDate }}
          </template>
        </el-table-column>

        <el-table-column min-width="280px" prop="op" label="操作" fixed="right">
          <template slot-scope="scope">
            <router-link :to="'/article/edit/'+scope.row.id">
              <el-button type="text" icon="el-icon-edit">
                编辑
              </el-button>
            </router-link>
            <el-divider direction="vertical" />
            <el-button type="text" icon="el-icon-delete" @click="deleteRow(scope.row.id)">
              删除
            </el-button>
            <el-divider direction="vertical" />
            <el-button type="text" icon="el-icon-s-comment" @click="commentRow(scope.row)">
              评论管理
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <pagination v-show="total>0" :total="total" :page.sync="listQuery.offset" :limit.sync="listQuery.limit" @pagination="getArticleList" />
    </el-card>
    <el-dialog v-if="dialogVisible" :title="`评论管理(${ currentRow.title })`" :visible.sync="dialogVisible">
      <Comment :id="commentId" />
    </el-dialog>
  </div>
</template>

<script>
import { getArticleList, deleteArticle } from '@/api/article'
import Comment from '../comment'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

export default {
  name: 'ArticleList',
  components: { Pagination, Comment },
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
      currentRow: {},
      commentId: '',
      dialogVisible: false,
      size: 'medium',
      form: {

      },
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
    this.getArticleList()
  },
  methods: {
    commentRow(row) {
      this.commentId = row.id
      this.currentRow = JSON.parse(JSON.stringify(row))
      this.dialogVisible = true
    },
    getArticleList() {
      this.listLoading = true
      getArticleList(this.listQuery).then(res => {
        if (res.result) {
          this.list = res.data.rows
          this.total = res.data.count
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
