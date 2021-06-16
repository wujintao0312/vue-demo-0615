<template>
  <div class="nav" @click="handleClick">
      <div class="left">{{title}}</div>
      <div class="center">{{content}}</div>
      <div class="right">
        <span class="iconfont iconjiantou1"></span>
      </div>
    </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '',
      require: true
    },
    content: {
      type: String,
      default: ''
    }
  },
  methods: {
    handleClick() {
      this.$emit('click')
    }
  }
}
</script>

<style lang="less" scoped>
.nav {
    margin-left: 16px;
    height: 50px;
    border-bottom: 1px solid #ccc;
    display: flex;
    align-items: center;
    padding-right: 16px;
    .left {
      font-size: 16px;
    }
    .center {
      flex: 1;
      text-align: right;
      color: #666;
      font-size: 13px;
      padding-right: 6px;
    }
    .right {
      font-size: 18px;
      .iconfont {
        color: #999;
      }
    }
  }
</style>