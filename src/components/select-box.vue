<template>
  <div class="control">
    <label class="label" :for="name" v-text="label"></label>
    <div class="control is-grouped">
      <div class="control">
        <div class="select">
          <select :name="name" id="name" v-model="model" @change="onSelect">
            <!--<option value="" selected></option>-->
            <option :value="item" v-for="item in source" v-text="item"></option>
          </select>
        </div>
      </div>
      <div class="control">
        <button type="button" class="button" @click="onReset">x</button>
      </div>
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
      getUniq (a) {
        return [...new Set(a)]
      },
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
