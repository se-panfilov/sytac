<template>
  <div class="nav has-shadow main-header">
    <div class="container main-header__container">
      <div class="nav-left main-header__brand">
        <span class="nav-item is-brand">Trafficeister</span>
      </div>
      <div class="nav-right">
        <span class="nav-item" v-text="message"></span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'MainHeader',
    data () {
      return {}
    },
    props: {
      message: {
        type: String
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .main-header
    margin-bottom 15px
</style>
