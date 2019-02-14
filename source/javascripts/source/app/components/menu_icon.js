import store from '../store';

var menuIcon = {
	init() {
		this.initStateListener();
		this.initClickListener();
	},

	initStateListener() {
		store.subscribe(() =>
			this.render(store.getState().navigation)
		)
	},

	initClickListener() {
		$('#menu_icon').on('click', (e) => {
			e.preventDefault();
			store.dispatch({type: "TOGGLE_MENU"});
		})
	},

	render(state) {
		var text = (state.menuVisible) ? "close" : "menu"
		$('#menu_icon i').text(text);
	}
}

export default menuIcon;