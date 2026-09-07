/**
 * Kasia_cleaning - Main Interactive JavaScript & jQuery Script
 */

$(document).ready(function () {
  /* ==========================================================================
     1. CUSTOM CURSOR
     ========================================================================== */
  const $dot = $('#cursor-dot');
  const $ring = $('#cursor-ring');

  if ($dot.length && $ring.length) {
    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;
    let isMoving = false;

    $(document).on('mousemove', function (e) {
      mouseX = e.clientX;
      mouseY = e.clientY;
      $dot.css({ transform: `translate3d(${mouseX - 3}px, ${mouseY - 3}px, 0)` });

      if (!isMoving) {
        isMoving = true;
        requestAnimationFrame(animateRing);
      }
    });

    function animateRing() {
      ringX += (mouseX - ringX) * 0.2;
      ringY += (mouseY - ringY) * 0.2;
      $ring.css({ transform: `translate3d(${ringX - 18}px, ${ringY - 18}px, 0)` });
      
      if (Math.abs(mouseX - ringX) > 0.1 || Math.abs(mouseY - ringY) > 0.1) {
        requestAnimationFrame(animateRing);
      } else {
        isMoving = false;
      }
    }

    // Hover state on interactive elements
    $(document).on('mouseenter', 'a, button, input, select, textarea, .cursor-pointer, .ba-slider, [role="button"]', function () {
      $ring.addClass('is-hover');
    }).on('mouseleave', 'a, button, input, select, textarea, .cursor-pointer, .ba-slider, [role="button"]', function () {
      $ring.removeClass('is-hover');
    });
  }

  /* ==========================================================================
     2. NAVBAR & MOBILE DRAWER
     ========================================================================== */
  const $header = $('#site-header');
  const $navBrand = $('#nav-brand');
  const $navLinks = $('.nav-link-item');
  const $navToggle = $('#nav-toggle-btn');
  const $bookingNavBtn = $('#nav-booking-btn');

  function handleScroll() {
    const isScrolled = window.scrollY > 30;
    if (isScrolled) {
      $header.addClass('bg-ivory/85 backdrop-blur-md shadow-[0_1px_30px_rgba(43,40,38,0.08)] py-3').removeClass('bg-transparent py-5');
      $navBrand.addClass('text-charcoal').removeClass('text-ivory');
      $navLinks.addClass('text-charcoal/80 hover:text-charcoal').removeClass('text-ivory/90 hover:text-ivory');
      $navToggle.addClass('text-charcoal').removeClass('text-ivory');
      $bookingNavBtn.removeClass('bg-ivory/95 text-charcoal hover:bg-ivory');
    } else {
      $header.removeClass('bg-ivory/85 backdrop-blur-md shadow-[0_1px_30px_rgba(43,40,38,0.08)] py-3').addClass('bg-transparent py-5');
      // If header is over non-hero (pages like Services, About etc. that don't have hero-bg), keep header text charcoal
      if ($('#hero-section').length === 0) {
        $navBrand.addClass('text-charcoal').removeClass('text-ivory');
        $navLinks.addClass('text-charcoal/80 hover:text-charcoal').removeClass('text-ivory/90 hover:text-ivory');
        $navToggle.addClass('text-charcoal').removeClass('text-ivory');
        $bookingNavBtn.removeClass('bg-ivory/95 text-charcoal hover:bg-ivory');
      } else {
        $navBrand.removeClass('text-charcoal').addClass('text-ivory');
        $navLinks.removeClass('text-charcoal/80 hover:text-charcoal').addClass('text-ivory/90 hover:text-ivory');
        $navToggle.removeClass('text-charcoal').addClass('text-ivory');
        $bookingNavBtn.addClass('bg-ivory/95 text-charcoal hover:bg-ivory');
      }
    }
  }

  $(window).on('scroll', handleScroll);
  handleScroll();

  // Mobile Menu Drawer
  const $mobileMenu = $('#mobile-menu-drawer');
  const $mobileMenuPanel = $('#mobile-menu-panel');

  $('#open-mobile-menu').on('click', function () {
    $mobileMenu.removeClass('opacity-0 pointer-events-none').addClass('opacity-100 pointer-events-auto');
    $mobileMenuPanel.removeClass('translate-x-full').addClass('translate-x-0');
    $('body').css('overflow', 'hidden');
  });

  function closeMobileMenu() {
    $mobileMenuPanel.removeClass('translate-x-0').addClass('translate-x-full');
    $mobileMenu.removeClass('opacity-100 pointer-events-auto').addClass('opacity-0 pointer-events-none');
    $('body').css('overflow', '');
  }

  $('#close-mobile-menu, #mobile-menu-overlay, .mobile-nav-link').on('click', closeMobileMenu);

  /* ==========================================================================
     3. HERO PARALLAX SCROLL
     ========================================================================== */
  const $heroBg = $('#hero-bg');
  if ($heroBg.length) {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!reduceMotion) {
      $(window).on('scroll', function () {
        const scrolled = window.scrollY;
        if (scrolled < window.innerHeight) {
          $heroBg.css('transform', `translateY(${scrolled * 0.3}px) scale(${1.06 + scrolled * 0.0002})`);
        }
      });
    }
  }

  /* ==========================================================================
     4. SCROLL REVEAL ANIMATION (IntersectionObserver)
     ========================================================================== */
  const revealElements = document.querySelectorAll('.reveal');
  if (revealElements.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    }, { threshold: 0.1 });

    revealElements.forEach((el) => observer.observe(el));
  }

  /* ==========================================================================
     5. BEFORE / AFTER SLIDER
     ========================================================================== */
  const $baSlider = $('#ba-slider');
  if ($baSlider.length) {
    const $afterWrap = $baSlider.find('.ba-after-wrap');
    const $handle = $baSlider.find('.ba-handle');
    const $afterImg = $baSlider.find('.ba-after-img');
    let isDragging = false;
    let pos = 50;

    function updateSliderPos(clientX) {
      const rect = $baSlider[0].getBoundingClientRect();
      let pct = ((clientX - rect.left) / rect.width) * 100;
      pct = Math.max(0, Math.min(100, pct));
      pos = pct;
      $afterWrap.css('width', `${pct}%`);
      $handle.css('left', `${pct}%`);
      $afterImg.css('width', `${rect.width}px`);
    }

    $(window).on('resize', function () {
      const rect = $baSlider[0].getBoundingClientRect();
      $afterImg.css('width', `${rect.width}px`);
    }).trigger('resize');

    $baSlider.on('mousedown touchstart', function (e) {
      isDragging = true;
      const clientX = e.type === 'touchstart' ? e.originalEvent.touches[0].clientX : e.clientX;
      updateSliderPos(clientX);
    });

    $(window).on('mousemove touchmove', function (e) {
      if (!isDragging) return;
      const clientX = e.type === 'touchmove' ? e.originalEvent.touches[0].clientX : e.clientX;
      updateSliderPos(clientX);
    }).on('mouseup touchend', function () {
      isDragging = false;
    });

    $baSlider.on('keydown', function (e) {
      if (e.key === 'ArrowLeft') {
        pos = Math.max(0, pos - 4);
        $afterWrap.css('width', `${pos}%`);
        $handle.css('left', `${pos}%`);
      } else if (e.key === 'ArrowRight') {
        pos = Math.min(100, pos + 4);
        $afterWrap.css('width', `${pos}%`);
        $handle.css('left', `${pos}%`);
      }
    });
  }

  /* ==========================================================================
     6. REVIEWS CAROUSEL
     ========================================================================== */
  const $reviewsTrack = $('#reviews-track');
  if ($reviewsTrack.length) {
    const totalReviews = $('.review-card').length;
    let reviewIndex = 0;
    let perView = window.innerWidth < 768 ? 1 : 3;
    let maxIndex = Math.max(0, totalReviews - perView);
    let autoSlideTimer = null;
    let touchStartX = null;

    function updateCarousel() {
      perView = window.innerWidth < 768 ? 1 : 3;
      maxIndex = Math.max(0, totalReviews - perView);
      $('.review-card').css('width', `${100 / perView}%`);
      if (reviewIndex > maxIndex) reviewIndex = maxIndex;
      $reviewsTrack.css('transform', `translateX(-${reviewIndex * (100 / perView)}%)`);
      renderDots();
    }

    function renderDots() {
      const $dotsContainer = $('#reviews-dots').empty();
      for (let i = 0; i <= maxIndex; i++) {
        const $dot = $('<button>')
          .addClass(`h-1.5 rounded-full transition-all duration-300 ${i === reviewIndex ? 'w-6 bg-charcoal' : 'w-1.5 bg-charcoal/25'}`)
          .attr('aria-label', `Przejdź do opinii ${i + 1}`)
          .on('click', function () {
            reviewIndex = i;
            updateCarousel();
            resetAutoSlide();
          });
        $dotsContainer.append($dot);
      }
    }

    function nextReview() {
      reviewIndex = reviewIndex >= maxIndex ? 0 : reviewIndex + 1;
      updateCarousel();
    }

    function prevReview() {
      reviewIndex = reviewIndex <= 0 ? maxIndex : reviewIndex - 1;
      updateCarousel();
    }

    $('#reviews-next-btn').on('click', function () {
      nextReview();
      resetAutoSlide();
    });

    $('#reviews-prev-btn').on('click', function () {
      prevReview();
      resetAutoSlide();
    });

    function startAutoSlide() {
      if (!autoSlideTimer) {
        autoSlideTimer = setInterval(nextReview, 5000);
      }
    }

    function stopAutoSlide() {
      if (autoSlideTimer) {
        clearInterval(autoSlideTimer);
        autoSlideTimer = null;
      }
    }

    function resetAutoSlide() {
      stopAutoSlide();
      startAutoSlide();
    }

    $('#reviews-container').on('mouseenter touchstart', function (e) {
      stopAutoSlide();
      if (e.type === 'touchstart') {
        touchStartX = e.originalEvent.touches[0].clientX;
      }
    }).on('mouseleave touchend', function (e) {
      startAutoSlide();
      if (e.type === 'touchend' && touchStartX !== null) {
        const diff = touchStartX - e.originalEvent.changedTouches[0].clientX;
        if (Math.abs(diff) > 50) {
          if (diff > 0) nextReview(); else prevReview();
        }
        touchStartX = null;
      }
    });

    $(window).on('resize', updateCarousel);
    updateCarousel();
    startAutoSlide();
  }

  /* ==========================================================================
     7. GALLERY LIGHTBOX
     ========================================================================== */
  const GALLERY_DATA = [
    { src: 'https://images.pexels.com/photos/7587773/pexels-photo-7587773.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', alt: 'Jasny salon z otwartą kuchnią w stylu skandynawskim' },
    { src: 'https://images.pexels.com/photos/6523269/pexels-photo-6523269.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', alt: 'Nowoczesna biała kuchnia z naturalnym światłem' },
    { src: 'https://images.pexels.com/photos/7546608/pexels-photo-7546608.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', alt: 'Czysta, nowoczesna łazienka z prysznicem i beżowymi płytkami' },
    { src: 'https://images.pexels.com/photos/7587772/pexels-photo-7587772.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', alt: 'Jasna sypialnia w stylu minimalistycznym' },
    { src: 'https://images.pexels.com/photos/7587779/pexels-photo-7587779.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', alt: 'Przytulny salon z minimalistyczną kuchnią' },
    { src: 'https://images.pexels.com/photos/6580220/pexels-photo-6580220.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', alt: 'Minimalistyczna kuchnia z gładkimi powierzchniami' }
  ];

  let currentLightboxIndex = null;
  const $lightbox = $('#gallery-lightbox');
  const $lightboxImg = $('#lightbox-img');
  const $lightboxCounter = $('#lightbox-counter');

  function openLightbox(index) {
    currentLightboxIndex = index;
    $lightboxImg.attr('src', GALLERY_DATA[index].src).attr('alt', GALLERY_DATA[index].alt);
    $lightboxCounter.text(`${index + 1} / ${GALLERY_DATA.length}`);
    $lightbox.removeClass('hidden').addClass('flex');
    $('body').css('overflow', 'hidden');
  }

  function closeLightbox() {
    currentLightboxIndex = null;
    $lightbox.removeClass('flex').addClass('hidden');
    $('body').css('overflow', '');
  }

  function showNextImage() {
    if (currentLightboxIndex !== null) {
      openLightbox((currentLightboxIndex + 1) % GALLERY_DATA.length);
    }
  }

  function showPrevImage() {
    if (currentLightboxIndex !== null) {
      openLightbox((currentLightboxIndex - 1 + GALLERY_DATA.length) % GALLERY_DATA.length);
    }
  }

  $('.gallery-item').on('click', function () {
    const index = parseInt($(this).attr('data-gallery-index'), 10);
    if (!isNaN(index)) openLightbox(index);
  });

  $('#lightbox-close, #lightbox-backdrop').on('click', closeLightbox);
  $('#lightbox-next').on('click', function (e) { e.stopPropagation(); showNextImage(); });
  $('#lightbox-prev').on('click', function (e) { e.stopPropagation(); showPrevImage(); });

  let lightboxTouchStart = null;
  $lightbox.on('touchstart', function (e) {
    lightboxTouchStart = e.originalEvent.touches[0].clientX;
  }).on('touchend', function (e) {
    if (lightboxTouchStart !== null) {
      const diff = lightboxTouchStart - e.originalEvent.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) {
        if (diff > 0) showNextImage(); else showPrevImage();
      }
      lightboxTouchStart = null;
    }
  });

  $(document).on('keydown', function (e) {
    if ($lightbox.hasClass('flex')) {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') showNextImage();
      if (e.key === 'ArrowLeft') showPrevImage();
    }
  });

  /* ==========================================================================
     8. FAQ ACCORDION
     ========================================================================== */
  $('.accordion-header').on('click', function () {
    const $item = $(this).closest('.accordion-item');
    const $content = $item.find('.accordion-content');
    const isOpen = $content.hasClass('open');

    // Toggle current item
    if (isOpen) {
      $content.removeClass('open');
      $item.find('.accordion-icon-plus').removeClass('hidden');
      $item.find('.accordion-icon-minus').addClass('hidden');
      $(this).attr('aria-expanded', 'false');
    } else {
      $content.addClass('open');
      $item.find('.accordion-icon-plus').addClass('hidden');
      $item.find('.accordion-icon-minus').removeClass('hidden');
      $(this).attr('aria-expanded', 'true');
    }
  });

  /* ==========================================================================
     9. CONTACT FORM VALIDATION & SUBMISSION
     ========================================================================== */
  const $contactForm = $('#contact-form');
  if ($contactForm.length) {
    $contactForm.on('submit', function (e) {
      e.preventDefault();
      let isValid = true;

      const name = $('#contact-name').val().trim();
      const phone = $('#contact-phone').val().trim();
      const email = $('#contact-email').val().trim();

      // Clear errors
      $('.contact-error').text('').addClass('hidden');
      $('#contact-name, #contact-phone, #contact-email').removeClass('border-red-400');

      if (!name) {
        $('#err-contact-name').text('Podaj imię').removeClass('hidden');
        $('#contact-name').addClass('border-red-400');
        isValid = false;
      }

      if (!phone) {
        $('#err-contact-phone').text('Podaj numer telefonu').removeClass('hidden');
        $('#contact-phone').addClass('border-red-400');
        isValid = false;
      } else if (phone.replace(/\s/g, '').length < 7) {
        $('#err-contact-phone').text('Nieprawidłowy numer telefonu').removeClass('hidden');
        $('#contact-phone').addClass('border-red-400');
        isValid = false;
      }

      if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        $('#err-contact-email').text('Nieprawidłowy adres e-mail').removeClass('hidden');
        $('#contact-email').addClass('border-red-400');
        isValid = false;
      }

      if (isValid) {
        $contactForm.addClass('hidden');
        $('#contact-success-state').removeClass('hidden');

        setTimeout(function () {
          $contactForm.trigger('reset').removeClass('hidden');
          $('#contact-success-state').addClass('hidden');
        }, 4000);
      }
    });
  }

  /* ==========================================================================
     10. MULTI-STEP BOOKING MODAL
     ========================================================================== */
  const $modal = $('#booking-modal');
  let modalStep = 0;
  const bookingState = {
    service: '',
    area: '',
    date: '',
    time: '',
    name: '',
    phone: '',
    email: '',
    message: ''
  };

  // Set minimum date for date picker to today
  const todayISO = new Date().toISOString().split('T')[0];
  $('#modal-date-input').attr('min', todayISO);

  function openBookingModal(initialService) {
    modalStep = 0;
    if (initialService) {
      bookingState.service = initialService;
    }
    renderModalStep();
    $modal.removeClass('hidden').addClass('flex');
    $('body').css('overflow', 'hidden');
  }

  function closeBookingModal() {
    $modal.removeClass('flex').addClass('hidden');
    $('body').css('overflow', '');
    setTimeout(function () {
      modalStep = 0;
      bookingState.service = '';
      bookingState.area = '';
      bookingState.date = '';
      bookingState.time = '';
      bookingState.name = '';
      bookingState.phone = '';
      bookingState.email = '';
      bookingState.message = '';
      $('.modal-service-btn, .modal-area-btn, .modal-time-btn').removeClass('border-sage bg-sage/10 text-charcoal font-medium').addClass('border-charcoal/15 text-charcoal/80');
      $('#modal-date-input, #modal-name-input, #modal-phone-input, #modal-email-input, #modal-msg-input').val('');
      $('.modal-input-error').text('').addClass('hidden');
    }, 300);
  }

  // Open modal trigger buttons
  $(document).on('click', '[data-open-modal], .btn-open-booking', function (e) {
    e.preventDefault();
    const serviceAttr = $(this).attr('data-service-name');
    openBookingModal(serviceAttr || '');
  });

  // Close modal triggers
  $('#modal-close-btn, #modal-overlay-backdrop, #modal-success-close-btn').on('click', closeBookingModal);

  $(document).on('keydown', function (e) {
    if (e.key === 'Escape' && $modal.hasClass('flex')) {
      closeBookingModal();
    }
  });

  // Step selection listeners
  $('.modal-service-btn').on('click', function () {
    bookingState.service = $(this).attr('data-service');
    $('.modal-service-btn').removeClass('border-sage bg-sage/10 text-charcoal').addClass('border-charcoal/15 text-charcoal/80');
    $(this).addClass('border-sage bg-sage/10 text-charcoal').removeClass('border-charcoal/15 text-charcoal/80');
  });

  $('.modal-area-btn').on('click', function () {
    bookingState.area = $(this).attr('data-area');
    $('.modal-area-btn').removeClass('border-sage bg-sage/10 text-charcoal').addClass('border-charcoal/15 text-charcoal/80');
    $(this).addClass('border-sage bg-sage/10 text-charcoal').removeClass('border-charcoal/15 text-charcoal/80');
  });

  $('#modal-date-input').on('change', function () {
    bookingState.date = $(this).val();
  });

  $('.modal-time-btn').on('click', function () {
    bookingState.time = $(this).attr('data-time');
    $('.modal-time-btn').removeClass('border-sage bg-sage/10 text-charcoal font-medium').addClass('border-charcoal/15 text-charcoal/80');
    $(this).addClass('border-sage bg-sage/10 text-charcoal font-medium').removeClass('border-charcoal/15 text-charcoal/80');
  });

  // Render modal steps UI
  function renderModalStep() {
    // Hide all step bodies
    $('.modal-step-content').addClass('hidden');

    // Show current step content
    $(`#modal-step-${modalStep}`).removeClass('hidden');

    // Update progress bars (steps 0 to 3)
    if (modalStep === 4) {
      $('#modal-progress-container').addClass('hidden');
      $('#modal-footer-nav').addClass('hidden');
      $('#modal-header-title').text('Dziękujemy!');
    } else {
      $('#modal-progress-container').removeClass('hidden');
      $('#modal-footer-nav').removeClass('hidden');
      $('#modal-header-title').text('Zamów sprzątanie');

      $('.modal-progress-bar').each(function (idx) {
        if (idx <= modalStep) {
          $(this).removeClass('bg-charcoal/10').addClass('bg-sage');
        } else {
          $(this).removeClass('bg-sage').addClass('bg-charcoal/10');
        }
      });

      // Update Prev button visibility
      if (modalStep === 0) {
        $('#modal-prev-btn').addClass('opacity-0 pointer-events-none');
      } else {
        $('#modal-prev-btn').removeClass('opacity-0 pointer-events-none');
      }

      // Update Next button label
      if (modalStep === 3) {
        $('#modal-next-btn-text').text('Wyślij zapytanie');
        updateSummaryBox();
      } else {
        $('#modal-next-btn-text').text('Dalej');
      }
    }

    // Reflect selection highlight states
    if (bookingState.service) {
      $(`.modal-service-btn[data-service="${bookingState.service}"]`).addClass('border-sage bg-sage/10 text-charcoal').removeClass('border-charcoal/15 text-charcoal/80');
    }
    if (bookingState.area) {
      $(`.modal-area-btn[data-area="${bookingState.area}"]`).addClass('border-sage bg-sage/10 text-charcoal').removeClass('border-charcoal/15 text-charcoal/80');
    }
    if (bookingState.time) {
      $(`.modal-time-btn[data-time="${bookingState.time}"]`).addClass('border-sage bg-sage/10 text-charcoal font-medium').removeClass('border-charcoal/15 text-charcoal/80');
    }
  }

  function updateSummaryBox() {
    $('#summary-service').text(bookingState.service || 'Nie wybrano');
    $('#summary-area').text(bookingState.area || 'Nie wybrano');
    $('#summary-date').text(bookingState.date || 'Nie wybrano');
    $('#summary-time').text(bookingState.time || 'Nie wybrano');
  }

  function validateStep(step) {
    if (step === 0) {
      if (!bookingState.service) {
        alert('Proszę wybrać rodzaj sprzątania.');
        return false;
      }
    } else if (step === 1) {
      if (!bookingState.area) {
        alert('Proszę wybrać powierzchnię.');
        return false;
      }
    } else if (step === 2) {
      if (!bookingState.date || !bookingState.time) {
        alert('Proszę wybrać datę i godzinę.');
        return false;
      }
    } else if (step === 3) {
      let isValid = true;
      const name = $('#modal-name-input').val().trim();
      const phone = $('#modal-phone-input').val().trim();
      const email = $('#modal-email-input').val().trim();
      const msg = $('#modal-msg-input').val().trim();

      $('.modal-input-error').text('').addClass('hidden');
      $('#modal-name-input, #modal-phone-input, #modal-email-input').removeClass('border-red-400');

      if (!name) {
        $('#err-modal-name').text('Podaj imię').removeClass('hidden');
        $('#modal-name-input').addClass('border-red-400');
        isValid = false;
      }

      if (!phone) {
        $('#err-modal-phone').text('Podaj numer telefonu').removeClass('hidden');
        $('#modal-phone-input').addClass('border-red-400');
        isValid = false;
      } else if (phone.replace(/\s/g, '').length < 7) {
        $('#err-modal-phone').text('Nieprawidłowy numer telefonu').removeClass('hidden');
        $('#modal-phone-input').addClass('border-red-400');
        isValid = false;
      }

      if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        $('#err-modal-email').text('Nieprawidłowy adres e-mail').removeClass('hidden');
        $('#modal-email-input').addClass('border-red-400');
        isValid = false;
      }

      if (isValid) {
        bookingState.name = name;
        bookingState.phone = phone;
        bookingState.email = email;
        bookingState.message = msg;
      }
      return isValid;
    }
    return true;
  }

  $('#modal-next-btn').on('click', function () {
    if (!validateStep(modalStep)) return;
    modalStep = Math.min(modalStep + 1, 4);
    renderModalStep();
  });

  $('#modal-prev-btn').on('click', function () {
    modalStep = Math.max(modalStep - 1, 0);
    renderModalStep();
  });
});
