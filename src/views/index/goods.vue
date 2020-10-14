<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-bottom:10px">
      <el-breadcrumb-item :to="{ path: '/index/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="el-card__body">
      <el-input placeholder="请输入内容" v-model="obj.query" clearable></el-input>
      <el-button icon="el-icon-search"></el-button>
      <el-button type="primary" @click="$router.push('/index/add')">添加商品</el-button>
      <el-table
        border
        stripe
        ref="singleTable"
        :data="arr"
        highlight-current-row
        style="width: 100%"
      >
        <el-table-column type="index" width="50" label="#"></el-table-column>
        <el-table-column property="goods_name" label="商品名称"></el-table-column>
        <el-table-column property="goods_price" label="商品价格" width="90px"></el-table-column>
        <el-table-column property="goods_weight" label="商品重量" width="90px"></el-table-column>

        <el-table-column label="创建时间" width="140px">
          <template slot-scope="scope">
            <span style="font-size:12px">{{scope.row.add_time|time}}</span>
          </template>
        </el-table-column>

        <el-table-column label="操作" width="120px">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" size="mini"></el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              @click="del(scope.row.goods_id)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="obj.pagenum"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="obj.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import { ajaxgoods, ajax3del } from "../../http/api";
export default {
  // 组件名称
  name: "",
  // 组件参数 接收来自父组件的数据
  props: [],
  // 局部注册的组件
  components: {},
  // 组件状态值
  data() {
    return {
      arr: [],
      total: 0,
      obj: {
        query: "",
        pagenum: 1,
        pagesize: 10
      }
    };
  },
  // 计算属性
  computed: {},
  // 侦听器
  watch: {},
  // 组件方法
  methods: {
    async goods() {
      let { data } = await ajaxgoods("goods", this.obj);
      console.log(data.data.goods);
      this.arr = data.data.goods;
      this.total = data.data.total;
    },
    // 分页
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.obj.pagesize = val;
      this.goods();
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.obj.pagenum = val;
      this.goods();
    },
    // 删除
    async rem(id) {
      let { data: del } = await ajax3del(id);
      if (del.meta.status == "200") {
        this.$message({
          type: "success",
          message: del.meta.msg
        });
      }
      this.goods();
    },
    del(id) {
      this.$confirm("此用户将永久删除是否继续", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.rem(id);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  },
  filters: {
    time: function(val) {
      var obj = new Date(val);
      // 年
      var year = obj.getFullYear();
      // 月
      var month = (obj.getMonth() + 1).toString().padStart(2, "0");
      // 日
      var day = obj
        .getDate()
        .toString()
        .padStart(2, "0");
      // 时
      var hour = obj
        .getHours()
        .toString()
        .padStart(2, "0");
      // 分
      var minute = obj
        .getMinutes()
        .toString()
        .padStart(2, "0");
      // 秒
      var s = obj
        .getSeconds()
        .toString()
        .padStart(2, "0");
      return (
        year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + s
      );
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
    this.goods();
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
  width: 300px;
  margin-bottom: 20px;
}
</style>
