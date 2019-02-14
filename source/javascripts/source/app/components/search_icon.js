import store from '../store';

var searchIcon = {
	init() {
		this.initStateListener();
		this.initClickListener();
		this.initHamburger();
	},

	initHamburger: function () {

	    var forEach=function(t,o,r){if("[object Object]"===Object.prototype.toString.call(t))for(var c in t)Object.prototype.hasOwnProperty.call(t,c)&&o.call(r,t[c],c,t);else for(var e=0,l=t.length;l>e;e++)o.call(r,t[e],e,t)};

	    var hamburgers = document.querySelectorAll(".hamburger");
	    if (hamburgers.length > 0) {
	      forEach(hamburgers, function(hamburger) {
	        hamburger.addEventListener("click", function() {
	          this.classList.toggle("is-active");
	        }, false);
	      });
	    }
	},

	initStateListener() {
		store.subscribe(() =>
			this.render(store.getState().navigation)
		)
	},

	initClickListener() {
		$('.search-icon').on('click', (e) => {
			e.preventDefault();
			store.dispatch({type: "TOGGLE_SEARCH"});
		})
	},

	render(state) {
		(state.searchVisible) ? $('.search-icon i').text('clear') : $('.search-icon i').text('search')
	}
}

export default searchIcon;