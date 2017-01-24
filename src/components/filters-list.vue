<template>
  <section class="column is-one-third">
    <div class="control">
      <div>
        <div class="select">
          <select-box :source="types"
                      name="types"
                      v-on:item-selected="onTypeSelect()"
          ></select-box>
        </div>
      </div>
      <div>
        <div class="select">
          <select-box :source="colors"
                      name="colors"
                      v-on:item-selected="onColorSelect()"
          ></select-box>
        </div>
      </div>
      <div>
        <div class="select">
          <select-box :source="brands"
                      name="brands"
                      v-on:item-selected="onBrandSelect()"
          ></select-box>
        </div>
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
      },
      onTypeSelect () {
        console.info('onTypeSelect')
      },
      onColorSelect () {
        console.info('onColorSelect')
      },
      onBrandSelect () {
        console.info('onBrandSelect')
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
