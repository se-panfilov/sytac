<template>
  <select :name="name" @change="onSelect">
    <option value="" selected></option>
    <option :value="item" v-for="item in source" v-text="item"></option>
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
      },
      onSelect (val) {
        this.$emit('item-selected', val)
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>

</style>
