<template>
  <div class="login-container">
    <div class="login-box">
      <div class="avatar-box">
        <img src="../assets/logo.png" alt />
      </div>
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item prop="username">
          <el-input v-model="ruleForm.username" prefix-icon="el-icon-user"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" v-model="ruleForm.password" prefix-icon="el-icon-lock"></el-input>
        </el-form-item>
        <el-form-item style="float:right">
          <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { ajaxlogin } from "../http/api";
export default {
  // 组件名称
  name: "Login",
  // 组件参数 接收来自父组件的数据
  props: [],
  // 局部注册的组件
  components: {},
  // 组件状态值
  data() {
    return {
      ruleForm: {
        username:'admin',
        password:'123456'
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 18, message: "长度在 3 到 18 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 3, max: 18, message: "长度在 3 到 18 个字符", trigger: "blur" }
        ],
      }
    };
  },
  // 计算属性
  computed: {},
  // 侦听器
  watch: {},
  // 组件方法
  methods: {
    submitForm(formName) {
         this.$refs[formName].validate((valid) => {
          if (valid) {
            // alert('submit!');
             this.login()
          } else {
            console.log('error submit!!');
            return false;
          }
        });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    async login(){
        let {data} = await ajaxlogin('login',this.ruleForm)
        console.log(data)
        if(data.meta.status == '200'){
          sessionStorage.setItem('token',data.data.token)
          this.$message({
              type:'success',
              message:'登录成功'
          })
          this.$router.push('/index')
          // location.reload()
      }else{
          this.$message({
              type:'error',
              message:data.meta.msg
          })
      }
    },
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
.login-container {
  background-color: #2b4b6b;
  height: 100%;
}
.login-container .login-box {
  background-color: #fff;
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0 0 10px #ddd;
  width: 450px;
  height: 304px;
  border-radius: 3px;
  top: 50%;
}
.login-container .login-box .avatar-box {
  width: 130px;
  height: 130px;
  padding: 10px;
  border: 1px solid #efefef;
  border-radius: 50%;
  background-color: #fff;
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0 0 10px #ddd;
}
.login-container .login-box .avatar-box img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: #efefef;
}
.el-form {
  position: absolute;
  bottom: 0;
  left: -60px;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}
.el-input{
    width: 350px;
}
</style>
