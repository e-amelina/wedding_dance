const burger = document.querySelector('.navigation__burger');
const menu = document.querySelector('.navigation__menu');
const logo = document.querySelector('.navigation__logo');
const body = document.querySelector('body');


burger.addEventListener('click', () => {
    burger.classList.toggle('active');
    menu.classList.toggle('active');
    logo.classList.toggle('active');
    body.classList.toggle('lock');
});

new WOW().init();

const swiperServices = new Swiper('.services', {
    loop: false, 
    direction: 'horizontal',

    pagination: {
      el: '.swiper-pagination-services',
    },

    breakpoints: {
        320: {
            slidesPerView: 1.3,
            spaceBetween: 12,
        },
        769: {
            slidesPerView: 2.25,
            spaceBetween: 12,
        },
        1025: {
            slidesPerView: 3,
            spaceBetween: 16,
        }
    },

    watchOverflow: false,
    height: 451,
    initialSlide:1,
});


const swiperCoaches = new Swiper('.coaches', {
    loop: false, 
    direction: 'horizontal',

    pagination: {
      el: '.swiper-pagination-coaches',
      clicable: true,
    },

    navigation: {
        nextEl: '.icon-rightArrow',
        prevEl: '.icon-leftArrow',
    },
    
    breakpoints: {
        320: {
            slidesPerView: 1.3,
            spaceBetween: 11,
            pagination: {
                type: 'bullets',
            }
        },
        769: {
            slidesPerView: 1.7,
            pagination: {
                type: 'bullets',
            }
        },        
        1025: {
            slidesPerView: 2,
            spaceBetween: 16,
            pagination: {
                type: 'custom',
                renderCustom: function (swiperCoaches, current, total) {
                    return current + ' of ' + total;
                  },
            }
        }
    }
});
