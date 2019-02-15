import styles from "../../css/src/app.scss"

//
// NPM imports
//

// General
import objectFitVideos from "object-fit-videos"
import "fetch-polyfill"
import "intersection-observer"
import device from "current-device"

//
// Component JS Imports
//
import PluginJS from "./components/plugins"
// import ComponentName from "./components/componentname"

/*
 *  Initialize components on document ready
 */
document.addEventListener("DOMContentLoaded", () => {
	// Initialize JS for local components
	// ComponentName.init()

	// Apply polyfills
	objectFitVideos()

	// Initialize JS for Wagtail Foundation plugins
	PluginJS.init()
})
