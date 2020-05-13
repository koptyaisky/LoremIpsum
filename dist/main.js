/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


$(document).ready(function () {

    /*
        style select and scroll
     */
    var select_scrollbar;
    $('.js-example-basic-single').select2({
        minimumResultsForSearch: Infinity,
        placeholder: "Выберите тип системы"
    }).on('select2:open', function () {
        if ($('.select2-dropdown').length > 0) {
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
    var rangeParent = $('.form-range');
    var rangeValue = rangeParent.data("value");
    var rangeMax = rangeParent.data('max');
    var rangeMin = rangeParent.data('min');
    $('.slider-range').slider({
        range: "min",
        value: rangeValue,
        min: rangeMin,
        max: rangeMax,
        slide: function slide(event, ui) {
            $("#range-value p").text(ui.value + ' %');
        },
        stop: function stop(event, ui) {
            $("#range-value p").text(ui.value + ' %');
        }
    });

    /*
       animation header on scroll
    */
    $(window).scroll(function () {
        var scroll = $(window).scrollTop();
        if (scroll > 5) {
            $('.header-section').addClass('on-scroll');
        } else {
            $('.header-section').removeClass('on-scroll');
        }
    });

    /*
        scroll to form order
     */
    $('.banner-link-order > a').click(function (e) {
        e.preventDefault();
        var id = $(this).attr('href');
        var top = $(id).offset().top;
        $('body, html').animate({ scrollTop: top }, 1500);
    });

    /*
        open/close mobile menu
     */
    $('.burger-btn').click(function () {
        $('.header-block').toggleClass('open-menu');
        if ($('.header-block').hasClass('open-menu')) {
            bodyScrollLock.disableBodyScroll(document.querySelector(".header-nav"));
        } else {
            bodyScrollLock.enableBodyScroll(document.querySelector(".header-nav"));
        }
        return false;
    });

    $(document).on('click', '.send-form', function () {
        var type = $('.form-select');
        var email = $('#order-email');
        var name = $('#order-name');
        var regexEmail = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z]{2,4})+$/;
        var error = 0;

        if (type.val() === '') {
            type.parent().addClass('error');
            error = 1;
        } else {
            type.parent().removeClass('error');
        }

        if (email.val() === '' || !email.val().match(regexEmail)) {
            email.parent().addClass('error');
            error = 1;
        } else {
            email.parent().removeClass('error');
        }

        if (name.val() === '') {
            name.parent().addClass('error');
            error = 1;
        } else {
            name.parent().removeClass('error');
        }

        if (error === 0) {
            $('.form-success').addClass('show');
            type.val('');
            email.val('');
            name.val('');
        }
        return false;
    });
});

/***/ })
/******/ ]);