export function syncLocalStorage() {
	$.getJSON("/mocks/localStorage.json", (json) => {
		localStorage.setItem('mage-cache-storage', JSON.stringify(json));
	})
}

/*
*	@function onScroll
*
*	This function checks the position of the scrollbar and allows functions to be called
*	depending on the scroll position. 50ms Throttling is applied
*	
*	@position 		scroll positon when you want the callbacks to trigger
*	@trueCallback	this function will get called whe the scroll bar is greater than postion
*	@falseCallback	options function gets called if the scroll bar is less than position
*
*/
export function onScroll(position, trueCallback, falseCallback = function(){}) {
	$(window).scroll(throttle((e) =>
		($(window).scrollTop() >= position) ? trueCallback.call() : falseCallback.call()
	, 50)) // Change throttling value if triggers aren't frequent enought or performance is affected
}

export function onTransitionEnd(selector, callback) {
	$(selector).bind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", callback());
}


function throttle (callback, limit) {
    var wait = false;
    return function () {               
        if (!wait) {                   
            callback.call();           
            wait = true;               
            setTimeout(function () {   
                wait = false;          
            }, limit);
        }
    }
}