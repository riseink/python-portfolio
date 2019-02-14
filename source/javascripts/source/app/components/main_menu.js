import store from '../store';

var mainMenu = {
	init() {
		this.initStateListener();
	},

	initStateListener() {
		store.subscribe(() =>
			this.render(store.getState().navigation)
		)
	},

	render(state) {
		(state.menuVisible) ? $('#main_menu').removeClass("hide") : $('#main_menu').addClass("hide");
	}
}

export default mainMenu;