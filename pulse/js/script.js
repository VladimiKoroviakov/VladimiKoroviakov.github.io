$(document).ready(function(){
    $('.carousel__inner').slick({  
        speed: 1200,
        adaptiveHeight: true,
        prevArrow: '<button type="button" class="slick-prev"><img src="icons/left.png"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="icons/right.png"></button>',
        responsive: [
          {
            breakpoint: 992,
            settings: {
              dots: true,
              arrows: false,
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
        ] 
    });

    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
      $(this)
        .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
        .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
    });

    function toggleSlide(item) {
      $(item).each(function(i) {
        $(this).on('click', function(e) {
          e.preventDefault();
          $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
          $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
        });
      });
    }
    
    toggleSlide('.catalog-item__link');
    toggleSlide('.catalog-item__back');

    // Modal

    $('[data-modal=consultation]').on('click', function() {
      $('.overlay, #consultation').fadeIn('slow');
    });
    $('.modal__close').on('click', function() {
      $('.overlay, #consultation, #thanks, #order').fadeOut('slow');
    });

    $('.button_mini').each(function(i) {
      $(this).on('click', function() {
        $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
        $('.overlay, #order').fadeIn('slow');
      });
    });


    function validateForms(form){
      $(form).validate({
        rules: {
          name: {
            required: true, 
            minlength: 2
          },
          phone: "required",
          email: {
            required: true,
            email: true
          }
        },
        messages: {
          name: {
            required: "Пожалуйста, введите свое имя",
            minlength: jQuery.validator.format("Введите минимум {0} символа")
          },
          phone: "Пожалуйста, введите свой номер телефона",
          email: {
            required: "Пожалуйста, введите свой email",
            email: "Следуйте примеру name@gmail.com"
          }
        }
      });
    }

    validateForms('#consultation-form');
    validateForms('#consultation form');
    validateForms('#order form');

    $('input[name=phone]').mask("+38 (999) 999-99-99");

    $('form').submit(function(e) {
      e.preventDefault();

      if (!$(this).valid()) {
        return;
      }

      $.ajax({
        type: "POST",
        url: "mailer/smart.php",
        data: $(this).serialize()
      }).done(function() {
        $(this).find("input").val("");
        $('#consultation, #order').fadeOut();
        $('.overlay, #thanks').fadeIn('slow'); 


        $('form').trigger('reset');
      });
      return false;
    });

    // Smooth scrolling and pageup 

    $(window).scroll(function(){
      if($(this).scrollTop() > 2000) {
        $('.pageup').fadeIn();
      } else {
        $('.pageup').fadeOut();
      }
    });

    $("a[href=#up]").click(function(){
      const _href = $(this).attr("href");
      $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
      return false;
    });

    new WOW().init();
  });
      
  















// const slider = tns({
//   container: '.carousel__inner',
//   items: 1,
//   slideBy: 'page',
//   autoplay: false,
//   controls: false,
//   nav: false
// });

// document.querySelector('.prev').addEventListener ('click', function () {
//   slider.goTo('prev');
// }); 

// document.querySelector('.next').addEventListener ('click',  function () {
//   slider.goTo('next');
// });










// var name = "Ivan";
// let number = 7;
// const pi = 3.14;

// number = 4;

// let leftBorderWidth = 200;

//number 
//string - "", '',  `` 
//true/false 
//null
//undefined  
// let obj = {
//     name: 'apple',
//     color: 'green',
//     weight: 200
// }
// Symbol

// alert(1234);
// console.log(number);
// let answear = confirm("Вам есть 18?");
// console.log(answear);

// let answear = prompt("Вам есть 18?", "");
// console.log(answear);

// console.log(4 + 'fdds');

// let isChecked = true,
//     isClose = false;

// console.log(isChecked && isClose);

// console.log(isChecked || isClose);

// if (2*4 == 8*1) {
//     console.log('Верно')
// } else {
//     console.log('Ошибка')
// }

// let answear = confirm("Вам есть 18?");
// if (answear) {
//     console.log('Добро пожаловать!')
// } else {
//     console.log('Пожалуйста покиньте сайт')
// }

// const num = 50;

// if (num < 49) {
//     console.log('Неправильно')
// } else if (num > 100) {
//     console.log('Много')
// } else {
//     console.log('Верно')
// }

// for (let i = 1; i < 8; i ++) {
//     console.log(i);
// }

// function logging(a, b) {
//     console.log( a + b );
// }

// logging(3, 5);

// logging(45, 15);