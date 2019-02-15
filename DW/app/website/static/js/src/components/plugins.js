import ViolatorJS from "../../../../../src/wagtail-overlay/overlay/static/js/src/violator.js"
import TabFilterJS from "../../../../../src/wagtail-tabfilter/tabfilter/static/js/src/tabfilter.js"
import VimeoJS from "../../../../../src/wagtail-vimeo/vimeo/static/js/vimeo.js"
import ExpandingVideoJS from "../../../../../src/wagtail-vimeo/vimeo/static/js/expanding_video.js"
import AnimationsJS from "../../../../../src/wagtail-animations/animations/static/js/src/animations.js"
import NavigationJS from "../../../../../src/wagtail-navbar/navbar/static/js/src/navbar.js"
import CarouselJS from "../../../../../src/wagtail-carousel/carousel/static/js/src/carousel.js"
import OverlayJS from "../../../../../src/wagtail-overlay/overlay/static/js/src/overlay.js"

import store from "../redux/store"

const PluginJS = {
	init() {
		// Violator
		ViolatorJS.init(store) // pass the store to those that need it

		// Tab Filters
		TabFilterJS.init()

		// Vimeo Component
		VimeoJS.init()
		ExpandingVideoJS.init()

		// Animations
		AnimationsJS.init()

		// Navigation
		NavigationJS.init(store)

		// Carousels
		CarouselJS.init()

	    // Overlays
	    OverlayJS.init()
	}
}
export default PluginJS
