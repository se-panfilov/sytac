<template>
  <section class="section filter-list">
    <div class="container filter-list__elem">
      <select-box :source="types"
                  name="types"
                  class="filter-list__select-box"
                  label="Types"
                  v-on:item-selected="onSelect($event, 'type')"
      ></select-box>
      <div class="filter-list__items-count">
        <span class="tag is-light is-medium"
              v-text="'x' + (types.length - 1)"></span>
      </div>
    </div>
    <div class="container">
      <select-box :source="brands"
                  name="brands"
                  class="filter-list__select-box"
                  label="Brands"
                  v-on:item-selected="onSelect($event, 'brand')"
      ></select-box>
      <div class="filter-list__items-count">
        <span class="tag is-light is-medium"
              v-text="'x' + (brands.length - 1) "></span>
      </div>
    </div>
    <div class="container">
      <select-box :source="colors"
                  name="colors"
                  class="filter-list__select-box"
                  label="Colors"
                  v-on:item-selected="onSelect($event, 'color')"
      ></select-box>
      <div class="filter-list__items-count">
        <span class="tag is-light is-medium"
              v-text="'x' + (colors.length - 1)"></span>
      </div>
    </div>
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
      getUniq (arr) {
        if (!arr) throw new Error(`getUniq: array is mandatory`)
        return [...new Set(arr)]
      },
      onSelect (event, type) {
        this.filter[type] = event.target.value
        this.$emit('changed', this.filter)
      },
      filterBy (arr, val, field) {
        return arr.filter(v => v[field] === val)
      },
      filterByColors (arr, val) {
        return arr.filter(v => v.colors.indexOf(val) > -1)
      },
      filterColorsBy (arr, val, field) {
        return arr.filter(v => v[field] === val)
      },
      getFilteredArr (arr, field, method = 'filterBy') {
        return (this.filter[field]) ? this[method](arr, this.filter[field], field) : arr
      },
      getFilteredByColorArr () {
        return this.getFilteredArr(this.source, 'color', 'filterByColors')
      }
    },
    computed: {
      types () {
        const result = this.getUniq(this.filteredTypes.map(v => v.type))
        return [''].concat(result)
      },
      brands () {
        const result = this.getUniq(this.filteredBrands.map(v => v.brand))
        return [''].concat(result)
      },
      colors () {
        const arrOfArr = this.filteredColors.map(v => v.colors)
        const mergedArr = [].concat.apply([], arrOfArr)
        const result = this.getUniq(mergedArr)
        return [''].concat(result)
      },
      filteredTypes () {
        const filteredByColorArr = this.getFilteredByColorArr()
        return this.getFilteredArr(filteredByColorArr, 'brand')
      },
      filteredBrands () {
        const filteredByColorArr = this.getFilteredByColorArr()
        return this.getFilteredArr(filteredByColorArr, 'type')
      },
      filteredColors () {
        const filteredByTypeArr = this.getFilteredArr(this.source, 'type', 'filterColorsBy')
        return this.getFilteredArr(filteredByTypeArr, 'brand', 'filterColorsBy')
      }
    },
    components: {
      SelectBox
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .filter-list
    &__select-box
      display inline-block
    &__items-count
      display inline-block
      vertical-align middle
</style>
