<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-bottom:10px">
      <el-breadcrumb-item :to="{ path: '/index/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="el-card__body">
      <!-- 添加角色 -->
      <el-button type="primary" style="margin-bottom:20px" @click="add()">添加角色</el-button>
      <!-- 添加角色的模态框 -->
      <el-dialog title="添加角色" :visible.sync="dialogFormVisible">
        <el-form :model="role" :rules="rules">
          <!-- 角色名称 -->
          <el-form-item label="角色名称" prop="roleName" :label-width="formLabelWidth">
            <el-input v-model="role.roleName" autocomplete="off"></el-input>
          </el-form-item>
          <!-- 角色描述 -->
          <el-form-item label="角色描述" prop="roleDesc" :label-width="formLabelWidth">
            <el-input v-model="role.roleDesc" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="addrole()">确 定</el-button>
        </div>
      </el-dialog>
      <el-table border stripe :data="arr" style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="scope">
            <el-row
              :gutter="20"
              v-for="(item, index) in scope.row.children"
              :key="index"
              justify
              align="middle"
              :class="
                index == 0
                  ? 'h-center bdtottom bdright bdtop'
                  : 'h-center bdtottom bdright'
              "
            >
              <el-col :span="5" class="h-center">
                <div class="grid-content bg-purple v-center">
                  <el-tag
                    closable
                    effect="dark"
                    type="dark"
                    @close="del(scope.row.id, item.id)"
                  >{{ item.authName }}</el-tag>
                  <i class="el-icon-caret-right"></i>
                </div>
              </el-col>
              <el-col :span="19">
                <div class="grid-content bg-purple">
                  <el-row
                    v-for="(it, i) in item.children"
                    :key="i"
                    class="pd bdtottom h-center"
                    :gutter="20"
                  >
                    <el-col :span="6" class="h-center">
                      <el-tag
                        closable
                        effect="dark"
                        type="success"
                        @close="del(scope.row.id, it.id)"
                      >{{ it.authName }}</el-tag>
                      <i class="el-icon-caret-right"></i>
                    </el-col>
                    <el-col :span="18">
                      <el-tag
                        closable
                        effect="dark"
                        v-for="(k, v) in it.children"
                        type="warning"
                        class="tag-lv3"
                        :key="v"
                        @close="del(scope.row.id, k.id)"
                      >{{ k.authName }}</el-tag>
                    </el-col>
                  </el-row>
                </div>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
        <el-table-column type="index" width="50" label="#"></el-table-column>
        <el-table-column prop="roleName" label="角色名称"></el-table-column>
        <el-table-column prop="roleDesc" label="角色描述"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <!-- 编辑 -->
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              @click="revise(scope.row.id)"
            >编辑</el-button>
            <!-- 编辑的模态框 -->
            <el-dialog title="编辑角色" :visible.sync="dialogFormVisible1">
              <el-form :model="role" :rules="rules">
                <!-- 角色名称 -->
                <el-form-item label="角色名称" prop="roleName" :label-width="formLabelWidth">
                  <el-input v-model="role.roleName" autocomplete="off"></el-input>
                </el-form-item>
                <!-- 角色描述 -->
                <el-form-item label="角色描述" prop="roleDesc" :label-width="formLabelWidth">
                  <el-input v-model="role.roleDesc" autocomplete="off"></el-input>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible1 = false">取 消</el-button>
                <el-button type="primary" @click="update(id)">确 定</el-button>
              </div>
            </el-dialog>
            <!-- 删除 -->
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              @click="del2(scope.row.id)"
            >删除</el-button>
            <!-- 分配权限 -->
            <el-button type="warning" icon="el-icon-setting" size="mini">分配权限</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import {
  ajax2roles,
  ajax2delete,
  ajaxaddrole,
  ajax2del,
  ajax2revise,
  ajax2update
} from "../../http/api";
export default {
  // 组件名称
  name: "roles",
  // 组件参数 接收来自父组件的数据
  props: [],
  // 局部注册的组件
  components: {},
  // 组件状态值
  data() {
    return {
      id:0,
      arr: [],
      dialogFormVisible: false,
      dialogFormVisible1: false,
      role: {
        roleName: "", //角色名称
        roleDesc: "" //角色描述
      },
      rules: {
        roleName: [
          { required: true, message: "请输入角色名称", trigger: "blur" },
          { min: 3, max: 10, message: "长度在 3 到 10 个字符", trigger: "blur" }
        ],
        roleDesc: [
          { required: true, message: "请输入角色描述", trigger: "blur" },
          { min: 3, max: 10, message: "长度在 3 到 10 个字符", trigger: "blur" }
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
    async ajax2() {
      let { data } = await ajax2roles("roles");
      this.arr = data.data;
      console.log(this.arr);
    },
    // 编辑
    // 点击获取
    async revise(id) {
      this.dialogFormVisible1 = true;
      let { data: revise } = await ajax2revise(id);
      console.log(revise);
      this.role.roleName = revise.data.roleName;
      this.role.roleDesc = revise.data.roleDesc;
      this.id = revise.data.roleId
    },
    async update(id1) {
      let { data: update } = await ajax2update(id1,this.role);
      console.log(update);
      if (update.meta.status == "200") {
        this.$message({
          type: "success",
          message: "角色更新成功"
        });
      }
      this.ajax2();
      this.dialogFormVisible1 = false;
    },
    // 添加角色
    add() {
      this.dialogFormVisible = true;
      this.role.roleName = "";
      this.role.roleDesc = "";
    },
    async addrole() {
      this.dialogFormVisible = false;
      let { data: res } = await ajaxaddrole("roles", this.role);
      console.log(res);
      if (res.meta.status == "201") {
        this.$message({
          type: "success",
          message: res.meta.msg
        });
      }
      this.ajax2();
    },
    // 删除角色
    async del3(id) {
      let { data: rem2 } = await ajax2del(id);
      console.log(rem2);
      this.$message({
        type: "success",
        message: rem2.meta.msg
      });
      this.ajax2();
    },
    async del2(id) {
      console.log(id);
      this.$confirm("此用户将永久删除是否继续", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.del3(id);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // 删除角色指定权限
    async del1(id1, id) {
      let { data: rem } = await ajax2delete(id1, id);
      console.log(rem);
      this.$message({
        type: "success",
        message: "删除权限成功"
      });
      this.ajax2();
    },
    del(id1, id) {
      this.$confirm("此用户将永久删除是否继续", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.del1(id1, id);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
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
    this.ajax2();
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
.el-row {
  border-left: 1px solid #efefef;
}
.pd {
  padding: 5px 0;
}
.h-center {
  display: flex;
  justify-content: center;
  align-items: center;
}
.v-center {
  display: flex;
  align-items: center;
}
.bdtottom {
  border-bottom: 1px solid #efefef;
}
.bdright {
  border-right: 1px solid #efefef;
}
.bdtop {
  border-top: 1px solid #efefef;
}
.tag-lv3 {
  margin: 5px 10px 5px 0;
}
</style>
