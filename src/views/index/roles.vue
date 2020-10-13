<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-bottom:10px">
      <el-breadcrumb-item :to="{ path: '/index/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="el-card__body">
      <el-button type="primary" style="margin-bottom:20px">添加按钮</el-button>
      <el-table
        border
        stripe
        :data="arr"
        style="width: 100%"
      >
        <el-table-column type="index" width="50" label="#"></el-table-column>
        <el-table-column type="index" width="50" label="#"></el-table-column>
        <el-table-column property="roleName" label="角色名称"></el-table-column>
        <el-table-column property="roleDesc" label="角色描述"></el-table-column>
        <el-table-column label="操作">
            <template slot-scope="scope">
            <!-- 修改的模态框 -->
            <el-button type="primary" icon="el-icon-edit" size='mini'>编辑</el-button>
           
            <el-button type="danger" icon="el-icon-delete" size='mini'>删除</el-button>
            <el-button type="warning" icon="el-icon-setting" size='mini'>分配权限</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { ajax2roles } from "../../http/api";
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
      arr: []
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
</style>
