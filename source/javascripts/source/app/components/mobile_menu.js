import store from '../store';

var mobileMenu = {
	init() {
		this.initStateListener();
	},

	initStateListener() {
		store.subscribe(() =>
			this.render(store.getState().navigation)
		)
	},

	render(state) {
		(state.menuVisible) ? $('.mobile-menu').addClass("open") : $('.mobile-menu').removeClass("open")
	}
}

export default mobileMenu;