<template>
  <div>
    <div v-text="selected.type"></div>
    <div v-text="selected.brand"></div>
    <div v-text="selected.color"></div>
  </div>
</template>

<script>
  export default {
    name: 'DetailsView',
    data () {
      return {}
    },
    props: {
      selected: {
        type: Object,
        default: {}
      }
    },
    methods: {}
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>

</style>
