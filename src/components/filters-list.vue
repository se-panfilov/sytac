<template>
  <section class="column is-one-third">
    <div class="control">
      <div class="select">
        <select-box :source="types" name="types"></select-box>
        <select-box :source="colors" name="colors"></select-box>
        <select-box :source="brands" name="brands"></select-box>
      </div>
    </div>
  </section>
</template>

<script>
  import SelectBox from './select-box'
  
  export default {
    name: 'FiltersList',
    data () {
      return {}
    },
    props: {
      source: {
        type: Array,
        required: true
      }
    },
    methods: {
      getUniq (a) {
        return [...new Set(a)]
      }
    },
    computed: {
      types () {
        return this.getUniq(this.source.map(v => v.type))
      },
      colors () {
        return this.getUniq(this.source.map(v => v.colors))
      },
      brands () {
        return this.getUniq(this.source.map(v => v.brand))
      }
    },
    components: {
      SelectBox
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>

</style>
