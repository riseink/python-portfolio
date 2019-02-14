import menuIcon from './components/menu_icon';
import updateCart from './components/update_cart';
import mainMenu from './components/main_menu';
import mobileMenu from './components/mobile_menu';
import searchIcon from './components/search_icon';
import searchForm from './components/search_form';
import {onScroll} from './helpers/helpers';
import animation from './components/animation';
import container from './components/container'

/*
*	Initialize components on document ready
*/

$(function() {
	mainMenu.init();
	mobileMenu.init();
	menuIcon.init();
	updateCart.init();	
	searchIcon.init();
	searchForm.init();
	container.init();

	
	$(window).load(function() {

		animation.init();
		$('.navigation-container').removeClass('hide');

	
	});
	
	onScroll(60,
		function() { 
			$('.navigation-container').addClass('fixed-nav');
			$('body').addClass('fixed-nav');
			$('.pencil-nav').addClass('fixed-nav');
			
			
		},
		function() {
			$('.navigation-container').removeClass('fixed-nav');
			$('body').removeClass('fixed-nav');
			$('.pencil-nav').removeClass('fixed-nav');
			
		}
	);
});

