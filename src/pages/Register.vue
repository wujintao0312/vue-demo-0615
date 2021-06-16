<template>
  <div class="register">
    <PageHeader>注册</PageHeader>
    <CommonLogo></CommonLogo>
    <CommonInput type="text" placeholder="用户名 / 手机号码" v-model="username" msg="用户名格式错误" :rule="/^\d{3,12}$/" ref="username"></CommonInput>
    <CommonInput type="text" placeholder="昵称" v-model="nickname" msg="用户的昵称必须是3-7位的中文" :rule="/^[\u4e00-\u9fa5]{3,7}$/" ref="nickname"></CommonInput>
    <CommonInput type="password" placeholder="密码" v-model="password" msg="密码格式错误" :rule="/^\d{3,6}$/" ref="password"></CommonInput>
    <CommonButton @click="login">注册</CommonButton>
  </div>
</template>

<script>
export default {  
  data() {
    return {
      username: '',
      nickname: '',
      password: ''
    }
  },
  methods: {
    login() {
      if (!this.$refs.username.validate(this.username)) {
        return
      }
      if (!this.$refs.nickname.validate(this.nickname)) {
        return
      }
      if (!this.$refs.password.validate(this.password)) {
        return
      }
      this.$axios({
        method: 'post',
        url: '/register',
        data: {
          username: this.username,
          nickname: this.nickname,
          password: this.password
        }
      }).then((res) => {
          const {statusCode, message} = res.data
          if (statusCode === 200) {
            this.$toast({
              message: message,
              icon: 'like-o',
            })
            this.$router.push({
              name: 'login',
              params: {
                username: this.username,
                password: this.password
              }
            })
          }
      })
      
    }
  }
}
</script>

<style>

</style>