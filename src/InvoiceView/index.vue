<template>
  <div class="view">
   
    <div class="view__title">
      <div
        v-for="(item, k) in invoiceConfig"
        class="view__title__item"
        :key="k">
          {{item.label}}        
      </div>      
    </div>
   
    <invoice-item 
      class="view__body_item"
      v-for="(item, k) in goods"
      :item="item"
      :key="`${item.name}_${item.amount}_${item.price}_${k}`"
      @dataChanged="handleDataChanged"
      @deleteItem="handleDeleteItem(k)"/>
   
    <div class="view__result">
      {{`Summary: $${currentResult}`}}
    </div>
  
  </div>
</template>

<script>
import InvoiceItem from './InvoiceItem'
import { INVOICE_CONFIG } from './../utils/constants'

export default {
  components: {
    InvoiceItem
  },
  props: {
    goods: {
      type: Array,
      required: true,
      default: () => []
    }
  },
  data () {
    const config = INVOICE_CONFIG

    return {
      invoiceConfig: config
    }
  },
  computed: {
    currentResult() {
      return this.goods.reduce((sum, i) => sum + (+i.price) * (+i.amount), 0)
    }
  },
  methods: {
    handleDataChanged(ev) {
      this.$emit('dataChanged', ev)
    },
    handleDeleteItem(k) {
      this.$emit('deleteItem', k)
    }
  }
}
</script>

<style>
.view {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: space-between;
}
.view__title{
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-bottom: 8px;
  border-bottom: 0.8px solid #ccc;
}
.view__title__item {
  width: 25%;
  font-weight: bold;
}
.view__result {
  padding-top: 10px;
  padding-bottom: 10px;
  font-size: 18px;
  color: #999; 
}
</style>
