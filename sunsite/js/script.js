$(document).ready(function() {
	$('.slider').slick({
		arrows:true,
		dots:false,
		slidesToShow:1,
		slidesToScroll:1,
		speed:1000,
	});

	$('.slider2').slick({
		arrows:true,
		dots:false,
		slidesToShow:1,
		slidesToScroll:1,
		speed:1000,
	});

	$('.slider__header').slick({
		arrows:false,
		dots:true,
		slidesToShow:1,
		slidesToScroll:1,
		speed:1000,
	});
	$('.header__burger').click(function(event) {
		$('.header__burger,.header__menu').toggleClass('active');
		$('body').toggleClass('lock');
	});
});