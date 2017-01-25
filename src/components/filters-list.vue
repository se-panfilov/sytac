<template>
  <section>
    <select-box :source="types"
                name="types"
                label="Types"
                v-on:item-selected="onSelect($event, 'type')"
    ></select-box>
    <span v-text="types.length"></span>
    <select-box :source="brands"
                name="brands"
                label="Brands"
                v-on:item-selected="onSelect($event, 'brand')"
    ></select-box>
    <span v-text="brands.length"></span>
    <select-box :source="colors"
                name="colors"
                label="Colors"
                v-on:item-selected="onSelect($event, 'color')"
    ></select-box>
    <span v-text="colors.length"></span>
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
        this.$emit('changed', this.filter)
      },
      filterBy (arr, val, field) {
        return arr.filter(v => v[field] === val)
      },
      filterByColors (arr, val) {
        return arr.filter(v => v.colors === val.indexOf(val) > -1)
      },
      filterColorsBy (arr, val, field) {
        return arr.filter(v => v[field] === val)
      },
      getFilteredByColorArr () {
//        return (this.filter.color) ? this.filterByColors(this.source, this.filter.color) : this.source
        return this.getFilteredArr(this.source, 'color', 'filterByColors')
      },
      getColorsFilteredByTypeArr () {
//        return (this.filter.type) ? this.filterColorsBy(this.source, this.filter.type, 'type') : this.source
        return this.getFilteredArr(this.source, 'type', 'filterColorsBy')
      },
      getFilteredArr (arr, field, method = 'filterBy') {
        return (this.filter[field]) ? this[method](arr, this.filter[field], field) : arr
      }
    },
    computed: {
      types () {
        return this.getUniq(this.filteredTypes.map(v => v.type))
      },
      colors () {
        const arrOfArr = this.filteredColors.map(v => v.colors)
        const mergedArr = [].concat.apply([], arrOfArr)
        return this.getUniq(mergedArr)
      },
      brands () {
        return this.getUniq(this.filteredBrands.map(v => v.brand))
      },
      filteredTypes () {
        const filteredByColorArr = this.getFilteredByColorArr()
        const result = this.getFilteredArr(filteredByColorArr, 'brand')
//        console.info(result)
        return result
      },
      filteredColors () {
        const filteredByTypeArr = this.getColorsFilteredByTypeArr()
        const result = this.getFilteredArr(filteredByTypeArr, 'brand', 'filterColorsBy')
//        console.info(result)
        return result
      },
      filteredBrands () {
        const filteredByColorArr = this.getFilteredByColorArr()
        const result = this.getFilteredArr(filteredByColorArr, 'type')
//        console.info(result)
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
