(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-6fa2d574"],{2612:function(t,e,n){"use strict";n.d(e,"a",(function(){return r})),n.d(e,"b",(function(){return i})),n.d(e,"c",(function(){return c})),n.d(e,"d",(function(){return s})),n.d(e,"e",(function(){return l}));var o=n("b775"),a="/api/v1/users";function r(t){return Object(o["a"])({url:"".concat(a),method:"post",data:t})}function i(t){return Object(o["a"])({url:"".concat(a,"/").concat(t),method:"delete"})}function c(t){return Object(o["a"])({url:"".concat(a,"/").concat(t.id),method:"put",data:t})}function s(t){return Object(o["a"])({url:"".concat(a,"/").concat(t),method:"get"})}function l(){return Object(o["a"])({url:a,method:"get"})}},"6f69":function(t,e,n){"use strict";n("893a")},"893a":function(t,e,n){},"8a99":function(t,e,n){"use strict";var o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"app-container"},[n("el-form",{ref:"form",attrs:{model:t.form,"label-width":"120px"}},[n("el-form-item",{attrs:{label:"用户名"}},[n("el-input",{model:{value:t.form.username,callback:function(e){t.$set(t.form,"username",e)},expression:"form.username"}})],1),t._v(" "),n("el-form-item",{attrs:{label:"密码"}},[n("el-input",{model:{value:t.form.password,callback:function(e){t.$set(t.form,"password",e)},expression:"form.password"}})],1),t._v(" "),n("el-form-item",{attrs:{label:"昵称"}},[n("el-input",{model:{value:t.form.nickname,callback:function(e){t.$set(t.form,"nickname",e)},expression:"form.nickname"}})],1),t._v(" "),n("el-form-item",{attrs:{label:"邮箱"}},[n("el-input",{model:{value:t.form.email,callback:function(e){t.$set(t.form,"email",e)},expression:"form.email"}})],1),t._v(" "),n("el-form-item",{attrs:{label:"电话号码"}},[n("el-input",{model:{value:t.form.telephone,callback:function(e){t.$set(t.form,"telephone",e)},expression:"form.telephone"}})],1),t._v(" "),n("el-form-item",{attrs:{label:"生日"}},[n("el-date-picker",{attrs:{type:"date"},model:{value:t.form.birthday,callback:function(e){t.$set(t.form,"birthday",e)},expression:"form.birthday"}})],1),t._v(" "),n("el-form-item",[n("el-button",{attrs:{type:"primary"},on:{click:t.onSubmit}},[t._v("保存")]),t._v(" "),n("el-button",{on:{click:t.onCancel}},[t._v("取消")])],1)],1)],1)},a=[],r=n("2612"),i={name:"UserDetail",props:{isEdit:{type:Boolean,default:!1}},data:function(){return{form:{username:"",nickname:"",email:"",password:"",age:void 0,delivery:!1,telephone:"",birthday:""},copyForm:{}}},created:function(){if(this.isEdit){var t=this.$route.params&&this.$route.params.id;this.fetchData(t)}},methods:{fetchData:function(t){var e=this;Object(r["d"])(t).then((function(t){e.form=t.data,e.copyForm=JSON.parse(JSON.stringify(e.form))})).catch((function(t){console.log(t)}))},onSubmit:function(){this.isEdit?this.editUser():this.addUser()},addUser:function(){var t=this,e=this.form;Object(r["a"])(e).then((function(e){t.$message("submit!")})).catch((function(t){console.log(t)}))},editUser:function(){var t=this;console.log(e);var e=this.form;Object(r["c"])(e).then((function(e){t.$message("submit!")})).catch((function(t){console.log(t)}))},onCancel:function(){this.form=JSON.parse(JSON.stringify(this.copyForm)),this.$message({message:"cancel!",type:"warning"})}}},c=i,s=(n("6f69"),n("2877")),l=Object(s["a"])(c,o,a,!1,null,"86943c04",null);e["a"]=l.exports},d344:function(t,e,n){"use strict";n.r(e);var o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("user-detail",{attrs:{"is-edit":!0}})},a=[],r=n("8a99"),i={name:"EditUser",components:{UserDetail:r["a"]}},c=i,s=n("2877"),l=Object(s["a"])(c,o,a,!1,null,null,null);e["default"]=l.exports}}]);