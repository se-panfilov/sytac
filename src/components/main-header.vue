<template>
  <div class="container">
    <div class="nav">
      <div class="nav-left">
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

</style>
