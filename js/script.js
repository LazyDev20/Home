(function ($) {

  "use strict";

  var searchPopup = function () {
    // open search box
    $('#header').on('click', '.search-button', function (e) {
      $('.search-popup').toggleClass('is-visible');
    });

    $('#header').on('click', '.btn-close-search', function (e) {
      $('.search-popup').toggleClass('is-visible');
    });

    $(".search-popup-trigger").on("click", function (b) {
      b.preventDefault();
      $(".search-popup").addClass("is-visible"),
        setTimeout(function () {
          $(".search-popup").find("#search-popup").focus()
        }, 350)
    }),
      $(".search-popup").on("click", function (b) {
        ($(b.target).is(".search-popup-close") || $(b.target).is(".search-popup-close svg") || $(b.target).is(".search-popup-close path") || $(b.target).is(".search-popup")) && (b.preventDefault(),
          $(this).removeClass("is-visible"))
      }),
      $(document).keyup(function (b) {
        "27" === b.which && $(".search-popup").removeClass("is-visible")
      })
  }

  window.addEventListener("load", (event) => {

    var $grid = $('.entry-container').isotope({
      itemSelector: '.entry-item',
      layoutMode: 'masonry'
    });
    
  });

  // init Chocolat light box
  var initChocolat = function () {
    Chocolat(document.querySelectorAll('.image-link'), {
      imageSize: 'contain',
      loop: true,
    })
  }

  // init jarallax parallax
  var initJarallax = function () {
    jarallax(document.querySelectorAll(".jarallax"));

    jarallax(document.querySelectorAll(".jarallax-keep-img"), {
      keepImg: true,
    });
  }

  var initProductQty = function () {

    $('.product-qty').each(function () {

      var $el_product = $(this);

      // Get price element inside the same row
      var $row = $el_product.closest('tr');
      var $priceElement = $row.find('.total-price span');
      var unitPrice = parseFloat($priceElement.text().replace('$', ''));

      // RIGHT BUTTON (PLUS)
      $el_product.find('.quantity-right-plus').click(function (e) {
        e.preventDefault();
        var quantity = parseInt($el_product.find('.input-quantity.input-number').val());
        quantity = quantity + 1;
        $el_product.find('.input-quantity.input-number').val(quantity);

        // Update price
        var newPrice = (unitPrice * quantity).toFixed(2);
        $priceElement.text('$' + newPrice);
      });

      // LEFT BUTTON (MINUS)
      $el_product.find('.quantity-left-minus').click(function (e) {
        e.preventDefault();
        var quantity = parseInt($el_product.find('.input-quantity.input-number').val());

        if (quantity > 1) {
          quantity = quantity - 1;
          $el_product.find('.input-quantity.input-number').val(quantity);

          // Update price
          var newPrice = (unitPrice * quantity).toFixed(2);
          $priceElement.text('$' + newPrice);
        }
      });

    });

  }

  var initCartCalculation = function () {

      function updateCartTotals() {
          let subtotal = 0;

          $(".cart-item").each(function () {
              const price = parseFloat($(this).find(".item-price").data("price"));
              const qty = parseInt($(this).find(".product-qty .input-quantity.input-number").val());
              const itemTotal = price * qty;

              $(this).find(".item-total").text("$" + itemTotal.toFixed(2));
              subtotal += itemTotal;
          });

          $("#cart-subtotal").text(subtotal.toFixed(2));
          $("#cart-total").text(subtotal.toFixed(2));
      }

      $(".quantity-right-plus, .quantity-left-minus").on("click", function () {
          setTimeout(updateCartTotals, 150);
      });

      $(".product-qty .input-quantity.input-number").on("keyup change", function () {
          updateCartTotals();
      });

      updateCartTotals();
  };

  var initReviewStar = function () {
    const stars = document.querySelectorAll(".rating-stars .star");
    const ratingValue = document.getElementById("rating-value");
    const ratingText = document.getElementById("rating-text");

    stars.forEach((star) => {
        // Hover effect
        star.addEventListener("mouseover", () => {
            resetHover();
            const value = star.getAttribute("data-value");
            highlightStars(value, "hovered");
        });

        // Remove hover effect
        star.addEventListener("mouseout", resetHover);

        // Click to select rating
        star.addEventListener("click", () => {
            const value = star.getAttribute("data-value");
            ratingValue.value = value;
            ratingText.textContent = `(${value})`;
            highlightStars(value, "active");
        });
    });

    // Highlight stars up to selected value
    function highlightStars(value, cls) {
        stars.forEach((star) => {
            star.classList.remove("active");
            if (star.getAttribute("data-value") <= value) {
                star.classList.add(cls);
            }
        });
    }

    // Remove hover class
    function resetHover() {
        stars.forEach((star) => star.classList.remove("hovered"));
        highlightStars(ratingValue.value, "active");
    }

  }

  $(document).ready(function () {

    initChocolat();
    initJarallax();
    initProductQty();
    searchPopup();
    initReviewStar();
    initCartCalculation();

    /* Video */
    var $videoSrc;  
      $('.play-btn').click(function() {
        $videoSrc = $(this).data( "src" );
      });

      $('#myModal').on('shown.bs.modal', function (e) {

      $("#video").attr('src',$videoSrc + "?autoplay=1&amp;modestbranding=1&amp;showinfo=0" ); 
    })

    $('#myModal').on('hide.bs.modal', function (e) {
      $("#video").attr('src',$videoSrc); 
    })

    var team_swiper = new Swiper(".team-swiper", {
      spaceBetween: 20,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      breakpoints: {
        300: {
          slidesPerView: 1,
        },
        768: {
          slidesPerView: 3,
          spaceBetween: 20,
        },
        1200: {
          slidesPerView: 4,
          spaceBetween: 20,
        },
      },
    });

    // product single page
    var thumb_slider = new Swiper(".product-thumbnail-slider", {
      slidesPerView: 3,
      autoplay: true,
      direction: "vertical",
      spaceBetween: 10,
    });

    var large_slider = new Swiper(".product-large-slider", {
      slidesPerView: 1,
      autoplay: true,
      effect: 'fade',
      thumbs: {
        swiper: thumb_slider,
      },
    });

    var product_swiper = new Swiper(".swiper-carousel", {
      slidesPerView: 4,
      spaceBetween: 20,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      breakpoints: {
        300: {
          slidesPerView: 1,
        },
        768: {
          slidesPerView: 3,
          spaceBetween: 20,
        },
        1200: {
          slidesPerView: 4,
          spaceBetween: 20,
        },
      },
    });

    var testimonial_swiper = new Swiper(".testimonial-swiper", {
      slidesPerView: 1,
      spaceBetween: 20,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
    });

    $(".youtube").colorbox({
      iframe: true,
      innerWidth: 960,
      innerHeight: 585
    });

  }); // End of a document

})(jQuery);