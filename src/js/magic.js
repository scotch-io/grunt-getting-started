$(document).ready(function() {

    // =========================================================================
    // SEARCH BAR IN HEADER ====================================================
    // =========================================================================
    $('#search-button').click(function() {
        // get the width of header
        var hwidth  = $('#top-nav').width();  
        console.log(hwidth);

        // set the height and width for input
        $('#search-form').width(hwidth + 'px');

        // show input and focus on it
        $('#search-form').fadeIn(200);
        $('#search-form input').focus();
        $(this).fadeOut(200);

        return false;
    });

    // header click out of giant search
    $('#search-form input').blur(function() {
        $('#search-form').fadeOut(200);
        $('#search-button').fadeIn(200);
    });

    // Mobile Search
    $('#mobile-search').click(function() {
        $('.mobile-tagline').fadeOut(150);
        $('#mobile-search form input').focus();
        return false;
    });
    $('#mobile-search form input').blur(function() {
        $('#mobile-search form input').val('');
        $('.mobile-tagline').fadeIn(150);
    });

    // =========================================================================
    // SIDEBAR HEIGHT ==========================================================
    // =========================================================================
    var fullHeight = $('#sidebar-secondary').height();
    $('#sidebar-primary').css('min-height', fullHeight);

    // =========================================================================
    // CONSOLE COOL ============================================================
    // =========================================================================
    if (!$('body').hasClass('single')) {
        console.log("%cWelcome to Scotch", "color: #EFEFEF; font-size: large; text-transform: uppercase; background: #222; padding: 2px 90px; border-radius: 5px;");
        console.image("/wp-content/themes/scotch-twentyfive/img/chicken-spin.gif");
    }

    // =========================================================================
    // SINGLE PAGE SOCIAL ======================================================
    // =========================================================================
    $(window).scroll(function() {
        var offset = $(window).scrollTop();
        offset     = offset * 10;

        $('.share-links li a span').css({
            '-moz-transform': 'rotate(' + offset + 'deg)',
            '-webkit-transform': 'rotate(' + offset + 'deg)',
            '-o-transform': 'rotate(' + offset + 'deg)',
            '-ms-transform': 'rotate(' + offset + 'deg)',
            'transform': 'rotate(' + offset + 'deg)',
        });
    });

    // =========================================================================
    // HEADINGS LINKS ==========================================================
    // =========================================================================
    if ($('body').hasClass('single'))
        addAnchors();

    // =========================================================================
    // SOCIAL NUMBERS COUNT ====================================================
    // =========================================================================
    $('.social-number').each(function() {
        var number = parseInt($(this).html(), 10);

        $(this).data('count', parseInt($(this).html(), 10));
        $(this).html('0');
        if (number != 0)
            count($(this));
    });

    // =========================================================================
    // Page Specific Custom ====================================================
    // =========================================================================
    if ($('#emoji-table').length > 0) {
        $.ajax({
            url         : 'https://api.github.com/emojis?callback=callback',
            type        : 'GET',
            dataType    : 'jsonp',
            success     : function(data) {
                $.each(data.data, function( index, value ) {
                    $('#emoji-table tbody').append('<tr><td><span class="text-danger">:'+index+':</span></td><td><img src="'+value+'"></td></tr>')
                });
            },
            error       : function(data) {
                console.log(data);
            }
        });
    }
    if ($('.fixed-width-site img').length > 0) {
        $(".fixed-width-site img").hover(
           function() {
                $(this).attr('data-old', $(this).attr('src'));
                $(this).attr('src', $(this).data('swapper'));
           },
           function() {
              $(this).attr('src', $(this).data('old'));
           }
        ) 
    }
    if ($('body').hasClass('category')) {
        $('#pagination-links a').click(function() {
            var href = $(this).attr('href');
            
            href = href.replace('category/', '');

            href = href.replace('.io/', '.io/category/');
            href = href.replace('.local/', '.local/category/'); // ghetto rules!


            window.location.href = href;

            return false;
        });
    }


    // Tutorials Nav
    $('#tutorials-nav a, #tutorials-sub-nav.sub-menu ').hover(function() {
        $('body').addClass('show-sub-nav');
    }, function() {
        $('body').removeClass('show-sub-nav');
    });


    $('.toggle-mobile').click(function() {
        $('body').toggleClass('show-mobile-nav');
        return false;
    });


    // Full screen videos
    $('video').click(function() {
        var video = $(this).get(0);

        if (video.requestFullscreen) {
            video.requestFullscreen();
        } else if (video.msRequestFullscreen) {
            video.msRequestFullscreen();
        } else if (video.mozRequestFullScreen) {
            video.mozRequestFullScreen();
        } else if (video.webkitRequestFullscreen) {
            video.webkitRequestFullscreen();
        }
    });
    $('video').hover(function(){
        $(this).get(0).play();
    }, function(){
        $(this).get(0).pause();
    });

    // Toggle reader mode
    $('.toggle-reader-mode').click(function() {
        $('body').toggleClass('content-reader-mode');
        return false;
    });

    // Reader mode
    if (window.location.hash && $('body').hasClass('single')) {
        if (window.location.hash == '#reader-mode') {
            $('body').addClass('content-reader-mode');
        }
    }
    $(document).keyup(function(e) {
        if (e.keyCode == 27) {
            if ($('body').hasClass('content-reader-mode')) {
                $('body').toggleClass('content-reader-mode');
            }
        } 
    });

    // Tutorials
    offsetSubnav();
    $(window).scroll(function() {
        offsetSubnav();
    });


});

$(window).load(function() {

    // =========================================================================
    // EQUAL HEIGHTS ARTICLES ==================================================
    // =========================================================================
    $('.article-row').equalize({ children: '.article-grid' });
    $('#quick-tips').equalize({ children: '.article-grid' });

});

function offsetSubnav() {
    var yScroll = $(window).scrollTop();

    if (yScroll >= 0) {
        $('#tutorials-sub-nav .offset').css({
            '-ms-transform' : 'translate3d(0, '+yScroll+'px, 0) scale3d(1, 1, 1)',
            '-o-transform' : 'translate3d(0, '+yScroll+'px, 0) scale3d(1, 1, 1)',
            '-moz-transform' : 'translate3d(0, '+yScroll+'px, 0) scale3d(1, 1, 1)',
            '-webkit-transform' : 'translate3d(0, '+yScroll+'px, 0) scale3d(1, 1, 1)',
            'transform' : 'translate3d(0, '+yScroll+'px, 0) scale3d(1, 1, 1)'
        });
    }
    
}

function count($this) {
    var current = parseInt($this.html(), 10);
    $this.html(++current);

    if(current !== $this.data('count')) {
        setTimeout(function() {
            count($this)
        }, 50);
    }
}

/* add anchor links to headings */
function addAnchors() {

    // loop through headers
    $.each($('.article-content h2'), function(index, value) {
        var link = value.innerText;
        link = link.replace(/ /g, '-');
        link = link.toLowerCase();

        // add a tag to the header with a sequential name
        $(this).attr('id', link);
        $(this).html('<a href="#' + link + '"><span class="fa fa-link"></span> ' + $(this).html() + '</a>');

        $('#article-outline small').remove();

    });

}