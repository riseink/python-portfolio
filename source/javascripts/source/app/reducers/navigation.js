var initialState = { menuVisible: false, searchVisible: false, cartCount: 0 }

export default function navigation(state = initialState, action) {
	switch(action.type) {
	case 'TOGGLE_MENU':
		return Object.assign({}, state, { menuVisible: !state.menuVisible, searchVisible: false})
	case 'TOGGLE_SEARCH':
		return Object.assign({}, state, { searchVisible: !state.searchVisible, menuVisible: false })
	case 'GET_CART_COUNT_RECEIVED':
		return Object.assign({}, state, { cartCount: action.count})		
	default:
		return state;
	}
}