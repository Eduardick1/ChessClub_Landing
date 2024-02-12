const swiper = new Swiper(".partisipators__carousel", {
  // Optional parameters
  loop: true,
  breakpoints: {
    300: {
      slidesPerView: 1,
    },

    750: {
      slidesPerView: 2,
    },
    1200: {
      slidesPerView: 3,
    },
  },
  // If we need pagination
  pagination: {
    el: "#amountParti",
    type: "fraction",
  },

  // Navigation arrows
  navigation: {
    nextEl: ".partiSwiper-next-btn",
    prevEl: ".partiSwiper-prev-btn",
  },
  autoplay: {
    delay: 4000,
    pauseOnMouseEnter: true,
  },

  // And if we need scrollbar
  keyboard: {
    enabled: true,
    onlyInViewport: false,
  },
});

/* Which media query
 **************************************************************/

function swiperMode() {
  let mobile = window.matchMedia("(max-width: 560px)");
  const stagesContainer = document.querySelector("#stagesContainerSwiper");
  const slides = stagesContainer.querySelectorAll(".stages__blocks_item");

  // Enable (for mobile)
  if (mobile.matches) {
    stagesContainer.classList.add("stageSwiper");
    slides.forEach((slide) => slide.classList.add("swiper-slide"));
    var swiperStages = new Swiper(".stageSwiper", {
      slidesPerView: 1,
      spaceBetween: 20,
      grid: {
        rows: 1,
      },
      pagination: {
        el: ".stageSwiper-pagination",
      },

      // Navigation arrows
      navigation: {
        nextEl: ".stageSwiper-button-next",
        prevEl: ".stageSwiper-button-prev",
      },
      slidesOffsetAfter: 0,
      loopFillGroupBlank: false,
    });
  } else {
    stagesContainer.classList.remove("stageSwiper");
    slides.forEach((slide) => slide.classList.remove("swiper-slide"));
    swiperStages.destroy();
  }
}

/* On Load
 **************************************************************/
window.addEventListener("load", () => {
  swiperMode();
});

/* On Resize
 **************************************************************/
window.addEventListener("resize", () => {
  swiperMode();
});
