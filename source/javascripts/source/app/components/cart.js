import {syncLocalStorage} from '../helpers/helpers';

var cart = {
	init() {
		this.bindCartInfo();
	},

	/*
	*	FOR TESTING ONLY
	*/
	initTest() {
		syncLocalStorage();
	}

	getInfo() {
		var storageJSON = localStorage.getItem('mage-cache-storage');
		var storage = JSON.parse(storageJSON);
		return storage.cart;
	}
}

export default cart;