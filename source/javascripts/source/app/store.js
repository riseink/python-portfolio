import { createStore, combineReducers, applyMiddleware } from 'redux';
import navigation from './reducers/navigation';
import cart from './reducers/cart';
import dataService from './services/dataService';

var reducers = combineReducers({
	navigation,
	cart
})

let store = createStore(reducers,{},applyMiddleware(dataService));

store.subscribe(() =>
  console.log(store.getState())
)

store.dispatch({type: "GET_CART_COUNT"})

export default store