<template>
  <div class="createPost-container">
    <el-form ref="postForm" :model="postForm" :rules="rules">
      <Sticky>
        <el-card class="btns" :body-style="{padding: 0}">
          <CommentDropdown v-model="postForm.comment_disabled" />
          <SourceUrlDropdown v-model="postForm.img_url" />
          <el-button v-loading="loading" style="margin-left: 10px;" type="success" @click="onSubmit">
            发布
          </el-button>
          <el-button v-loading="loading" type="warning" @click="draftForm">
            暂存
          </el-button>
          <el-button v-loading="loading" type="danger" @click="resetForm">
            重置
          </el-button>
        </el-card>
      </Sticky>
      <div class="createPost-main-container">
        <el-row>
          <el-col :span="24">
            <el-form-item prop="title">
              <MDinput v-model="postForm.title" :maxlength="100" name="name" required>
                标题
              </MDinput>
            </el-form-item>
            <el-form-item prop="description">
              <MDinput v-model="postForm.description" :maxlength="100" name="description" required>
                简介
              </MDinput>
              <span v-show="postForm.description" class="word-counter">{{ contentShortLength }}字</span>
            </el-form-item>

            <div class="postInfo-container">
              <el-row>
                <el-col :xs="24" :lg="6" :md="12">
                  <el-form-item label-width="60px" label="作者:" prop="author">
                    <el-select v-model="postForm.author" style="width: 100%" filterable default-first-option remote placeholder="请输入">
                      <el-option v-for="(item,index) in userList" :key="item+index" :label="item.username" :value="item.id" />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :lg="6" :md="12">
                  <el-form-item label-width="60px" label="标签:" prop="label">
                    <el-select v-model="postForm.label" style="width: 100%" multiple filterable default-first-option remote placeholder="请输入">
                      <el-option v-for="(item,index) in labelList" :key="item+index" :label="item.name" :value="item.id" />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :lg="6" :md="12">
                  <el-form-item label-width="60px" label="分类:" prop="sort">
                    <el-select v-model="postForm.sort" style="width: 100%" multiple filterable default-first-option remote placeholder="请输入">
                      <el-option v-for="(item,index) in sortList" :key="item+index" :label="item.name" :value="item.id" />
                    </el-select>
                  </el-form-item>
                </el-col>

                <el-col :xs="24" :lg="6" :md="12">
                  <el-form-item label-width="60px" label="日期:" prop="date">
                    <el-date-picker v-model="postForm.date" style="width: 100%" type="datetime" format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期时间" />
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </el-col>
        </el-row>
        <el-form-item prop="content" style="margin-bottom: 30px;">
          <mavon-editor v-model="postForm.content" style="min-height:500px" />
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>

<script>
import Upload from '@/components/Upload/SingleImage3'
import MDinput from '@/components/MDinput'
import Sticky from '@/components/Sticky' // 粘性header组件
import { CommentDropdown, SourceUrlDropdown } from './Dropdown'
import { getLabelList } from '@/api/labels'
import { getSortList } from '@/api/sorts'
import { getUserList } from '@/api/users'
import { getArticle, addArticle, editArticle } from '@/api/article'

const defaultForm = {
  status: 'draft',
  title: '', // 文章题目
  content: '', // 文章内容
  description: '', // 文章摘要
  label: [], // 标签
  sort: [], // 分类
  img_url: 'https://cdn.jsdelivr.net/gh/Thawsoar/FigureBed@master/img/20200425144136.png', // 文章图片
  id: undefined,
  comment_disabled: false,
  date: new Date()
}

export default {
  name: 'ArticleDetail',
  components: { MDinput, Sticky, CommentDropdown, SourceUrlDropdown },
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    const validateRequire = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('哀家是被忽视了吗？'))
      } else {
        callback()
      }
    }
    return {
      postForm: Object.assign({}, defaultForm),
      loading: false,
      userList: [],
      rules: {
        title: [{ validator: validateRequire }],
        content: [{ validator: validateRequire }]
      },
      labelList: [],
      sortList: [],
      tempRoute: {}
    }
  },
  computed: {
    contentShortLength() {
      return this.postForm.description.length
    }
  },
  created() {
    this.getRemoteUserList()
    this.getRemoteLabelList()
    this.getRemoteSortList()
    if (this.isEdit) {
      const id = this.$route.params && this.$route.params.id
      this.fetchData(id)
    }
  },
  methods: {
    fetchData(id) {
      getArticle(id).then(res => {
        if (res.result) {
          this.postForm = {
            ...res.data,
            author: res.data.user_id,
            label: res.data.labels ? res.data.labels.map(_ => _.id) : [],
            sort: res.data.sorts ? res.data.sorts.map(_ => _.id) : []
          }
          console.log(this.postForm)
        }
      }).catch(err => {
        console.log(err)
      })
    },
    setTagsViewTitle() {
      const title = 'Edit Article'
      const route = Object.assign({}, this.tempRoute, { title: `${title}-${this.postForm.id}` })
      this.$store.dispatch('tagsView/updateVisitedView', route)
    },
    onSubmit() {
      this.isEdit ? this.edit() : this.add()
    },
    add() {
      this.$refs.postForm.validate(valid => {
        if (valid) {
          this.loading = true
          const params = {
            ...this.postForm,
            img_url: this.postForm.img_url,
            user_id: this.postForm.author
          }
          addArticle(params).then(res => {
            if (res.result) {
              this.$notify({
                title: '成功',
                message: '发布文章成功',
                type: 'success',
                duration: 2000
              })
              this.postForm.status = 'published'
            }
            this.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    edit() {
      this.$refs.postForm.validate(valid => {
        if (valid) {
          this.loading = true
          const params = {
            ...this.postForm,
            img_url: this.postForm.img_url,
            user_id: this.postForm.author
          }
          editArticle(params).then(res => {
            if (res.result) {
              this.$notify({
                title: '成功',
                message: '编辑文章成功',
                type: 'success',
                duration: 2000
              })
              this.postForm.status = 'published'
            }
            this.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm() {
      const id = this.$route.params && this.$route.params.id
      this.fetchData(id)
    },
    draftForm() {
      if (this.postForm.content.length === 0 || this.postForm.title.length === 0) {
        this.$message({
          message: '请填写必要的标题和内容',
          type: 'warning'
        })
        return
      }
      this.$message({
        message: '保存成功',
        type: 'success',
        showClose: true,
        duration: 1000
      })
      this.postForm.status = 'draft'
    },
    getRemoteUserList(query) {
      getUserList(query).then(res => {
        if (res.data) {
          this.userList = res.data
          this.postForm.author = res.data.length ? res.data[0].username : ''
        }
      })
    },
    getRemoteLabelList(query) {
      getLabelList().then(res => {
        if (res.data) {
          this.labelList = res.data
        }
      })
    },
    getRemoteSortList(query) {
      getSortList().then(res => {
        if (res.data) {
          this.sortList = res.data
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/mixin.scss";
.createPost-container {
  position: relative;
  .createPost-main-container {
    padding: 0px 45px 20px 50px;
    .postInfo-container {
      position: relative;
      @include clearfix;
      margin-bottom: 10px;

      .postInfo-container-item {
        float: left;
      }
    }
  }

  .word-counter {
    width: 40px;
    position: absolute;
    right: 10px;
    bottom: 0px
  }

  .btns {
    width: 100%;
    text-align: right;
    padding: 10px 40px;
    background: transparent;
  }
}

.article-textarea /deep/ {
  textarea {
    padding-right: 40px;
    resize: none;
    border: none;
    border-radius: 0px;
    border-bottom: 1px solid #bfcbd9;
  }
}
.markdown-body {
  z-index: 0;
}
</style>
