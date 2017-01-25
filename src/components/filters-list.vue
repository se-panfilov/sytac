<template>
  <section class="column is-one-third">
    <select-box :source="types"
                name="types"
                label="Types"
                v-on:item-selected="onSelect($event, 'type')"
    ></select-box>
    <select-box :source="brands"
                name="brands"
                label="Brands"
                v-on:item-selected="onSelect($event, 'brand')"
    ></select-box>
    <select-box :source="colors"
                name="colors"
                label="Colors"
                v-on:item-selected="onSelect($event, 'color')"
    ></select-box>
  </section>
</template>

<script>
  import SelectBox from './select-box'

  export default {
    name: 'FiltersList',
    data () {
      return {
        filter: {
          type: null,
          brand: null,
          color: null
        }
      }
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
      onSelect (event, type) {
        this.filter[type] = event.target.value
      },
      filterBy (arr, val, field) {
        return arr.filter(v => {
//          console.info(`${v} === ${val}`)
//          if (field) return v[field] === val
          return v[field] === val
//          return v === val
        })
      },
      filterColorsBy (arr, val, field) {
        return arr.filter(v => {
//          console.info(field)
//          console.info(v)
          return v[field] === val
        })
      }
    },
    computed: {
      types () {
        return this.getUniq(this.filteredTypes.map(v => v.type))
      },
      colors () {
        const arrOfArr = this.filteredColors.map(v => v.colors)
        const mergedArr = [].concat.apply([], arrOfArr)
        console.info(this.getUniq(mergedArr))
        return this.getUniq(mergedArr)
      },
      brands () {
        return this.getUniq(this.filteredBrands.map(v => v.brand))
//        return this.getUniq(this.source.map(v => v.brand))
      },
      filteredTypes () {
//        return this.filterBy(this.source, this.filter.type, 'type')
//        const filteredByColorArr = (this.filter.color) ? this.filterBy(this.source, this.filter.color, 'color') : this.source
        const filteredByColorArr = this.source
        const result = (this.filter.brand) ? this.filterBy(filteredByColorArr, this.filter.brand, 'brand') : filteredByColorArr
        return result
      },
      filteredColors () {
//        const arrOfArr = this.source.map(v => v.colors)
//        const mergedArr = [].concat.apply([], arrOfArr)
//        return this.filterBy(this.source, this.filter.color, 'color')
        const filteredByTypeArr = (this.filter.type) ? this.filterColorsBy(this.source, this.filter.type, 'type') : this.source
        const result = (this.filter.brand) ? this.filterColorsBy(filteredByTypeArr, this.filter.brand, 'brand') : filteredByTypeArr
        console.info(result)
        return result
      },
      filteredBrands () {
        const filteredByColorArr = (this.filter.color) ? this.filterBy(this.source, this.filter.color, 'color') : this.source
        const result = (this.filter.type) ? this.filterBy(filteredByColorArr, this.filter.type, 'type') : filteredByColorArr
        return result
      }
    },
    components: {
      SelectBox
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>

</style>
