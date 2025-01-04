$(document).ready(function() {
	$('.feedback__slider').slick({  
		speed: 1200,
		adaptiveHeight: true,
		slidesToScroll: 1,
		infinite: true,
		slidesToShow: 1,
		draggable: false,
		prevArrow: '<button type="button" class="slick-prev"><img src="icons/left.png"></button>',
		nextArrow: '<button type="button" class="slick-next"><img src="icons/right.png"></button>',
		responsive: [{
			breakpoint: 992,
			settings: {
			dots: true,
			arrows: false
			}
		}] 
	});
});

document.addEventListener("DOMContentLoaded", function () {
    function activateTab(tabSelector, dotSelector) {
        const tabs = document.querySelector(tabSelector);
        const dots = document.querySelector(dotSelector);

        if (tabs) {
            tabs.addEventListener("click", event => {
                const target = event.target.closest("li:not(.catalog__tab_active)");
                if (!target) return;

                const allTabs = Array.from(tabs.children);
                const tabIndex = allTabs.indexOf(target);
                allTabs.forEach(tab => tab.classList.remove("catalog__tab_active"));
                target.classList.add("catalog__tab_active");

                const container = target.closest(".container");
                const contents = container.querySelectorAll(".catalog__content");
                contents.forEach(content => content.classList.remove("catalog__content_active"));
                contents[tabIndex].classList.add("catalog__content_active");

                if (dots) {
                    const allDots = Array.from(dots.children);
                    allDots.forEach(dot => dot.classList.remove("active-dot"));
                    allDots[tabIndex].classList.add("active-dot");
                }
            });
        }
    }

    function activateDots(dotSelector, tabSelector) {
        const dots = document.querySelector(dotSelector);
        const tabs = document.querySelector(tabSelector);

        if (dots) {
            dots.addEventListener("click", event => {
                const target = event.target.closest("svg");
                if (!target) return;

                const allDots = Array.from(dots.children);
                const dotIndex = allDots.indexOf(target);
                allDots.forEach(dot => dot.classList.remove("active-dot"));
                target.classList.add("active-dot");

                if (tabs) {
                    const allTabs = Array.from(tabs.children);
                    allTabs.forEach(tab => tab.classList.remove("catalog__tab_active"));
                    allTabs[dotIndex].classList.add("catalog__tab_active");

                    const container = tabs.closest(".container");
                    const contents = container.querySelectorAll(".catalog__content");
                    contents.forEach(content => content.classList.remove("catalog__content_active"));
                    contents[dotIndex].classList.add("catalog__content_active");
                }
            });
        }
    }

    activateTab(".catalog__tabs", ".catalog__dots");
    activateTab(".catalog__tabs-4", ".catalog__dots");
    activateDots(".catalog__dots", ".catalog__tabs");
});
