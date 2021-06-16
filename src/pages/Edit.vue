<template>
  <div class="edit">
    <PageHeader>编辑资料</PageHeader>
    <!-- 头像、编辑头像 -->
    <div class="avatar">
      <img :src="$axios.defaults.baseURL + info.head_img" alt="">
      <van-uploader class="uploader" :after-read="afterRead"/>
    </div>
    <!-- nav导航栏 -->
    <CommonNav title="昵称" :content="info.nickname" @click="goNickName"></CommonNav>
    <CommonNav title="密码" :content="info.password | password" @click="goPassword"></CommonNav>
    <CommonNav title="性别" :content="info.gender === 1 ? '男' : '女'" @click="goGender"></CommonNav>
    <!-- 修改昵称 -->
    <van-dialog v-model="show" title="修改昵称" show-cancel-button @confirm='editNickName'>
      <van-field placeholder="请输入用户昵称" v-model="nickname"/>
    </van-dialog>
    <!-- 修改密码 -->
    <van-dialog v-model="show1" title="修改密码" show-cancel-button @confirm='editPassword'>
      <van-field placeholder="请输入密码" v-model="password"/>
    </van-dialog>
    <!-- 修改性别 -->
    <van-dialog v-model="show2" title="修改性别" show-cancel-button @confirm='editGender'>
      <van-radio-group v-model="gender">
        <van-cell-group>
          <van-cell title="男" clickable @click="gender = 1">
            <van-radio slot="right-icon" :name="1" />
          </van-cell>
          <van-cell title="女" clickable @click="gender = 0">
            <van-radio slot="right-icon" :name="0" />
          </van-cell>
        </van-cell-group>
      </van-radio-group>
    </van-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      info: {
        nickname: '',
        password: '',
        gender: ''
      },
      show: false,
      nickname: '',
      show1: false,
      password: '',
      show2: false,
      gender: ''
    }
  },
  filters: {
    // 对密码进行处理
    password(input) {
      if (input) {
        return input.replace(/./g, '*')
      } else {
        return ''
      }
    }
  },
  created() {
    this.getUserInfo()
  },
  methods: {
    // 用户信息
    async getUserInfo() {
      const token = sessionStorage.getItem('token')
      const user_id = sessionStorage.getItem('user_id')
      const res = await this.$axios({
        method: 'get',
        url: `/user/${user_id}`,
        headers: {
          Authorization: token
        }
      })
      const {statusCode, data} = res.data
      if (statusCode === 200) {
        this.info = data
      }
    },
    // 编辑用户资料，提取公共代码
    async edituser(data) {
      const user_id = sessionStorage.getItem('user_id')
      const res = await this.$axios({
        method: 'post',
        url: `/user_update/${user_id}`,
        data
      })
      const {statusCode} = res.data
      if (statusCode === 200) {
        this.getUserInfo()
      }
    },
    // 控制修改昵称弹框
    goNickName() {
      this.show = true
      this.nickname = this.info.nickname
    },
    // 修改昵称，弹框确定按钮对应方法
    editNickName() {
      this.edituser({nickname: this.nickname})
    },
    goPassword() {
      this.show1 = true,
      this.password = this.info.password
    },
    editPassword() {
      this.edituser({password: this.password})
    },
    goGender() {
      this.show2 = true
      this.gender = this.info.gender
    },
    editGender() {
      this.edituser({gender: this.gender})
    },
    // 上传图片组件对应回调函数
    afterRead(file) {
      // 异步上传需要FormData对象
      const fd = new FormData()
      fd.append('file', file.file)
      console.log(fd)
      this.$axios({
        method: 'post',
        url: '/upload',
        data: fd,
        headers: {
          Authorization: localStorage.getItem('token')
        }
      }).then((res) => {
        // 异步上传，拿到服务器端成功存储之后图片地址
        const { statusCode, data } = res.data
        if (statusCode === 200) {
          this.edituser({head_img: data.url})
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.edit {
  .avatar {
    margin: 40px 0;
    position: relative;
    img {
      display: block;
      width: 80px;
      height: 80px;
      margin: 0px auto;
      border-radius: 40px;
    }
    .uploader {
      position: absolute;
      top: 0;
      left: 50%;
      transform: translateX(-50%);
      opacity: 0;
    }
  }
}
</style>