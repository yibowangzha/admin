<template>
  <div class="box">
    <el-container>
      <el-header>
        电商后台管理
        <el-button type="danger" @click="goout()">退出登录</el-button>
      </el-header>
      <el-container>
        <el-aside :width="isCollapse?'64px':'200px'">
          <p @click="isCollapse=!isCollapse">
            <span>|||</span>
          </p>
          <el-menu
           :default-active='activepath'
            active-text-color='#409EFF'
            background-color='#373d41' 
            text-color='#ffffff'
            :collapse-transition="false"
            :unique-opened="flag"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            :collapse="isCollapse"
            router
          >
            <el-submenu :index="'/'+item.path" v-for="(item,index) in arr" :key="index">
              <template slot="title">
                <i :class="iconobj[index]"></i>
                <span slot="title">{{item.authName}}</span>
              </template>
              <el-menu-item-group v-for="(i,k) in item.children" :key="k">
                <el-menu-item @click="sevepath(`/index/${i.path}`)" :index="`/index/${i.path}`">
                  <i class="el-icon-menu"></i>
                  {{i.authName}}
                </el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { ajaxmenus } from "../http/api";
export default {
  // 组件名称
  name: "Index",
  // 组件参数 接收来自父组件的数据
  props: [],
  // 局部注册的组件
  components: {},
  // 组件状态值
  data() {
    return {
      isCollapse: false,
      arr: [],
      flag: true,
      iconobj: [
        "el-icon-user-solid",
        "el-icon-s-unfold",
        "el-icon-menu",
        "el-icon-s-order",
        "el-icon-s-marketing"
      ],
      activepath:''
    };
  },
  // 计算属性
  computed: {},
  // 侦听器
  watch: {
    $route(to,from){
        console.log(to,from)
        sessionStorage.setItem('topath',to.path)
        this.activepath = to.path
    }
  },
  // 组件方法
  methods: {
    // 退出登录
    goout() {
      this.$confirm("您确定要退出登录", "提示", {
        confirmButtonText: "确定",
        // cancelButtonText: '取消',
        type: "warning"
      }).then(() => {
        sessionStorage.removeItem("token");
        this.$router.push("/login");
        this.$message({
          type: "success",
          message: "退出成功!"
        });
      });
    },
    // 左侧菜单
    async menus() {
      let { data } = await ajaxmenus("menus");
      this.arr = data.data;
      console.log(this.arr);
    },
    handleOpen(key, keyPath) {
      
    },
    handleClose(key, keyPath) {
      
    },
    // 路由跳转
    sevepath(path){
      console.log(path);
      sessionStorage.setItem('path',path)
      this.activepath = path
      // this.$router.push( path);
    }
  },
  /**
   * 组件实例创建完成，属性已绑定，但DOM还未生成，$ el属性还不存在
   */
  created() {
    let path  = sessionStorage.getItem('path')
    this.activepath = path
  },
  /**
 /**
 * el 被新创建的 vm.$ el 替换，并挂载到实例上去之后调用该钩子。
 * 如果 root 实例挂载了一个文档内元素，当 mounted 被调用时 vm.$ el 也在文档内。
 */
  mounted() {
    this.menus();
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
.el-menu-vertical-demo{
  width: 200px;
  min-height: 400px;
   background-color: #373d41;
}
.el-radio-group {
  width: 100%;
  height: 20px;
}
.el-radio-button {
  width: 100%;
}
.box {
  height: 100%;
}
.el-container {
  height: 100%;
}
.el-header {
  width: 100%;
  height: 60px;
  background: #373d41;
  color: white;
  font-weight: bold;
  font-size: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .el-button {
    height: 40px;
  }
}
.el-aside {
  height: 100%;
  background: #373d41;
  p {
    color: white;
    text-align: center;
    background:  #4a5064;
  }
}
</style>
