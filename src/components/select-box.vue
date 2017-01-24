<template>
  <select :name="name">
    <option value="11">11</option>
  </select>
</template>

<script>
  export default {
    name: 'FiltersList',
    data () {
      return {}
    },
    props: {
      name: {
        type: String
      },
      source: {
        type: Array,
        required: true
      }
    },
    methods: {
      getUniq (a) {
        return [...new Set(a)]
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>

</style>
