/*
 *
 *   NOTE:   This can be done without jQuery, via Intersection Observer.
 *           Commenting out for now, but probably can be removed entirely.
 *
 *   ----------------------------------------------------------------------------
 *
 *   @function onScroll
 *
 *  This function checks the position of the scrollbar and allows functions to be called
 *  depending on the scroll position. 50ms Throttling is applied
 *
 *  @position       scroll positon when you want the callbacks to trigger
 *  @trueCallback   this function will get called whe the scroll bar is greater than postion
 *  @falseCallback  options function gets called if the scroll bar is less than position
 *
 */
// export function onScroll(position, trueCallback, falseCallback = function(){}) {
//  $(window).scroll(throttle((e) =>
//      ($(window).scrollTop() >= position) ? trueCallback.call() : falseCallback.call()
//  , 50)) // Change throttling value if triggers aren't frequent enought or performance is affected
// }

/*
 *
 *   NOTE:   This can be done without jQuery, via addEventListener().
 *           Commenting out for now, but probably can be removed entirely.
 *
 *   ----------------------------------------------------------------------------
 *
 *   @function onTransitionEnd
 *
 *   This function calls a callback method when a specified element finishes its
 *   transition.
 *
 *   @selector   selector of the element to watch
 *   @callback   function that will get called when the transition ends
 *
 */
// export function onTransitionEnd(selector, callback) {
//  $(selector).bind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", callback());
// }

export function throttle(callback, limit) {
    let wait = false
    return function() {
        if (!wait) {
            callback.call()
            wait = true
            setTimeout(function() {
                wait = false
            }, limit)
        }
    }
}
