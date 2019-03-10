export default {
	init() {
		try{
			let allStore =  JSON.parse(localStorage.getItem('goodsStore'))

			if( !allStore ) {
				allStore = {store:[]}
				localStorage.setItem('goodsStore', JSON.stringify(allStore))			
			}

			return allStore
		}
		catch( err ) {
			console.log('Error while store initialized: ', err)

			return false
		}
	},
	getNum(name) {
		try{
			let allStore = this.init()

			if (!allStore) throw new Error( 'Store initialization error ')
			let obj = allStore.store.filter( item => item.name === name )[0]

			return allStore.store.indexOf(obj)
		}
		catch( err ) {
			console.log( err )
		}
	},
	add(obj) {
		try{
			let allStore = this.init()
			let num = this.getNum(obj.name)

			if (num !== -1) {
				allStore.store.splice(num, 1)
			} 
			allStore.store.push(obj)
			localStorage.setItem('goodsStore', JSON.stringify(allStore))
		}
		catch( err ) {
			console.log('Error while add item: ', err)
		}
	},
	update(data) {
		try{	
			let allStore = this.init()
			let num = this.getNum(data.name)
			let newObj = Object.assign({},  allStore.store[num])
			
			allStore.store.splice(num, 1)
			newObj[data.changes.prop] = data.changes.value 
			allStore.store.push(newObj)
			localStorage.setItem('goodsStore', JSON.stringify(allStore))	
		}
		catch( err ) {
			console.log('Error while update  item: ', err)
		}
	},
	delete(obj) {
		try{	
			let allStore = this.init()
			let num = this.getNum(obj.name)

			allStore.store.splice(num, 1)
			localStorage.setItem('goodsStore', JSON.stringify(allStore))
		}
		catch( err ) {
			console.log('Error while delete item ', err)
		}						
	},
	RESTrequest(method, data) {
		try{
			switch(method) {
				case '/add':
					this.add(data)
					break
				case '/update':
					this.update(data)
					break
				case '/delete':
					this.delete(data)
					break
				default: 
					console.log('Unknown backend method!')
			}
			
			return 'success'
		}
		catch( err ) {
			console.log('Error while request locale storage for change:', err)
			throw new Error('On backend request')
		}			
	}
}