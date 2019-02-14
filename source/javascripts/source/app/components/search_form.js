import store from '../store';
import {onTransitionEnd} from '../helpers/helpers';

var searchForm = {
	init() {
		this.initStateListener();
	},

	initStateListener() {
		store.subscribe(() =>
			this.render(store.getState().navigation)
		)
	},

	searchFocus() {
		$('.search-box').focus()
	},

	render(state) {
		(state.searchVisible) ? $('.search-form').removeClass('closed') : $('.search-form').addClass('closed');
		(state.searchVisible) ? onTransitionEnd('.search-form', this.searchFocus) : '';
	}
}

export default searchForm;