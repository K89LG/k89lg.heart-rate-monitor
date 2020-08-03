$(document).ready(function(){
    $('.carousel__inner').slick({
            infinite: true,
            speed: 1200,
            /* adaptiveHeight: true, */
            prevArrow: '<button type="button" class="slick-prev"><img src="icons/left.svg"></button>' ,
            nextArrow: '<button type="button" class="slick-next"><img src="icons/right.svg"></button>',
            responsive: [
                {
                breakpoint: 992,
                settings: {
                dots: true,
                arrows: false,
                    }
                  },
            ]
    });

    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
      $(this)
        .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
        .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
    });

 /*    $('.catalog-item__link').each(function(i) {
      $(this).on('click', function(e) {
        e.preventDefault();
        $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
        $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
      });
    });

    $('.catalog-item__back').each(function(i) {
      $(this).on('click', function(e) {
        e.preventDefault();
        $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
        $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
      });
    });    ЭТО ПЕРВЫЙ СПОСОБ ПЕРЕКЛЮЧЕНИЯ С КНОПКИ ПОДРОБНЕЕ НА КНОПКУ НАЗАД */

    function toggleSlide (item) {
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
    //А ЭТО БЫЛ ВТОРОЙ СПОСОБ


    //Modal:

    $('[data-modal=consultation]').on('click', function() {
      $('.overlay, #consultation').fadeIn('slow');
    });

    $('.modal__close').on('click', function(){
      $('.overlay, #consultation, #order, #thanks').fadeOut('fast');
    });

    //функция для того,чтобы в карточке заказа было имя нужного пульсометроа
    $('.button_mini').each(function(i){
      $(this).on('click', function(){
        $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
        $('.overlay, #order').fadeIn('slow');
      });
    });

    function valideForms(form){  /* работает при помощи подключаемого файла jquery-validate но работает только для первой найденной формы*/
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
          name:{
            required: "Пожалуйста, введите свое имя",
            minlength: jQuery.validator.format("Введите {0} символа!")
          },
          phone: "Пожалуйста, введите свой номер телефон",
          email: {
            required: "Пожалуйста, введите свою почту",
            email: "Неправильно введен адрес почты"
          }
        }
      });
    }

    valideForms('#consultation-form');
    valideForms('#consultation form');
    valideForms('#order form');

    $('input[name=phone]').mask("+7 (999) 999-99-99");

    $('form').submit(function(e) {
      e.preventDefault(); /* - отключает перезагрузку страницы при нажатии на кнопку отправить */
      $.ajax({
        type: "POST", /* - я хочу отдать данные серверу(отправить письмо на почту) */
        url:"mailer/smart.php", /* - обработчик этого события */
        data:$(this).serialize()  /* -данные,которые я хочу отправить на сервер(в данном случае с какими данными работаем,те и отправляем) */
      }).done(function() {
        $(this).find("input").val(""); /* - после отправки формы мы очистим все инпуты */
        $('#consultation, #order').fadeOut();
        $('.overlay, #thanks').fadeIn('slow');


        $('form').trigger('reset'); /* - все формы должны обновиться */
        });
        return false;
    });

    //smooth scroll and page up

    $(window).scroll(function() {
      if ($(this).scrollTop() > 1600) {
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
  