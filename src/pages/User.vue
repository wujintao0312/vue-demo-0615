<template>
  <div class="user">
    <PageHeader>个人中心</PageHeader>
    <div class="info" @click="$router.push('/edit')">
      <div class="left">
        <img :src="$axios.defaults.baseURL + info.head_img" alt="">
      </div>
      <div class="center">
        <div class="nickname">
          <span v-if="info.gender === 1" class="iconfont iconxingbienan boy"></span>
          <span v-else class="iconfont iconxingbienv girl"></span>
          <span class="name">{{info.nickname}}</span>
        </div>
        <div class="date">{{info.create_date | date}}</div>
      </div>
      <div class="right">
        <span class="iconfont iconjiantou1"></span>
      </div>
    </div>
    <CommonNav title="我的关注" content="关注的用户"></CommonNav>
    <CommonNav title="我的收藏" content="跟帖/回复"></CommonNav>
    <CommonNav title="设置" content="文章/视频" @click="$router.push('/edit')"></CommonNav>
    <CommonNav title="退出" @click="logout"></CommonNav>
  </div>
  
</template>

<script>
export default {
  data() {
    return {
      info: {
        nickname: '',
        create_date: '',
        gender: ''
      }
    }
  },
  created() {
    const token = sessionStorage.getItem('token')
    const user_id = sessionStorage.getItem('user_id')
    this.$axios({
      method: 'get',
      url: `/user/${user_id}`,
      headers: {
        Authorization: token
      }
    }).then((res) => {
      const {statusCode, message, data} = res.data
      if (statusCode === 200) {
        this.info = data
      }
    })
  },
  methods: {
    async logout() {
      console.log('退出')
      // 给一个dialog对话框
      // 确定时清除sessionStorage中储存的token、user_id信息，跳回登录页面
      try {
        await this.$dialog.confirm({title: '温馨提示', message: '你确定要退出本系统吗'})
        sessionStorage.removeItem('token')
        sessionStorage.removeItem('user_id')
        this.$router.push('/login')
        this.$toast.success('退出成功')
      } catch {
        this.$toast('取消操作')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.user {
  .info {
    border-bottom: 2px solid #ccc;
    padding: 30px 16px;
    display: flex;
    align-items: center;
    .center {
      flex: 1;
      padding-left: 12px;
      font-size: 14px;
      .date {
        color: #999;
        line-height: 26px;
      }
      .nickname {
        .name {
          margin-left: 4px;
        }
        .boy {
          color: blue
        }
        .girl {
          color: red;
        }
      }
    }
    .left {
      img {
        display: block;
        width: 70px;
        height: 70px;
        border-radius: 35px;
      }
    }
    .right {
      .iconfont {
        font-size: 20px;
        color: #999;
      }
    }
  }
  
}
</style>