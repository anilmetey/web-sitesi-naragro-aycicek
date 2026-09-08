/* Created by Anıl Mete */
/**
* Template Name: UpConstruction - v1.3.0
* Template URL: https://bootstrapmade.com/upconstruction-bootstrap-construction-website-template/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
document.addEventListener('DOMContentLoaded', () => {
  "use strict";

  /**
   * Preloader / Splash Screen
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    const minDisplayTime = 800;
    const startTime = performance.now();

    const hideSplash = () => {
      const elapsed = performance.now() - startTime;
      const delay = Math.max(0, minDisplayTime - elapsed);
      setTimeout(() => {
        preloader.classList.add('loaded');
        setTimeout(() => {
          preloader.remove();
        }, 650);
      }, delay);
    };

    if (document.readyState === 'complete') {
      hideSplash();
    } else {
      window.addEventListener('load', hideSplash);
      setTimeout(hideSplash, 2500);
    }
  }

  /**
   * Header Height Utility
   */
  const getHeaderHeight = () => {
    const header = document.querySelector('#header');
    return header ? header.offsetHeight : 76;
  };

  /**
   * Mobile nav toggle
   */
  const mobileNavShow = document.querySelector('.mobile-nav-show');
  const mobileNavHide = document.querySelector('.mobile-nav-hide');

  document.querySelectorAll('.mobile-nav-toggle').forEach(el => {
    el.addEventListener('click', function(event) {
      event.preventDefault();
      mobileNavToogle();
    });
  });

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    if (mobileNavShow && mobileNavHide) {
      mobileNavShow.classList.toggle('d-none');
      mobileNavHide.classList.toggle('d-none');
    }
  }

  // Close mobile nav when clicking backdrop or outside navbar
  document.addEventListener('click', function(e) {
    const body = document.querySelector('body');
    if (body && body.classList.contains('mobile-nav-active')) {
      const navbar = document.querySelector('#navbar');
      const toggle = e.target.closest('.mobile-nav-toggle');
      if (navbar && !navbar.contains(e.target) && !toggle) {
        mobileNavToogle();
      }
    }
  });

  /**
   * Smooth scroll to hash anchor with dynamic header offset
   */
  const scrollToTarget = (hash, e) => {
    if (!hash || hash === '#') return;
    const target = document.querySelector(hash);
    if (!target) return;

    if (e) {
      e.preventDefault();
    }

    const headerHeight = getHeaderHeight();
    let targetY = 0;
    if (hash === '#about') {
      targetY = 0;
    } else {
      const rect = target.getBoundingClientRect();
      targetY = window.pageYOffset + rect.top - headerHeight + 2;
    }

    window.scrollTo({
      top: Math.max(0, targetY),
      behavior: 'smooth'
    });

    if (document.querySelector('body').classList.contains('mobile-nav-active')) {
      mobileNavToogle();
    }
  };

  // Bind smooth scroll to navbar links & footer quick links
  document.querySelectorAll('#navbar a, .footer-nav-link').forEach(link => {
    if (!link.hash) return;
    link.addEventListener('click', function(e) {
      scrollToTarget(this.hash, e);
    });
  });

  /**
   * Navbar links active state on scroll (ScrollSpy)
   */
  const navbarLinks = document.querySelectorAll('#navbar a[href^="#"]');
  const spySections = [];

  navbarLinks.forEach(link => {
    const hash = link.getAttribute('href');
    if (hash && hash !== '#') {
      const sectionEl = document.querySelector(hash);
      if (sectionEl) {
        spySections.push({ hash, el: sectionEl, link });
      }
    }
  });

  function updateNavbarActive() {
    const scrollPos = window.scrollY;
    const headerHeight = getHeaderHeight();
    const windowHeight = window.innerHeight;
    const docHeight = document.documentElement.scrollHeight;

    // If near page bottom, activate contact link (#footer)
    if (scrollPos + windowHeight >= docHeight - 50) {
      navbarLinks.forEach(l => l.classList.remove('active'));
      const footerLink = document.querySelector('#navbar a[href="#footer"]');
      if (footerLink) footerLink.classList.add('active');
      return;
    }

    // If at top or before the second section, activate About (#about)
    const secondSection = spySections[1]; // #stats-counter
    if (!secondSection || scrollPos < (secondSection.el.offsetTop - headerHeight - 120)) {
      navbarLinks.forEach(l => l.classList.remove('active'));
      const aboutLink = document.querySelector('#navbar a[href="#about"]');
      if (aboutLink) aboutLink.classList.add('active');
      return;
    }

    // Check sections from bottom to top
    let activeFound = false;
    for (let i = spySections.length - 1; i >= 0; i--) {
      const item = spySections[i];
      const sectionTop = item.el.offsetTop - headerHeight - 100;
      if (scrollPos >= sectionTop) {
        navbarLinks.forEach(l => l.classList.remove('active'));
        item.link.classList.add('active');
        activeFound = true;
        break;
      }
    }

    if (!activeFound && spySections[0]) {
      navbarLinks.forEach(l => l.classList.remove('active'));
      spySections[0].link.classList.add('active');
    }
  }

  window.addEventListener('scroll', updateNavbarActive, { passive: true });
  window.addEventListener('load', updateNavbarActive);
  updateNavbarActive();

  /**
   * Toggle mobile nav dropdowns
   */
  const navDropdowns = document.querySelectorAll('.navbar .dropdown > a');

  navDropdowns.forEach(el => {
    el.addEventListener('click', function(event) {
      if (document.querySelector('.mobile-nav-active')) {
        event.preventDefault();
        this.classList.toggle('active');
        this.nextElementSibling.classList.toggle('dropdown-active');

        let dropDownIndicator = this.querySelector('.dropdown-indicator');
        dropDownIndicator.classList.toggle('bi-chevron-up');
        dropDownIndicator.classList.toggle('bi-chevron-down');
      }
    })
  });

  /**
   * Scroll top button
   */
  const scrollTop = document.querySelector('.scroll-top');
  if (scrollTop) {
    const togglescrollTop = function() {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
    window.addEventListener('load', togglescrollTop);
    document.addEventListener('scroll', togglescrollTop);
    scrollTop.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  /**
   * Initiate glightbox
   */
  const glightbox = (typeof GLightbox !== 'undefined') ? GLightbox({
    selector: '.glightbox'
  }) : null;

  /**
   * Porfolio isotope and filter
   */
  let portfolionIsotope = document.querySelector('.portfolio-isotope');

  if (portfolionIsotope && typeof Isotope !== 'undefined') {

    let portfolioFilter = portfolionIsotope.getAttribute('data-portfolio-filter') ? portfolionIsotope.getAttribute('data-portfolio-filter') : '*';
    let portfolioLayout = portfolionIsotope.getAttribute('data-portfolio-layout') ? portfolionIsotope.getAttribute('data-portfolio-layout') : 'masonry';
    let portfolioSort = portfolionIsotope.getAttribute('data-portfolio-sort') ? portfolionIsotope.getAttribute('data-portfolio-sort') : 'original-order';

    window.addEventListener('load', () => {
      let portfolioIsotope = new Isotope(document.querySelector('.portfolio-container'), {
        itemSelector: '.portfolio-item',
        layoutMode: portfolioLayout,
        filter: portfolioFilter,
        sortBy: portfolioSort
      });

      let menuFilters = document.querySelectorAll('.portfolio-isotope .portfolio-flters li');
      menuFilters.forEach(function(el) {
        el.addEventListener('click', function() {
          document.querySelector('.portfolio-isotope .portfolio-flters .filter-active').classList.remove('filter-active');
          this.classList.add('filter-active');
          portfolioIsotope.arrange({
            filter: this.getAttribute('data-filter')
          });
          if (typeof aos_init === 'function') {
            aos_init();
          }
        }, false);
      });

    });

  }

  /**
   * Init swiper slider with 1 slide at once in desktop view
   */
  if (typeof Swiper !== 'undefined') {
    new Swiper('.slides-1', {
      speed: 600,
      loop: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false
      },
      slidesPerView: 'auto',
      pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      }
    });

    /**
     * Init swiper slider with 2 slides at once in desktop view
     */
    new Swiper('.slides-2', {
      speed: 600,
      loop: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false
      },
      slidesPerView: 'auto',
      pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      breakpoints: {
        320: {
          slidesPerView: 1,
          spaceBetween: 20
        },

        1200: {
          slidesPerView: 2,
          spaceBetween: 20
        }
      }
    });
  }


  /**
   * Initiate pURE cOUNTER
   */
  if (typeof PureCounter !== 'undefined') {
    new PureCounter();
  }

  /**
   * Animation on scroll function and init
   */
  function aos_init() {
    if (typeof AOS !== 'undefined') {
      AOS.init({
        duration: 800,
        easing: 'slide',
        once: true,
        mirror: false
      });
    }
  }

  // Initialize AOS immediately on DOM ready
  aos_init();

  // Also refresh AOS on window load and shortly after to ensure elements are visible
  window.addEventListener('load', () => {
    aos_init();
    if (typeof AOS !== 'undefined') {
      AOS.refresh();
    }
  });

  setTimeout(() => {
    if (typeof AOS !== 'undefined') AOS.refresh();
  }, 350);
  setTimeout(() => {
    if (typeof AOS !== 'undefined') AOS.refresh();
  }, 1000);
  /**
   * What We Do Interactive
   */
  const nodeCards = document.querySelectorAll('.node-card');
  const flowGroups = document.querySelectorAll('.flow-group');
  const bannerText = document.getElementById('bannerText');
  const hubCenter = document.getElementById('hub-naragro');

  const nodeInfoMap = {
    'farmers': {
      title: 'Farmers',
      icon: '🌾',
      desc: 'Sourcing and contracting sustainable raw oilseeds, grains and agricultural commodities directly from grower networks & cooperatives.'
    },
    'crushers': {
      title: 'Crushers',
      icon: '⚙️',
      desc: 'Supplying oilseed feedstock and brokering crude vegetable oils and protein meals with optimal processing economics.'
    },
    'traders': {
      title: 'Traders',
      icon: '🌐',
      desc: 'Providing cross-border market arbitrage, liquidity, freight risk management, and competitive commodity transactions.'
    },
    'refineries': {
      title: 'Refineries',
      icon: '🏭',
      desc: 'Supplying crude vegetable oils and marketing refined, bleached & deodorized (RBD) oils and specialized vegetable fats.'
    },
    'consumers': {
      title: 'Consumers',
      icon: '👥',
      desc: 'Connecting verified, reliable commodity supplies to food manufacturers, oleochemicals, feed producers, and retail markets.'
    },
    'hub': {
      title: 'Naragro',
      icon: '🔴',
      desc: 'Agricultural commodities brokerage and consultancy firm specialized in vegetable oils and fats, bringing trust and risk management across global markets.'
    }
  };

  const defaultBannerHTML = 'Hover or tap on any market participant to explore Naragro\'s integrated agricultural supply network.';

  function activateNode(nodeId) {
    flowGroups.forEach(flow => {
      if (flow.id === `flow-${nodeId}`) {
        flow.classList.add('is-active');
        flow.classList.remove('is-dimmed');
      } else {
        flow.classList.remove('is-active');
        flow.classList.add('is-dimmed');
      }
    });

    const info = nodeInfoMap[nodeId];
    if (info && bannerText) {
      bannerText.innerHTML = `<strong>${info.icon} ${info.title}:</strong> ${info.desc}`;
    }
  }

  function resetNodes() {
    flowGroups.forEach(flow => {
      flow.classList.remove('is-active');
      flow.classList.remove('is-dimmed');
    });
    if (bannerText) {
      bannerText.innerHTML = defaultBannerHTML;
    }
  }

  nodeCards.forEach(card => {
    const nodeKey = card.getAttribute('data-node');
    card.addEventListener('mouseenter', () => activateNode(nodeKey));
    card.addEventListener('mouseleave', resetNodes);
    card.addEventListener('click', () => activateNode(nodeKey));
  });

  if (hubCenter) {
    hubCenter.addEventListener('mouseenter', () => {
      flowGroups.forEach(f => {
        f.classList.add('is-active');
        f.classList.remove('is-dimmed');
      });
      if (bannerText) {
        bannerText.innerHTML = `<strong>${nodeInfoMap.hub.icon} ${nodeInfoMap.hub.title}:</strong> ${nodeInfoMap.hub.desc}`;
      }
    });
    hubCenter.addEventListener('mouseleave', resetNodes);
  }



  // Final AOS safety initialization
  if (typeof aos_init === 'function') {
    aos_init();
  }

});