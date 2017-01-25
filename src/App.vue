<template>
  <div id="app">
    <main-header class="header"></main-header>
    <div class="container">
      <div class="columns">
        <section class="column is-one-third">
          <transition name="in-out-translate-fade" mode="out-in" appear>
            <filters-list :source="vehicleData" v-on:changed="onChanged"></filters-list>
          </transition>
        </section>
        <section class="column">
          <details-view :selected="selected"></details-view>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
  import 'bulma/css/bulma.css'
  import MainHeader from './components/main-header'
  import FiltersList from './components/filters-list'
  import DetailsView from './components/details-view'
  import VehicleData from './data/traffic_meister'

  export default {
    name: 'app',
    data () {
      return {
        selected: {},
        vehicleData: []
      }
    },
    mounted () {
      this.loadData()
    },
    methods: {
      onChanged (val) {
        console.info(val)
        this.selected = val
      },
      loadData () {
        return this.getSourceData().then(this.onDataSuccess, this.onDataError)
      },
      getSourceData () {
        return new Promise((resolve, reject) => {
          VehicleData.fetchData((err, data) => {
            if (err) return reject(err)
            return resolve(data)
          })
        })
      },
      onDataError (err) {
        // TODO (S.Panfilov) show error
        console.error(err)
        setTimeout(() => this.loadData(), 3000)
      },
      onDataSuccess (data) {
        this.vehicleData = data
//        this.data.vehicleData = []
      }
    },
    components: {
      FiltersList,
      MainHeader,
      DetailsView
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .header
    display block

  .row
    display flex
    flex-direction row
    flex-wrap nowrap
    justify-content space-around
    padding 15px
    background #FFF
    .menu
      flex 0 0 150px
    .list
      flex-grow 2
      flex-shrink 1

  .in-out-translate-fade-enter-active, .in-out-translate-fade-leave-active
    transition all 0.5s

  .in-out-translate-fade-enter, .in-out-translate-fade-leave-active
    opacity 0

  .in-out-translate-fade-enter
    transform translateX(31px)

  .in-out-translate-fade-leave-active
    transform translateX(-31px)

</style>

<style lang="stylus" rel="stylesheet/stylus">
  html, body
    margin 0
    padding 0
    height 100%

  body
    background-color #FFF
    color #3c3c3c
    font-family 'Roboto', sans-serif
    font-weight 500
    font-size 16px
    *
      font-family 'Roboto', sans-serif
      font-weight 500

  //#app
  //padding-left 15px
  //padding-right 15px

  input[type="search"]
    -moz-appearance textfield
    -webkit-appearance textfield
    appearance textfield
    -webkit-box-sizing border-box
    -moz-box-sizing border-box
    box-sizing border-box

  article, aside, details, figcaption, figure,
  footer, header, menu, nav, section, canvas
    display block

</style>
