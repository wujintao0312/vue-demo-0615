<template>
  <div class="login">
    <PageHeader>登录</PageHeader>
    <CommonLogo></CommonLogo>
    <CommonInput type="text" placeholder="用户名 / 手机号码" v-model="username" msg="用户名格式错误" :rule="/^\d{3,12}$/" ref="username"></CommonInput>
    <CommonInput type="password" placeholder="密码" v-model="password" msg="密码格式错误" :rule="/^\d{3,6}$/" ref="password"></CommonInput>
    <CommonButton @click="login">登录</CommonButton>
    <div class="register">
      <!-- 没有账号？去<a href="" @click.prevent="goRegist">注册</a> -->
      没有账号？去<router-link class="active" to="/register">注册</router-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    login() {
      if (!this.$refs.username.validate(this.username)) {
        return
      }
      if (!this.$refs.password.validate(this.password)) {
        return
      }
      this.$axios({
        method: 'post',
        url: '/login',
        data: {
          username: this.username,
          password: this.password
        }
      }).then((res) => {
        const {statusCode, message, data} = res.data
        if (statusCode === 200) {
          // toast轻提示
          this.$toast({
            message: message,
            icon: 'like-o',
          });
          // 储存登陆成功拿到的个人信息
          sessionStorage.setItem('token', data.token)
          sessionStorage.setItem('user_id', data.user.id)
          // 跳转到个人中心页面
          this.$router.push('/user')
        } else {
          this.$toast(message)
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    goRegist() {
      this.$router.push('/register')
    }
  },
  created() {
    const {username, password} = this.$route.params
    this.username = username
    this.password = password
  }
}
</script>

<style lang="less" scoped>
.login {
  .register {
    padding-right: 16px;
    text-align: right;
    font-size: 14px;
    .active {
      color: skyblue;
    }
  }
}
</style>