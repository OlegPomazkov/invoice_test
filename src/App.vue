<template>
  <div id="app"
    class="invoice">
    <invoice-editor
      class="invoice__editor"
      @itemAdded="handleItemAdded"/>
    <invoice-view
      v-if="goods.length > 0"
      class="invoice__view"
      :goods="goods"
      @dataChanged="handleDataChanged"
      @deleteItem="handleDeleteItem"/>
  </div>
</template>

<script>
import InvoiceEditor from './InvoiceEditor'
import InvoiceView from './InvoiceView'
import backend from './utils/backend'

export default {
  name: 'app',
  components: {
    InvoiceEditor,
    InvoiceView
  },
  data () {
    return {
      goods: []
    }
  },
  methods: {
    handleItemAdded(ev) {
      try{
        const resp = backend.RESTrequest('/add', ev)
        const goodToUpdate = this.goods.filter(i => i.name === ev.name)[0]
        
        if (goodToUpdate) {
          let num = this.goods.indexOf(goodToUpdate)

          this.goods.splice(num, 1)
        } 
        this.goods.push(ev)   
      }
      catch(err) {
        console.log('On ADD from UI:', err)
      }
    },
    handleDataChanged(ev) {
      try{
        const resp = backend.RESTrequest('/update', ev)

        let changedGood = this.goods.filter(i => i.name === ev.name)[0]
        changedGood[ev.changes.prop] = ev.changes.value
      }
      catch(err) {
        console.log('On CHANGE from UI:', err)
      }
    },
    handleDeleteItem(k) {
      try{
        const resp = backend.RESTrequest('/delete', this.goods[k])

        this.goods.splice(k,1)
      }
      catch(err) {
        console.log('On DELETE from UI:', err)
      }
    }
  }
}
</script>

<style>
.invoice {
  width: 80%;
  max-width: 1000px;
  min-width: 800px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 15px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 10px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.3);
  font-family: Geneva, Arial, Helvetica, sans-serif;
}
.invoice__editor,
.invoice__view {
  width: 100%;
  margin: 10px;
}
</style>
