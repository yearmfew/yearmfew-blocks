import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import gsap from 'gsap';

document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.postonic-slider-swiper').forEach(function (swiperEl) {
        const parent = swiperEl.closest('.wp-block-yearmfew-blocks-postonic-slider');
        const showPagination = parent?.dataset.showPagination === 'true';
        const showNavigation = parent?.dataset.showNavigation === 'true';
        const sliderId = swiperEl.getAttribute('id');
        const swiper = new Swiper(swiperEl, {
            modules: [Navigation, Pagination],
            loop: true,
            spaceBetween: 24,
            slidesPerView: 1,
            pagination: showPagination ? {
                el: `#${sliderId}-pagination`,
                clickable: true
            } : false,
            navigation: showNavigation ? {
                nextEl: `#${sliderId}-next`,
                prevEl: `#${sliderId}-prev`
            } : false,
            on: {
                init: function (swiper) {
                    // GSAP ile giriş animasyonu Swiper hazır olduğunda başlar
                    gsap.from(swiper.slides, {
                        opacity: 0,
                        y: 40,
                        stagger: 0.1,
                        duration: 0.7,
                        ease: 'power2.out',
                    });
                }
            }
        });

    });
});
