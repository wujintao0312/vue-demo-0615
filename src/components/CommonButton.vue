<template>
  <div class="btn" @click="handleClick"><slot></slot></div>
</template>

<script>
export default {
  methods: {
    handleClick() {
      this.$emit('click')
    }
  }
}
</script>

<style lang="less" scoped>
.btn {
    margin: 40px 16px 10px;
    height: 44px;
    line-height: 44px;
    text-align: center;
    color: #fff;
    font-size: 18px;
    background-color: #d81e06;
    border-radius: 20px;
  }
</style>