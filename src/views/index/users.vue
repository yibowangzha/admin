<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-bottom:10px">
      <el-breadcrumb-item :to="{ path: '/index/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="el-card__body">
      <!-- 搜索框 -->
      <el-input placeholder="请输入内容" v-model="query" clearable @keyup.enter="search"></el-input>
      <!-- 搜素按钮 -->
      <el-button icon="el-icon-search" @click="search"></el-button>
      <!-- 添加按钮 -->
      <el-button type="primary" @click="dialogFormVisible = true">添加用户</el-button>
      <!-- 添加的模态框 -->
      <el-dialog title="添加用户" :visible.sync="dialogFormVisible">
        <el-form :model="form" :rules="rules">
          <!-- 用户名 -->
          <el-form-item label="用户名" prop="username" :label-width="formLabelWidth">
            <el-input v-model="form.username" autocomplete="off"></el-input>
          </el-form-item>
          <!-- 密码 -->
          <el-form-item label="密码" prop="password" :label-width="formLabelWidth">
            <el-input v-model="form.password" autocomplete="off"></el-input>
          </el-form-item>
          <!-- 邮箱 -->
          <el-form-item label="邮箱" prop="email" :label-width="formLabelWidth">
            <el-input v-model="form.email" autocomplete="off"></el-input>
          </el-form-item>
          <!-- 手机号 -->
          <el-form-item label="手机号" prop="mobile" :label-width="formLabelWidth">
            <el-input v-model="form.mobile" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="addusers()">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 用户表格 -->
      <el-table border style="width: 100%;margin-top:20px;" :data="arr.users">
        <el-table-column type="index" width="50" label="#"></el-table-column>
        <el-table-column prop="username" label="姓名" width="180"></el-table-column>
        <el-table-column prop="email" label="邮箱" width="180"></el-table-column>
        <el-table-column prop="mobile" label="电话"></el-table-column>
        <el-table-column prop="role_name" label="角色"></el-table-column>
        <el-table-column label="状态" width="180">
          <!-- switch开关 -->
          <template slot-scope="scope">
            <el-switch
              @change="upDate(scope.row.id)"
              v-model="scope.row.mg_state"
              active-color="#13ce66"
              inactive-color="#ff4949"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <!-- 修改的模态框 -->
            <el-button type="primary" icon="el-icon-edit" @click="revise(scope.row.id)"></el-button>
            <el-dialog title="编辑用户" :visible.sync="dialogFormVisible1">
              <el-form :model="form" :rules="rul">
                <!-- 用户名 -->
                <el-form-item label="用户名" prop="username" :label-width="formLabelWidth">
                  <el-input v-model="form.username" autocomplete="off" :disabled="true"></el-input>
                </el-form-item>
                <!-- 邮箱 -->
                <el-form-item label="邮箱" prop="email" :label-width="formLabelWidth">
                  <el-input v-model="form.email" autocomplete="off"></el-input>
                </el-form-item>
                <!-- 手机号 -->
                <el-form-item label="手机号" prop="mobile" :label-width="formLabelWidth">
                  <el-input v-model="form.mobile" autocomplete="off"></el-input>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible1 = false">取 消</el-button>
                <el-button type="primary" @click="xiugai(scope.row.id)">确 定</el-button>
              </div>
            </el-dialog>
            <el-button type="danger" icon="el-icon-delete" @click="dels(scope.row.id)"></el-button>
            <el-button type="warning" icon="el-icon-setting"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页器 -->
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pagenum"
          :page-sizes="[1, 2, 3, 4]"
          :page-size="pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="arr.total"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import {
  ajaxusers,
  ajaxaddusers,
  ajaxupdate,
  ajaxdelete,
  ajaxrevise,
  ajaxrenewal
} from "../../http/api";
export default {
  // 组件名称
  name: "Users",
  // 组件参数 接收来自父组件的数据
  props: [],
  // 局部注册的组件
  components: {},
  // 组件状态值
  data() {
    let checkmobile = (rule, value, callback) => {
      let phone = /^1(3|4|5|7|8)\d{9}$/;
      if (!value) {
        return callback(new Error("请输入手机号"));
      }
      if (phone.test(value)) {
        callback();
      } else {
        callback(new Error("请输入正确的手机号"));
      }
    };
    return {
      arr1: "",
      pagenum: 1, //当前页数
      pagesize: 2, //每页几条
      query: "", //关键字
      arr: [], //用户数据
      dialogFormVisible: false,
      dialogFormVisible1: false,
      form: {
        username: "", //用户名
        password: "", //密码
        email: "", //邮箱
        mobile: "" //手机号
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 10, message: "长度在 3 到 10 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 3, max: 15, message: "长度在 6 到 15 个字符", trigger: "blur" }
        ],
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: ["blur", "change"]
          }
        ],
        mobile: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          { validator: checkmobile, trigger: "blur" }
        ]
      },
      rul: {
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: ["blur", "change"]
          }
        ],
        mobile: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          { validator: checkmobile, trigger: "blur" }
        ]
      },
      formLabelWidth: "100px" //名称的宽度
    };
  },
  // 计算属性
  computed: {},
  // 侦听器
  watch: {},
  // 组件方法
  methods: {
    // 搜索
    search() {
      this.ajax();
    },
    // 每页几条
    handleSizeChange(val) {
      this.pagesize = val;
      this.ajax();
    },
    // 当前页
    handleCurrentChange(val) {
      this.pagenum = val;
      this.ajax();
    },
    async ajax() {
      // 右侧用户数据
      let { data } = await ajaxusers("users", {
        query: this.query,
        pagenum: this.pagenum,
        pagesize: this.pagesize
      });
      this.arr = data.data;
      console.log(data);
      console.log(this.arr);
    },
    // 添加用户
    async addusers() {
      this.dialogFormVisible = false;
      let { data: res } = await ajaxaddusers("users", this.form);
      console.log(res);
      this.ajax();
    },
    //修改用户状态
    async upDate(id, bool) {
      // this.upDate()
      let { data: update } = await ajaxupdate(id, bool);
      // console.log(update);
      if (update.meta.status == "200") {
        this.$message({
          type: "success",
          message: update.meta.msg
        });
      }
    },
    // 删除用户
    async del(id) {
      let { data: deletes } = await ajaxdelete(id);
      console.log(deletes);
      this.$message({
        type: "success",
        message: deletes.meta.msg
      });
      this.ajax();
    },
    async dels(id) {
      this.$confirm("此用户将永久删除是否继续", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.del(id);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // 修改
    async revise1(id) {
      this.dialogFormVisible1 = true;
      let { data: revise } = await ajaxrevise(id);
      console.log(revise);
      this.form.username = revise.data.username;
    },
    async xiugai1(id) {
      let { data: renewal } = await ajaxrenewal(id, this.form);
      console.log(renewal);
      if(renewal.meta.status == '200'){
        this.$message({
          type: "success",
          message: renewal.meta.msg
        });
      }
      this.ajax();
      this.dialogFormVisible1 = false;
    },
    revise(id) {
      this.revise1(id);
    },
    xiugai(id) {
      this.xiugai1(id);
    }
  },
  /**
   * 组件实例创建完成，属性已绑定，但DOM还未生成，$ el属性还不存在
   */
  created() {},
  /**
 /**
 * el 被新创建的 vm.$ el 替换，并挂载到实例上去之后调用该钩子。
 * 如果 root 实例挂载了一个文档内元素，当 mounted 被调用时 vm.$ el 也在文档内。
 */
  mounted() {
    this.ajax();
    this.upDate();
  },
  /**
   * 由于数据更改导致的虚拟 DOM 重新渲染和打补丁，在这之后会调用该钩子。
   * 当这个钩子被调用时，组件 DOM 已经更新，所以你现在可以执行依赖于 DOM 的操作。
   */
  updated() {},
  /**
   * keep-alive 组件激活时调用。 仅针对keep-alive 组件有效
   */
  activated() {},
  /**
   * keep-alive 组件停用时调用。 仅针对keep-alive 组件有效
   */
  deactivated() {}
};
</script> 

<!-- Add "scoped" attribute to limit CSS to this component only -->
<!--使用了scoped属性之后，父组件的style样式将不会渗透到子组件中，-->
<!--然而子组件的根节点元素会同时被设置了scoped的父css样式和设置了scoped的子css样式影响，-->
<!--这么设计的目的是父组件可以对子组件根元素进行布局。-->
<style scoped lang="scss">
.el-card__body {
  padding: 20px;
  background: white;
}
.el-input {
  width: 500px;
}
</style>
