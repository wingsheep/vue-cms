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
      <el-table-column prop="name" label="友链名称">
        <template slot-scope="scope">
          <el-button type="text">
            <a :href="scope.row.url" target="_blank">{{ scope.row.name }}</a>
          </el-button>
        </template>
      </el-table-column>
      <el-table-column prop="img_url" label="友链图片地址">
        <template slot-scope="scope">
          <img style="width: 60px; height: 60px; border-radius: 50%" :src="scope.row.img_url" :alt="scope.row.img_url">
        </template>
      </el-table-column>
      <el-table-column prop="desc" label="友链描述" />
      <el-table-column min-width="100px" prop="state" label="启用状态">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.state" @change="editFriendlink(scope.row)" />
        </template>
      </el-table-column>
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
          <router-link :to="'/Friendlink/edit/'+scope.row.id">
            <el-button type="text">
              编辑
            </el-button>
          </router-link>
          <el-button type="text" @click="deleteFriendlink(scope.row.id)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getFriendlinkList, getFriendlink, deleteFriendlink, addFriendlink, editFriendlink } from '@/api/friendlink'
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
      singleFriendlink: {}
    }
  },
  created() {
    this.getFriendlinkList()
  },
  methods: {
    getFriendlink(id) {
      getFriendlink(id).then(res => {
        this.singleFriendlink = res.data[0]
      })
    },
    addFriendlink(params) {
      addFriendlink(params).then(res => {
        if (res.data) {
          this.$message.success('新增成功')
          this.getFriendlinkList()
        }
      })
    },
    editFriendlink(params) {
      editFriendlink(params).then(res => {
        if (res.data) {
          this.$message.success('状态修改成功')
          this.getFriendlinkList()
        }
      })
    },
    getFriendlinkList() {
      this.listLoading = true
      getFriendlinkList().then(res => {
        this.list = res.data
        this.listLoading = false
      })
    },
    deleteFriendlink(id) {
      this.listLoading = true
      deleteFriendlink(id).then(res => {
        if (res.data) {
          this.$message.success('删除成功')
          this.getFriendlinkList()
        }
      })
    }
  }
}
</script>
