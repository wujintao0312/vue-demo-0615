<template>
  <div class="header">
      <div class="left" @click="$router.go(-1)">
        <span class="iconfont iconjiantou2"></span>
      </div>
      <div class="center"><slot></slot></div>
      <div class="right"></div>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
.header {
    height: 40px;
    display: flex;
    align-items: center;
    text-align: center;
    border-bottom: 1px solid #ccc;
    .left, .right {
      width: 50px;
    }
    .left {
      .iconfont {
        font-size: 17px;
      }
    }
    .center {
      flex: 1;
      font-size: 16px;
    }
  }
</style>