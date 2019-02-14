import store from '../store';

var cartUpdate = {
	init() {
		this.initClickListener();
		this.initStateListener();
		
	},
	
	initStateListener() {
		store.subscribe(() =>
			this.render(store.getState().cart)
		)
	},


	initClickListener() {
		$('#add-to-cart-demo').on('click', function(e) {
			e.preventDefault();
			store.dispatch({type: "INCREMENT_CART"});
		})
	},
	
	render(state) {
		(state.cartQuantity) ? $('#updateCart').removeClass("hide") : $('#updateCart').addClass("hide");
	}
}

export default cartUpdate;