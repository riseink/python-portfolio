var initialState = { cartQuantity: false }

export default function updateCart(state = initialState, action) {
	switch(action.type) {
	case 'INCREMENT_CART':
		return Object.assign({}, state, { cartQuantity: !state.cartQuantity })
	default:
		return state;
	}
}