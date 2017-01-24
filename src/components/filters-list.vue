<template>
  <section class="column is-one-third">
    <div class="control">
      <span class="select">
        <select-box :source="types" name="types"></select-box>
      </span>
      <span class="select">
        <select-box :source="colors" name="colors"></select-box>
      </span>
      <span class="select">
        <select-box :source="brands" name="brands"></select-box>
      </span>
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
        const arrOfArr = this.source.map(v => v.colors)
        const merged = [].concat.apply([], arrOfArr)
        return this.getUniq(merged)
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
