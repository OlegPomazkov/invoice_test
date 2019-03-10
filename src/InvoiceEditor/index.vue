<template>
  <div class="editor">

    <div class="editor__body">  
      <input 
        class="editor__body__item"
        v-for="(item, k) in items"
        :key="`${k}_${item.name}`"        
        :placeholder="item.placeholder" 
        v-model="item.value"
        @input="handleInput"
        @change="hanndleChange(item)"/>
    </div>

    <button 
      v-if="!isErrorVisible"
      class="editor__control"
      @click="addNewItem">
        ADD ITEM
    </button>

    <div 
      v-if="isErrorVisible"
      class="editor__alert">
        <span class="editor__alert__messsage">
          {{ errorMessage }}
        </span>
    </div>

  </div>
</template>

<script>
import { INVOICE_CONFIG } from './../utils/constants'

export default {
  data () {
    let config = INVOICE_CONFIG
    let items = []

    config.forEach( i => {
      let itemObj = {}

      itemObj.name = i.name
      itemObj.placeholder = i.placeholder
      itemObj.value = ''
      itemObj.type = i.type
      items.push(itemObj)
    })

    return {
      items: items,
      newGood: {},
      isErrorVisible: false,
      errorMessage: ''
    }
  },
  methods: {
    hanndleChange(item) {
      this.newGood[item.name] = item.value
    },
    addNewItem() {
      if ( !this.validateAdding() ) {
        this.isErrorVisible = true

        return
      }
      this.$emit('itemAdded', Object.assign({}, this.newGood))
      this.newGood = {}
      this.items.forEach( i => {i.value = ''})
    },
    validateAdding() {
      let cond = true

      // Not empty fields validation
      this.items.forEach( i => {
        if (!(i.name in this.newGood) || !this.newGood[i.name]) cond = false
      })
      if (! cond) {
        this.errorMessage = 'Fields could not be empty!'  
        this.isErrorVisible = true

        return cond 
      }
      // Fields type validation
      this.items.forEach( i => {
        switch ( i.type ) {
          case 'text':
            if(!isNaN(+this.newGood[i.name]) || typeof(this.newGood[i.name]) !== 'string') {
              cond = false
              this.errorMessage = `Wrong type for ${i.name}`
            }
            break
          case 'number':
          case 'currency':
            if(isNaN(+this.newGood[i.name]) || typeof(+this.newGood[i.name]) !== 'number') {
              cond = false
              this.errorMessage = `Wrong type for ${i.name}`
            }
            break
        }
      })
      if (!cond) { 
        this.isErrorVisible = true

        return cond
      }

      return cond
    },
    handleInput() {
      this.isErrorVisible = false
      this.errorMessage = ''
    }
  }
}
</script>

<style>
.editor {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}

.editor__body {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content:  flex-start;
  align-items: center;  
}
  
.editor__body__item {
  width: 100%;
  height: 30px;
  padding: 5px;
  margin-bottom: 15px;
  border: none;  
  border-bottom: 1.5px solid #ccc;
  font-size: 14px;
}

.editor__control {
  align-self: flex-start;
  width: 160px;
  height: 38px;
  margin-top: 25px;
  margin-bottom: 10px;
  background-color: #0aa;
  border-width: 0;
  border-radius: 2px;
  font-size: 16px;
  color: #fff;
  cursor: pointer;
}

.editor__alert {
  height: 38px;
  margin-top: 25px;
  margin-bottom: 10px;
  border: 1px solid #f88;
  border-radius: 2px;
  font-size: 16px;
  color: #f88;
  padding-left: 10px;
  padding-right: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
