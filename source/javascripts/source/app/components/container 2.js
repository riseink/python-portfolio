
let container = {
	init() {
		this.toggleContainerClass();
	},

	toggleContainerClass() {

        $('.work_container .split_contianer').mouseenter(function(event){
            let _this = event.currentTarget;            
            let sibling = $(this).siblings();
            $(_this).removeClass('wind_this_up wind_down wind_that_up mouseout').addClass('wind_this_up');
            (sibling).removeClass(' wind_that_up wind_down  wind_this_up mouseover').addClass('wind_that_up');
            if ((sibling).hasClass('wind_that_up')){
                setTimeout(function () {
                    (sibling).removeClass('wind_that_up mouseover');
                    (sibling).addClass('mouseout');
     
                 }, 1000);
            }

            if ($(_this).hasClass('wind_this_up')){
                setTimeout(function () {
                    $(_this).removeClass('wind_this_up mouseout');
                    $(_this).addClass('mouseover');
     
                 }, 1000);
            }
           
          

        });

        $('.work_container').mouseout(function(){
            let removeClasses = $(this).find('.split_contianer');
            $(removeClasses).addClass("wind_down").delay(1000).queue(function(){
                $(removeClasses).removeClass('mouseout mouseover wind_that_up wind_this_up');
            });
        });
        
	}
}

export default container;