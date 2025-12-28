$(document).ready(function() {

  function parallaxScroll() {
    var scrolled = $(window).scrollTop();
    var windowHeight = $(window).height();

    // parallax layers
    $('.layer-back').css('transform', 'translateY(' + (scrolled * 0.3) + 'px)');
    $('.layer-mid').css('transform', 'translateY(' + (scrolled * 0.5) + 'px)');
    $('.layer-front').css('transform', 'translateY(' + (scrolled * 0.7) + 'px)');

    var heroOpacity = Math.max(1 - (scrolled / 600), 0);
    $('.hero-content').css({
      'transform': 'translate(-50%, -50%) translateY(' + (scrolled * 0.25) + 'px)',
      'opacity': heroOpacity
    });

    // floating icons
    $('.eiffel').css({
      'transform': 'translateY(' + (scrolled * 0.4) + 'px) rotate(' + (scrolled * 0.03) + 'deg)',
      'opacity': Math.max(0.15 - (scrolled / 1500), 0)
    });

    $('.colosseum').css({
      'transform': 'translateY(' + (scrolled * -0.25) + 'px) rotate(' + (scrolled * -0.02) + 'deg)',
      'opacity': Math.max(0.15 - (scrolled / 1500), 0)
    });

    $('.bigben').css({
      'transform': 'translateY(' + (scrolled * 0.55) + 'px) rotate(' + (scrolled * 0.04) + 'deg)',
      'opacity': Math.max(0.15 - (scrolled / 1500), 0)
    });

    $('.sagrada').css({
      'transform': 'translateY(' + (scrolled * -0.35) + 'px) rotate(' + (scrolled * -0.025) + 'deg)',
      'opacity': Math.max(0.15 - (scrolled / 1500), 0)
    });

    // image sections
    $('.landmark-section').each(function() {
      var sectionOffset = $(this).offset().top;
      var sectionHeight = $(this).outerHeight();
      var sectionScroll = scrolled - sectionOffset;
      var sectionProgress = sectionScroll / sectionHeight;

      if (sectionScroll > -windowHeight && sectionScroll < windowHeight + sectionHeight) {
        var $image = $(this).find('.landmark-image img');
        var $content = $(this).find('.content-inner');

        var imageOffset = (sectionProgress - 0.5) * 50;
        $image.css({
          'transform': 'translateY(' + imageOffset + 'px) scale(1)',
          'transition': 'transform 0.1s ease-out'
        });
        var contentOpacity = Math.min(Math.max((windowHeight + sectionScroll - 200) / 400, 0), 1);
        var contentOffset = Math.max(50 - ((windowHeight + sectionScroll) / 10), 0);

        $content.find('.location-tag, .section-title, .year-tag, .text-content p').each(function(index) {
          var elementOpacity = Math.min(Math.max((windowHeight + sectionScroll - 250 - (index * 50)) / 300, 0), 1);
          var elementOffset = Math.max(40 - ((windowHeight + sectionScroll - (index * 30)) / 10), 0);

          $(this).css({
            'opacity': elementOpacity,
            'transform': 'translateY(' + elementOffset + 'px)'
          });
        });
      }
    });

    // breaks
    var breakEiffelOffset = $('.break-eiffel').offset() ? $('.break-eiffel').offset().top : 0;
    var breakEiffelScroll = scrolled - breakEiffelOffset + windowHeight;
    if (breakEiffelScroll > 0 && breakEiffelScroll < windowHeight * 2) {
      $('.break-eiffel .layer-1').css('transform', 'translateY(' + (breakEiffelScroll * 0.2) + 'px)');
      $('.break-eiffel .layer-2').css('transform', 'translateY(' + (breakEiffelScroll * 0.4) + 'px)');
    }

    var breakColosseumOffset = $('.break-colosseum').offset() ? $('.break-colosseum').offset().top : 0;
    var breakColosseumScroll = scrolled - breakColosseumOffset + windowHeight;
    if (breakColosseumScroll > 0 && breakColosseumScroll < windowHeight * 2) {
      $('.break-colosseum .layer-3').css('transform', 'translateY(' + (breakColosseumScroll * 0.25) + 'px)');
      $('.break-colosseum .layer-4').css('transform', 'translateY(' + (breakColosseumScroll * 0.45) + 'px)');
    }

    // info boxes
    $('.landmark-info').each(function() {
      var landmarkOffset = $(this).parent().offset().top;
      var landmarkScroll = scrolled - landmarkOffset + windowHeight;

      if (landmarkScroll > 0 && landmarkScroll < windowHeight * 2) {
        var floatAmount = Math.sin(landmarkScroll * 0.004) * 12;
        var opacity = Math.min(Math.max((landmarkScroll - 200) / 300, 0), 1);

        $(this).css({
          'transform': 'translateY(' + floatAmount + 'px)',
          'opacity': opacity
        });
      }
    });

    var finalSection = $('.section-final');
    if (finalSection.length > 0) {
      var finalOffset = finalSection.offset().top;
      var finalScroll = scrolled - finalOffset + windowHeight;

      if (finalScroll > 200) {
        $('.final-quote, .quote-attribution').css({
          'opacity': '1',
          'transform': 'translateY(0)'
        });
      }
    }
  }

  $('.location-tag, .section-title, .year-tag, .text-content p').css({
    'opacity': '0',
    'transform': 'translateY(40px)',
    'transition': 'opacity 0.6s ease-out, transform 0.6s ease-out'
  });

  $('.landmark-info').css({
    'opacity': '0',
    'transition': 'opacity 0.8s ease-out, transform 0.3s ease-out'
  });

  $('.final-quote, .quote-attribution').css({
    'opacity': '0',
    'transform': 'translateY(30px)',
    'transition': 'all 1.2s ease-out'
  });

  parallaxScroll();

  var ticking = false;

  $(window).on('scroll', function() {
    if (!ticking) {
      window.requestAnimationFrame(function() {
        parallaxScroll();
        ticking = false;
      });
      ticking = true;
    }
  });

  // hover effects
  $('.decorative-line').hover(
    function() {
      $(this).css({
        'box-shadow': '0 0 25px rgba(212, 175, 55, 0.8)',
        'width': '230px',
        'transition': 'all 0.4s ease'
      });
    },
    function() {
      $(this).css({
        'box-shadow': '0 0 10px rgba(180, 149, 106, 0.4)',
        'width': '200px',
        'transition': 'all 0.4s ease'
      });
    }
  );

  setInterval(function() {
    $('.ornament-top, .ornament-bottom, .footer-ornament').animate(
      {
        width: '170px',
        opacity: 0.9
      },
      2000,
      'swing',
      function() {
        $(this).animate({
          width: '150px',
          opacity: 0.8
        }, 2000, 'swing');
      }
    );
  }, 4000);

  $('html, body').animate({ scrollTop: 0 }, 100);

  $('.landmark-image img').hover(
    function() {
      $(this).css({
        'filter': 'drop-shadow(0 25px 70px rgba(0, 0, 0, 0.7)) drop-shadow(0 0 40px rgba(180, 149, 106, 0.4))',
        'transition': 'filter 0.3s ease'
      });
    },
    function() {
      $(this).css({
        'filter': 'drop-shadow(0 20px 60px rgba(0, 0, 0, 0.5)) drop-shadow(0 0 30px rgba(180, 149, 106, 0.2))',
        'transition': 'filter 0.3s ease'
      });
    }
  );

});
