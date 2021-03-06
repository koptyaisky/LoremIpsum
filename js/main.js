$(document).ready(function() {

    /*
        style select and scroll
     */
    var select_scrollbar;
    $('.js-example-basic-single').select2({
        minimumResultsForSearch: Infinity,
        placeholder: "Выберите тип системы",
    })
        .on('select2:open', function() {
            if($('.select2-dropdown').length > 0) {
                select_scrollbar = Scrollbar.init(document.getElementsByClassName('select2-results')[0], {
                    alwaysShowTracks: true,
                    syncCallbacks: true,
                    continuousScrolling: false,
                    damping: 1
                });
            }
        });
        // .on('select2:close', function() {
        //     if (typeof select_scrollbar !== 'undefined') {
        //         select_scrollbar.destroy();
        //     }
        // });


    /*
        init range slider
     */
    let rangeParent = $('.form-range');
    let rangeValue = rangeParent.data("value");
    let rangeMax   = rangeParent.data('max');
    let rangeMin   = rangeParent.data('min');
    $('.slider-range').slider({
        range: "min",
        value: rangeValue,
        min: rangeMin,
        max: rangeMax,
        slide: function( event, ui ) {
            $("#range-value p").text(ui.value + ' %');
        },
        stop: function( event, ui ) {
            $("#range-value p").text(ui.value + ' %');
        }
    });

    /*
       animation header on scroll
    */
    $(window).scroll(function(){
        var scroll = $(window).scrollTop();
        if  (scroll > 5) {
            $('.header-section').addClass('on-scroll');
        } else {
            $('.header-section').removeClass('on-scroll');
        }
    });

    /*
        scroll to form order
     */
    $('.banner-link-order > a').click(function(e) {
        e.preventDefault();
        let id = $(this).attr('href');
        let top = $(id).offset().top;
        $('body, html').animate({scrollTop: top}, 1500);
    });


    /*
        open/close mobile menu
     */
    $('.burger-btn').click(function() {
        $('.header-block').toggleClass('open-menu');
        if($('.header-block').hasClass('open-menu')) {
            bodyScrollLock.disableBodyScroll(document.querySelector(".header-nav"));
        } else {
            bodyScrollLock.enableBodyScroll(document.querySelector(".header-nav"));
        }
        return false;
    });

    $(document).on('click', '.send-form', function() {
        let type = $('.form-select');
        let email = $('#order-email');
        let name = $('#order-name');
        let regexEmail = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z]{2,4})+$/;
        let error = 0;

        if(type.val() === '') {
            type.parent().addClass('error');
            error = 1;
        } else {
            type.parent().removeClass('error');
        }

        if(email.val() === '' || !email.val().match(regexEmail)) {
            email.parent().addClass('error');
            error = 1;
        } else {
            email.parent().removeClass('error');
        }

        if(name.val() === '') {
            name.parent().addClass('error');
            error = 1;
        } else {
            name.parent().removeClass('error');
        }

        if(error === 0) {
            $('.form-success').addClass('show');
            type.val('');
            email.val('');
            name.val('');
        }
       return false;
    });

});
