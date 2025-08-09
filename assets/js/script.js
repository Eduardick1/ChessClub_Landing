// SWIPER

class Sliders {
  constructor() {
    this.toggleStageSwiper();
    this.initPartisipatorsSwiper();
  }
  toggleStageSwiper() {
    const isMobile = window.matchMedia("(max-width: 600px)").matches;

    if (isMobile) this.initStageSwiper();
    else if (this.swiperStages) {
      this.swiperStages.destroy(true, true);
      this.swiperStages = null;
    }
  }
  initStageSwiper() {
    this.swiperStages = new Swiper("#stagesContainerSwiper", {
      centeredSlides: true,
      spaceBetween: 20,
      followFinger: false,
      pagination: {
        el: ".stageSwiper-pagination",
      },
      navigation: {
        nextEl: ".stageSwiper-button-next",
        prevEl: ".stageSwiper-button-prev",
      },
    });
  }
  initPartisipatorsSwiper() {
    this.swiperPartisipators = new Swiper(".partisipators__carousel", {
      loop: true,
      followFinger: false,
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
      pagination: {
        el: "#amountParti",
        type: "fraction",
      },

      navigation: {
        nextEl: ".partiSwiper-next-btn",
        prevEl: ".partiSwiper-prev-btn",
      },
      autoplay: {
        delay: 4000,
        pauseOnMouseEnter: true,
      },
    });
  }
}

// SWIPER

// TICKER
function loadTicker() {
  document.querySelectorAll(".ticker").forEach((ticker) => {
    const tickerLists = Array.from(ticker.querySelectorAll(".ticker__list"));
    if (tickerLists.length === 0) return;

    const attrOriginalCount = "data-original-count";

    const originalListsCount = parseInt(
      ticker.getAttribute(attrOriginalCount) || tickerLists.length
    );
    const originalLists = tickerLists.slice(0, originalListsCount);

    if (!ticker.hasAttribute(attrOriginalCount))
      ticker.setAttribute(attrOriginalCount, originalLists.length);

    const tickerListLenght = originalLists.reduce(
      (acc, list) => (acc += list.getBoundingClientRect().width),
      0
    );

    const multiplyTreshold = 2;

    const lengthRatio = Math.ceil(document.body.clientWidth / tickerListLenght);
    const cloneNumber = lengthRatio * multiplyTreshold;
    ticker.innerHTML = "";
    for (let i = 0; i < cloneNumber; i++) {
      originalLists.forEach((list) => ticker.appendChild(list.cloneNode(true)));
    }
  });
}
// TICKER

// PRELOADER

let isAssetsLoaded = true; // Заглушка для функционала динамической загрузки ассетов

function removePreloader() {
  const preloader = document.getElementById("preloader");
  if (!preloader) return;
  function Remove() {
    preloader.classList.add("loaded");
    setTimeout(() => preloader.remove(), 300);
  }
  let timeout = setTimeout(Remove, 3000);
  preloader
    .querySelector(".loader--item")
    .addEventListener("animationiteration", function () {
      clearTimeout(timeout);
      if (!isAssetsLoaded) return;
      Remove();
    });
}

// PRELOADER

document.addEventListener("DOMContentLoaded", () => {
  const sliders = new Sliders();
  loadTicker();
  window.addEventListener("resize", () => {
    sliders.toggleStageSwiper();
    loadTicker();
  });
  removePreloader();
});
