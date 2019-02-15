import { createStore, applyMiddleware } from "redux"
import logger from "redux-logger"
import rootReducer from "./reducers"

// Set to true to enable Redux console logging
const REDUX_LOGGER = true

const store = REDUX_LOGGER
	? createStore(rootReducer, applyMiddleware(logger))
	: createStore(rootReducer)

export default store
