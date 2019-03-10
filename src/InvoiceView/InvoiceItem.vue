<template>
  <div class="item">
    
    <div
      class="item__input"  
      v-for="(i, k) in itemsToSee"
      :key="`${i.prop}__${i.type}_k`">
        <span 
          class="item__input__prefix"
          v-if="i.type === 'currency'">$</span>
        <input 
          class="item__input__input"  
          v-model="i.value"
          @change="handleChange(i)">  
    </div>
        
    <button
      class="item__control"
      @click="handleClick">
        <img src="./../assets/rubbish.svg" alt="Delete" height="15" width="15">
    </button>
  
  </div>
</template>

<script>
import { INVOICE_CONFIG } from './../utils/constants'

export default {
  props:{
    item: {
      type: Object,
      required: true
    }
  },
  data () {
    const config = INVOICE_CONFIG
    const itemsToSee = config.map( i => {
      return {
        prop: i.name, 
        type: i.type,
        value: this.item[i.name]
      }})

    return {
    	itemsToSee: itemsToSee 
    }
  },
  methods: {
    handleChange(changedItem) {
      this.$emit('dataChanged', {
        name: this.item.name,
        changes: changedItem
      })
    },
    handleClick() {
      this.$emit('deleteItem')
    }
  }
}
</script>

<style>
.item{
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
}
.item__input {
  width: 25%;
  height: 25px;
  padding-top: 5px;
  padding-bottom: 5px;
  font-size: 14px;
  color: #555;
}
.item__input__prefix {
  margin-right: -3px;
}
.item__input__input {
  border: none;
  font-size: 14px;
  color: #555;
}
.item__control {
  background-color: #fff;
  border-width: 0;
  cursor: pointer;
}
</style>
