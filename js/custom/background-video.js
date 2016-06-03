$(function() {
    var $video = $('.home-vid');
    var $container = $video.find('.iframe-container');
    
    var setupVideoRatio = function() {
        var width = $container.data('width');
        var height = $container.data('height');
        var ratio = width / height;
        var windowWidth = $('#home-top').width(); //$(window).width();
        var windowHeight = $('#home-top').height(); //$(window).height();
        var windowRatio = windowWidth / windowHeight;
        
        var finalWidth = 0;
        var finalHeight = 0;
        
        if (windowRatio < ratio) {
            finalHeight = $video.height();
            finalWidth = finalHeight * ratio;
        }
        else {
            finalWidth = $video.width();
            finalHeight = finalWidth / ratio;
        }
        
        finalWidth = Math.round(finalWidth);
        finalHeight = Math.round(finalHeight);
        
        $container.css(
            {
                'width': finalWidth,
                'height': finalHeight,
                'margin-left': -Math.round(finalWidth / 2),
                'margin-top': -Math.round(finalHeight / 2)
            });
    };
    
    setupVideoRatio();

    var resizeTimeout = -1;
    
    $(window).on('resize', function() {
        clearTimeout(resizeTimeout);
        
        resizeTimeout = setTimeout(function() {
            setupVideoRatio();
        },
        100);
    })
});