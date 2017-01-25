<template>
  <div class="control">
    <label class="label" :for="name" v-text="label"></label>
    <div class="control has-addons">
      <div class="select is-expanded">
        <select :name="name" id="name" v-model="model" @change="onSelect">
          <!--<option value="" selected></option>-->
          <option :value="item" v-for="item in source" v-text="item"></option>
        </select>
      </div>
      <button type="button" class="button" @click="onReset">x</button>
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
