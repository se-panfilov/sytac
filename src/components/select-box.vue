<template>
  <div class="control select-box">
    <label class="label select-box__label" :for="name" v-text="label"></label>
    <div class="control has-addons select-box__ctrl-group">
      <div class="select is-expanded select-box__select-container">
        <select :name="name"
                :id="name"
                class="select-box__select"
                v-model="model"
                @change="onSelect">
          <option :value="item"
                  class="select-box__option"
                  v-for="item in source"
                  v-text="item"></option>
        </select>
      </div>
      <button type="button" :id="name + '-btn'" class="button select-box__button" @click="onReset">x</button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'SelectBox',
    data () {
      return {
        model: null
      }
    },
    props: {
      label: {
        type: String
      },
      name: {
        label: String
      },
      source: {
        type: Array,
        required: true
      }
    },
    methods: {
      onSelect (val) {
        this.$emit('item-selected', val)
      },
      onReset () {
        this.model = null
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>

</style>
