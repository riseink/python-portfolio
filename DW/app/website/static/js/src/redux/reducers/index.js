import { combineReducers } from "redux"

// Import plugin reducers from respective packages
import { navigation } from "../../../../../../src/wagtail-navbar/navbar/static/js/src/navbar.js"
import { violator } from "../../../../../../src/wagtail-overlay/overlay/static/js/src/violator.js"

const rootReducer = combineReducers({
	navigation,
	violator
})
export default rootReducer
