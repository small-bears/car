(function ($) {
    "use strict"; // Start of use strict
    $('#sidebarCollapse').on('click', function () {
        $('#sidebar').toggleClass('active');
        $(this).toggleClass("ti-control-skip-backward ti-control-skip-forward");
    });
    /*Loader Javascript
    -------------------*/
    var window_var = $(window);
    window_var.on('load', function () {
        $(".loading").fadeOut("fast");
    });
    // scroll to top
    $(window).on('scroll',function () {
        if ($(this).scrollTop() > 50) {
            $('#back-to-top').fadeIn();
        } else {
            $('#back-to-top').fadeOut();
        }
    });
    // scroll body to 0px on click
    $('#back-to-top').on('click', function () {
        $('body,html').animate({
            scrollTop: 0
        }, 800);
        return false;
    });
    // scroll to top End

    // theme color change
    var theme_settings = $(".theme-settings").find(".theme-color");
    theme_settings.on('click', function () {
        var val = $(this).attr('data-color');
        $('#style_theme').attr('href', 'css/' + val + '.css');
        $(".logo-change").attr('src', 'img/logo-' + val + '.png');

        theme_settings.removeClass('theme-active');
        theme_settings.addClass('theme-active');
        return false;
    });
    $(".theme-click").on('click', function () {
        $("#switcher").toggleClass("active");
        return false;
    });
    // theme color change End

    // fullscreen function
    $(".fullscreen").on('click', function () {
        if (document.webkitCurrentFullScreenElement == null) {
            document.documentElement.webkitRequestFullScreen();
        } else {
            document.webkitCancelFullScreen();
        }
    });
    // fullscreen function End
})(jQuery);
