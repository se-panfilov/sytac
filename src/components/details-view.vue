<template>
  <section class="content box details">
    <section class="hero details__elem">
      <div class="subtitle details__item"
           v-text="selected.type"></div>
      <div class="title details__item"
           v-text="selected.brand"></div>
      <div class="subtitle details__item">
        <span class="color-preview"
              :style="'background-color: ' + selected.color"></span>
        <span class="color-text-preview" v-text="selected.color"></span>
      </div>
    </section>
  </section>
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
  .details
    .color-preview
      display inline-block
      height 35px
      width 35px
      border 1px solid transparent
      border-radius 3px
    .color-text-preview
      vertical-align super
      display inline-block
</style>
