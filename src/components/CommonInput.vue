<template>
  <div class="input-box">
    <input :type="type" :placeholder="placeholder" :value="value" @input="handleInput" :class="[status]">
    <div class="tip" v-show="showError">{{msg}}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      status: ''
    }
  },
  computed: {
    showError() {
      return this.msg && this.status === 'error'
    }

  },
  props: {
    type: {
      type: String,
      default: 'text'
    },
    placeholder: {
      type: String,
      default: '请输入...'
    },
    value: {
      type: String,
      default: ''
    },
    msg: {
      type: String
    },
    rule: {
      type: RegExp
    }
  },
  methods: {
    handleInput(e) {
      const {value} = e.target
      this.$emit('input', value)
      if (!this.msg) {
        return
      }
      this.validate(value)
    },
    validate(value) {
      if (this.rule.test(value)) {
          this.status = 'success'
          return true
      } else {
        this.status = 'error'
        return false
      }
    }
  },
  
}
</script>

<style lang="less" scoped>
.input-box {
  margin: 0 16px;
  height: 56px;
  input {
    height: 40px;
    line-height: 40px;
    width: 100%;
    outline: none;
    border: none;
    border-bottom: 1px solid #ccc;
    font-size: 16px;
  }
  .success {
    border-bottom-color: green;
  }
  .error {
    border-bottom-color: red;
  }
  .tip {
    font-size: 12px;
    color: red;
  }
}
</style>