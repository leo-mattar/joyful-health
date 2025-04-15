// --------------- GSAP ---------------
gsap.registerPlugin(ScrollTrigger, CustomEase, Draggable, InertiaPlugin);

gsap.config({
  nullTargetWarn: false,
  trialWarn: false,
});

let mm = gsap.matchMedia();

// --------------- CUSTOM EASE ---------------
CustomEase.create("ease-out-1", "0.25, 1, 0.5, 1");
CustomEase.create("ease-in-out-1", "0.87, 0, 0.13, 1");

// --------------- GLOBAL - RELOAD AT THE TOP ---------------
window.addEventListener("beforeunload", function () {
  history.scrollRestoration = "manual";
});

// --------------- LENIS ---------------
// window.lenis = new Lenis();

// lenis.on("scroll", ScrollTrigger.update);

// gsap.ticker.add((time) => {
//   lenis.raf(time * 1000);
// });

// gsap.ticker.lagSmoothing(0);

// --------------- PAPER TIGET SIGNATURE ---------------
const pprtgr = [
  "color: #F2F3F3",
  "background: #080808",
  "font-size: 12px",
  "padding-left: 10px",
  "line-height: 2",
  "border-left: 5px solid #ff3c31",
].join(";");
console.info(
  `

%cWebsite by Paper Tiger${" "}
www.papertiger.com${"     "}

`,
  pprtgr
);

// --------------- GLOBAL FADE ---------------
function fade() {
  const fadeElements = document.querySelectorAll("[fade]");

  gsap.set(fadeElements, { opacity: 0, y: "5em" });

  ScrollTrigger.batch("[fade]", {
    once: true,
    onEnter: batch =>
      gsap.to(batch, {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "ease-out-1",
        stagger: 0.15,
      }),
  });
}

// --------------- HEADER SCROLLED ---------------
function headerScrolled() {
  const header = document.querySelector(".c-header");

  if (!header) return;

  ScrollTrigger.create({
    trigger: "body",
    start: "100 top",
    onToggle: self => {
      if (self.isActive) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
    },
  });
}

// --- GLOBAL - STATS COUNTER
function statsCounter() {
  document
    .querySelectorAll("[data-count-up='true']")
    .forEach((element, index) => {
      let thisId = "countup" + index;
      element.setAttribute("id", thisId);

      let finalValue = element.getAttribute("final-number");
      let cleanValue = finalValue.replace(/,/g, "");
      let match = cleanValue.match(/^([\d.]+)(\D*)$/);

      if (match) {
        let numberPart = match[1];
        let endNumber = parseFloat(numberPart);
        let suffix = match[2] || "";

        let decimals = element.hasAttribute("decimals")
          ? +element.getAttribute("decimals")
          : numberPart.includes(".")
          ? numberPart.split(".")[1].length
          : 0;

        let startNumber = 0;
        let duration = element.getAttribute("count-duration");
        let useCommas = finalValue.includes(",");

        let myCounter = new CountUp(
          thisId,
          startNumber,
          endNumber,
          decimals,
          duration,
          {
            suffix: suffix,
            useGrouping: useCommas,
            decimalPlaces: decimals,
          }
        );

        ScrollTrigger.create({
          trigger: element,
          start: "top bottom",
          onEnter: () => {
            gsap.to(element, {
              delay: index * 0.1,
              onStart: () => myCounter.start(),
            });
          },
        });
      } else {
        console.error(`Invalid final-number attribute: ${finalValue}`);
      }
    });
}

function industryCardHover() {
  const cards = document.querySelectorAll(".c-card");

  cards.forEach(card => {
    const bg = card.querySelector(".c-img-contain.card-bg");
    const desc = card.querySelector(".c-card-desc");

    const tl = gsap.timeline({
      paused: true,
      defaults: {
        ease: "ease-in-out-1",
        duration: 0.8,
      },
    });

    gsap.set(desc, { y: "2em" });

    tl.to(bg, { filter: "blur(30px)", scale: 1.25 });
    tl.to(desc, { height: "auto", opacity: 1, y: 0 }, 0);

    card.addEventListener("mouseenter", function () {
      tl.restart();
    });

    card.addEventListener("mouseleave", function () {
      tl.reverse();
    });
  });
}

// --------------- SPLIT TEXT ---------------
function splitTextInit() {
  document.querySelectorAll("[data-split-txt]").forEach(element => {
    element.splitInstance = new SplitType(element, { types: "words, chars" });
  });
}

function headingsAnimation() {
  const headings = document.querySelectorAll("[data-heading-animate]");

  // headings.forEach(heading => {
  //   const chars = heading.querySelectorAll(".char");
  //   const tl = gsap.timeline({
  //     scrollTrigger: {
  //       trigger: heading,
  //       start: "top 80%",
  //       once: true,
  //     }
  //   });

  //   gsap.set(headings, { opacity: 1 });
  //   gsap.set(chars, { opacity: 0, yPercent: 100 });

  //   tl.to(chars, {
  //     opacity: 1,
  //     yPercent: 0,
  //     duration: 1.6,
  //     ease: "ease-out-1",
  //     stagger: { amount: 0.4 },
  //     onComplete: () => {
  //       if (heading.splitInstance) {
  //         // heading.splitInstance.revert();
  //       }
  //     }
  //   });

  // });

  gsap.set(headings, { opacity: 0, y: "5em" });

  ScrollTrigger.batch(headings, {
    once: true,
    onEnter: batch =>
      gsap.to(batch, {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "ease-out-1",
        stagger: 0.15,
      }),
  });
}

// --------------- FAQ ACCORDIONS ---------------
function faqAccordions() {
  const accordions = document.querySelectorAll(".c-ac-item");
  let active = null;

  if (accordions.length === 0) return;

  accordions.forEach((accordion, index) => {
    const question = accordion.querySelector(".c-ac-toggle");
    const response = accordion.querySelector(".c-ac-list");
    const arrow = accordion.querySelector(".c-icon.ac-arrow");

    const tl = gsap.timeline({
      paused: true,
      defaults: {
        ease: "ease-in-out-1",
        duration: 0.8,
      },
    });

    tl.to(response, { height: "auto" }, 0);
    tl.to(arrow, { rotation: 180 }, 0);

    accordion.tl = tl;

    accordion.addEventListener("click", function () {
      if (active === accordion) {
        tl.reverse();
        active = null;
      } else {
        if (active) active.tl.reverse();
        tl.play();
        active = accordion;
      }
    });

    // if (index === 0) {
    //   accordion.click();
    // }
  });
}

// --------------- TESTIMONIALS SLIDER ---------------
function testimonialsTabber() {
  const quotesWrap = document.querySelectorAll(".c-quote-tab-wrap");
  if (quotesWrap.length === 0) return;

  quotesWrap.forEach(quote => {
    const tabs = quote.querySelectorAll(".c-quote-tab");
    const tabLinks = quote.querySelectorAll(".c-quote-tab-link");
    let currentIndex = 0;
    let isAnimating = false;
    let progressBarTween = null;
    let initialLoad = true;

    function animateProgressBar(progressBar) {
      if (progressBarTween) progressBarTween.kill();

      gsap.set(progressBar, { width: "0%" });

      progressBarTween = gsap.to(progressBar, {
        width: "100%",
        duration: 7,
        ease: "none",
        onComplete: () => {
          if (!isAnimating) {
            const nextIndex = (currentIndex + 1) % tabs.length;
            changeSlide(nextIndex);
          }
        },
      });
    }

    function changeSlide(index) {
      if (isAnimating) return;

      isAnimating = true;

      if (progressBarTween) progressBarTween.kill();

      tabLinks.forEach((otherLink, i) => {
        const progressBar = otherLink.querySelector(
          ".c-quote-tab-link-progress-bar"
        );

        if (i === index) {
          otherLink.classList.add("is-active");
          tabs[i].classList.add("is-active");

          setTimeout(() => {
            animateProgressBar(progressBar);
            isAnimating = false;
          }, 100);
        } else {
          otherLink.classList.remove("is-active");
          tabs[i].classList.remove("is-active");

          gsap.set(progressBar, { width: "0%" });
        }
      });

      currentIndex = index;
      initialLoad = false;
    }

    tabLinks.forEach((link, index) => {
      link.addEventListener("click", function () {
        changeSlide(index);
      });
    });

    changeSlide(0);
  });
}

// --------------- TESTIMONIALS TABBER MOBILE DOM ---------------
function testimonialsTabberMobile() {
  const sectionHeading = document.querySelector(".c-quote-main-title");
  if (!sectionHeading) return;

  const tabs = document.querySelectorAll(".c-quote-tab");

  tabs.forEach(tab => {
    const headingClone = sectionHeading.cloneNode(true);
    tab.prepend(headingClone);
  });

  sectionHeading.remove();
}

// --------------- TESTIMONIALS TABBER MOBILE REVERT DOM ---------------
function testimonialsTabberMobileRevert() {
  const storiesRow = document.querySelector(".o-row.stories");
  if (!storiesRow) return;

  const clonedHeadings = document.querySelectorAll(
    ".c-quote-tab .c-quote-main-title"
  );
  if (clonedHeadings.length > 0) {
    storiesRow.prepend(clonedHeadings[0]);
  }

  clonedHeadings.forEach((heading, index) => {
    if (index > 0) heading.remove();
  });
}

// --------------- TEAM SLIDER ---------------
function teamSlider() {
  const slider = new Swiper(".swiper.team", {
    slidesPerView: "auto",

    speed: 600,
    grabCursor: true,
    pagination: {
      el: ".swiper-pagination.team",
      type: "progressbar",
    },
    navigation: {
      nextEl: ".swiper-next.team",
      prevEl: ".swiper-prev.team",
    },
    breakpoints: {
      320: {
        spaceBetween: 16,
      },
      992: {
        spaceBetween: 32,
      },
    },
  });
}

// --------------- TABBER ---------------
function tabber() {
  const quotesWrap = document.querySelectorAll(".o-row.tabber");
  if (quotesWrap.length === 0) return;

  quotesWrap.forEach(quote => {
    const tabs = quote.querySelectorAll(".c-img-contain.tabber-thumb");
    const tabLinks = quote.querySelectorAll(".c-tabber-link");
    let currentIndex = 0;
    let isAnimating = false;
    let progressBarTween = null;
    let initialLoad = true;

    function animateProgressBar(progressBar) {
      if (progressBarTween) progressBarTween.kill();

      gsap.set(progressBar, { width: "0%" });

      progressBarTween = gsap.to(progressBar, {
        width: "100%",
        duration: 7,
        ease: "none",
        onComplete: () => {
          if (!isAnimating) {
            const nextIndex = (currentIndex + 1) % tabs.length;
            changeSlide(nextIndex);
          }
        },
      });
    }

    function changeSlide(index) {
      if (isAnimating) return;

      isAnimating = true;

      if (progressBarTween) progressBarTween.kill();

      tabLinks.forEach((otherLink, i) => {
        const progressBar = otherLink.querySelector(".c-tabber-progress-bar");

        if (i === index) {
          otherLink.classList.add("is-active");
          tabs[i].classList.add("is-active");

          setTimeout(() => {
            animateProgressBar(progressBar);
            isAnimating = false;
          }, 100);
        } else {
          otherLink.classList.remove("is-active");
          tabs[i].classList.remove("is-active");

          gsap.set(progressBar, { width: "0%" });
        }
      });

      currentIndex = index;
      initialLoad = false;
    }

    tabLinks.forEach((link, index) => {
      link.addEventListener("click", function () {
        changeSlide(index);
      });
    });

    changeSlide(0);
  });
}

// --------------- DTB TABBER ---------------
function dtbTabber() {
  const cards = document.querySelectorAll(".c-dtb-card");
  const links = document.querySelectorAll(".c-dtb-nav-link");
  if (cards.length === 0) return;

  links.forEach((link, index) => {
    link.addEventListener("click", function () {
      links.forEach(otherLink => otherLink.classList.remove("is-active"));
      link.classList.add("is-active");

      cards.forEach(otherCard => otherCard.classList.remove("is-active"));
      cards[index].classList.add("is-active");
    });
  });

  links[0].click();
}

// --------------- STORYBOARD ANIMATION ---------------
function storyboardAnimation() {
  const header = document.querySelector(".c-header");
  const sectionTrigger = document.querySelector(".c-section.sb");
  if (!sectionTrigger) return;

  const tl = gsap.timeline({
    defaults: {
      duration: 0.8,
      ease: "ease-out-1",
    },
    scrollTrigger: {
      trigger: sectionTrigger,
      start: "top center",
      onEnter: () => {
        header.classList.add("sb-is-animating");
        tl.play();
      },
      onLeave: () => {
        header.classList.remove("sb-is-animating");
        tl.pause();
      },
      onEnterBack: () => {
        header.classList.add("sb-is-animating");
        tl.play();
      },
      onLeaveBack: () => {
        header.classList.remove("sb-is-animating");
        tl.pause();
      },
    },
    repeat: -1,
  });

  gsap.set([".c-sb-o", ".c-sb-o path"], {
    transformOrigin: "center center",
    scale: 0.3,
    opacity: 0,
  });

  gsap.set(".c-img-contain.sb-graph", {
    opacity: 1,
    overflow: "hidden",
  });

  gsap.set(".c-sb-txt", {
    opacity: 1,
  });

  tl.to([".c-sb-o", ".c-sb-o path"], {
    duration: 1.2,
    scale: 1,
    opacity: 1,
  });

  tl.from(
    "[sb-heading-1]",
    {
      duration: 1.4,
      y: "6em",
      opacity: 0,
    },
    "<0.6"
  );

  tl.from(
    ".c-sb-tag",
    {
      duration: 1,
      x: window.innerWidth <= 991 ? undefined : 0,
      y: window.innerWidth <= 991 ? undefined : 0,
      stagger: 0.1,
      opacity: 0,
    },
    "<0.2"
  );

  tl.from(
    ".c-img-contain.sb-artwork",
    {
      duration: 1,
      scale: window.innerWidth <= 991 ? 1 : 0,
      opacity: 0,
      stagger: 0.1,
    },
    ">"
  );

  tl.to(
    "[sb-heading-1]",
    {
      opacity: 0,
    },
    ">0.4"
  );

  tl.to(
    ".c-sb-o path",
    {
      opacity: 0.3,
      fill: "rgba(244, 240, 228, 1)",
    },
    "<0.4"
  );

  tl.to(
    ".c-sb-o-fill",
    {
      opacity: 1,
      scale: 0.4,
    },
    "<"
  );

  tl.to(
    ".c-sb-o",
    {
      scale: 0.4,
    },
    "<"
  );

  tl.to(
    ".c-sb-tag",
    {
      duration: 1,
      x: 0,
      y: 0,
      stagger: 0.05,
      opacity: 0,
    },
    "<0.4"
  );

  tl.to(
    ".c-img-contain.sb-artwork",
    {
      scale: 0,
      opacity: 0,
      stagger: 0.05,
    },
    "<"
  );

  tl.to(
    [".c-sb-o", ".c-sb-o-fill"],
    {
      duration: 1.4,
      scale: 0,
      y: "12em",
    },
    ">0.4"
  );

  tl.from(
    ".c-img-contain.sb-graph",
    {
      duration: 1,
      scale: 0,
      y: "10em",
      borderRadius: "50%",
      onComplete: () => {
        gsap.set(".c-img-contain.sb-graph", {
          overflow: "visible",
        });
      },
    },
    "<0.5"
  );

  tl.from(
    ".c-img-contain.sb-graph-3",
    {
      opacity: 0,
      y: "24em",
    },
    ">"
  );

  tl.from(
    ".c-img-contain.sb-graph-2",
    {
      opacity: 0,
      y: "16em",
    },
    "<0.3"
  );

  tl.from(
    ".c-sb-txt",
    {
      duration: 1,
      y: "9em",
      opacity: 0,
    },
    "<-0.8"
  );

  tl.to(
    ".c-sb-inner > *:not(.c-img-contain.sb-bg)",
    {
      opacity: 0,
    },
    ">4"
  );

  // GSDevTools.create({ animation: tl });
}

const homepage = document.querySelector("[data-page='homepage']");

function homepageReload() {
  window.addEventListener("resize", function () {
    setTimeout(() => {
      location.reload();
    }, 150);
  });
}

// --------------- BLOG FILTERS ---------------
function blogFilters() {
  const filterList = document.querySelector(".c-blog-filter-list");
  if (!filterList) return;
  const allBtn = document.querySelector("[data-filter-all-btn]");
  filterList.prepend(allBtn);

  const filterSection = document.querySelector(".c-section.blog-filter");

  const buttons = [
    ...document.querySelectorAll(".c-pagination-btn"),
    ...document.querySelectorAll(".c-pagination-page-btn"),
  ];

  //   buttons.forEach(button => {
  //     button.addEventListener("click", () => {
  //       setTimeout(() => {
  //         ScrollTrigger.refresh();
  //         lenis.scrollTo(filterSection, { offset: -180 });
  //       }, 200);
  //     });
  //   });
}

function resourceAPIChecker() {
  const filterSection = document.querySelector(".c-section.blog-filter");
  if (!filterSection) return;

  window.fsAttributes = window.fsAttributes || [];
  window.fsAttributes.push([
    "cmsfilter",
    filterInstances => {
      const [filterInstance] = filterInstances;

      filterInstance.listInstance.on("renderitems", renderedItems => {
        blogFilters();
      });
    },
  ]);
}

// --------------- CAREERS STRUCTURE ---------------
function careersStructure() {
  let teamItems = document.querySelectorAll("[data-careers-item]");
  if (teamItems.length === 0) return;

  teamItems.forEach(function (cmsItem) {
    let itemCategory = cmsItem
      .querySelector("[data-group-name]")
      .textContent.trim();

    let groupItems = document.querySelectorAll(".c-careers-group-item");
    groupItems.forEach(function (group) {
      let groupCategory = group
        .querySelector("[data-group-title]")
        .textContent.trim();

      if (groupCategory === itemCategory) {
        group.querySelector("[data-careers-list]").appendChild(cmsItem);
      }
    });
  });
}

// --------------- HEADER DESKTOP ---------------
function headerDesktop() {
  const header = document.querySelector(".c-header");
  const headerNav = document.querySelector(".c-header-nav");

  if (!header || !headerNav) return;

  let cleanupListeners = [];

  // --- HEADER DROPDOWN LINKS
  const overlay = document.querySelector(".c-header-overlay");
  const ddItems = document.querySelectorAll(".c-header-dd-item");
  const listItems = document.querySelectorAll(".c-header-dd-group");

  ddItems.forEach(item => {
    const list = item.querySelector(".c-header-dd-group");
    const toggle = item.querySelector(".c-header-dd-toggle");

    const toggleHandler = function (event) {
      event.stopPropagation();

      // Close all other items and remove .is-active from them
      ddItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove("is-active");
          const otherList = otherItem.querySelector(".c-header-dd-group");
          if (otherList) {
            otherList.classList.remove("is-open");
          }
        }
      });

      // Toggle the current item
      list.classList.toggle("is-open");
      item.classList.toggle("is-active");

      // Check if any dropdown is open and toggle overlay accordingly
      const isAnyDropdownOpen = [...ddItems].some(item =>
        item.classList.contains("is-active")
      );
      overlay.classList.toggle("is-active", isAnyDropdownOpen);
    };

    toggle.addEventListener("click", toggleHandler);
    cleanupListeners.push(() =>
      toggle.removeEventListener("click", toggleHandler)
    );
  });

  // --- CLOSE ITEMS WHEN CLICKING OUTSIDE
  const documentClickHandler = function (event) {
    // Check if the click target is inside any dropdown
    const isClickInsideDropdown = [...ddItems].some(item =>
      item.contains(event.target)
    );

    // If the click is outside, close the dropdowns
    if (!isClickInsideDropdown) {
      ddItems.forEach(item => item.classList.remove("is-active"));
      listItems.forEach(item => item.classList.remove("is-open"));
      overlay.classList.remove("is-active");
    }
  };
  document.addEventListener("click", documentClickHandler);
  cleanupListeners.push(() =>
    document.removeEventListener("click", documentClickHandler)
  );

  // --- CLOSE ITEMS ON ESC KEY PRESS
  const escKeyHandler = function (event) {
    if (event.key === "Escape") {
      ddItems.forEach(item => item.classList.remove("is-active"));
      listItems.forEach(item => item.classList.remove("is-open"));
      overlay.classList.remove("is-active");
    }
  };
  document.addEventListener("keydown", escKeyHandler);
  cleanupListeners.push(() =>
    document.removeEventListener("keydown", escKeyHandler)
  );

  return () => cleanupListeners.forEach(cleanup => cleanup());
}

// --------------- HEADER MOBILE ---------------
function headerMobile() {
  if (!document.querySelector(".c-header")) return;
  let cleanupListeners = [];

  const trigger = document.querySelector(".c-header-nav-btn");
  const nav = document.querySelector(".c-header-nav");
  const navInnerWrap = document.querySelector(".c-header-inner");
  const headerRight = document.querySelector(".c-btn-group.header");
  const menuLine1 = document.querySelectorAll(".c-nav-bar.is-1");
  const menuLine2 = document.querySelectorAll(".c-nav-bar.is-2");
  const menuLine3 = document.querySelectorAll(".c-nav-bar.is-3");
  const menuIconWrap = document.querySelector(".c-header-bar-icon");
  const headerCTA = document.querySelector(".c-header-cta");
  let navStatus = "closed";

  const tl = gsap.timeline({
    paused: true,
    defaults: {
      ease: "ease-in-out-1",
      duration: 0.8,
    },
  });

  gsap.set(menuLine1, { transformOrigin: "center center" });
  gsap.set(menuLine2, { transformOrigin: "center center" });
  gsap.set(menuLine3, { transformOrigin: "center center" });

  tl.fromTo(
    nav,
    { clipPath: "inset(0% 0% 100% 0%)" },
    { clipPath: "inset(0% 0% 0% 0%)" }
  );
  tl.to(menuLine1, { rotation: 45, y: 5 }, 0);
  tl.to(menuLine2, { width: 0 }, 0);
  tl.to(menuLine3, { rotation: -45, y: -5 }, 0);
  tl.to(menuIconWrap, { rotation: 180 }, 0);

  const triggerHandler = function () {
    if (navStatus === "closed") {
      tl.restart();
      //   lenis.stop();
      navStatus = "open";
      document.querySelector(".c-header").classList.add("is-open");
      document.querySelector("body").classList.add("no-scroll");
    } else {
      tl.reverse();
      //   lenis.start();
      navStatus = "closed";
      document.querySelector(".c-header").classList.remove("is-open");
      document.querySelector("body").classList.remove("no-scroll");
    }
  };
  trigger.addEventListener("click", triggerHandler);
  cleanupListeners.push(() =>
    trigger.removeEventListener("click", triggerHandler)
  );

  // Accordions
  let accordions = document.querySelectorAll(".c-header-dd-item");
  let active = null;

  // accordions.forEach(accordion => {
  //   const list = accordion.querySelector(".c-header-dd-group");
  //   const arrow = accordion.querySelector(".c-icon.dd-arrow");
  //   let tl = gsap.timeline({
  //     paused: true,
  //     defaults: {
  //       duration: 0.8,
  //       ease: "ease-in-out-1",
  //     },
  //     onStart: () => accordion.classList.add("is-open"),
  //     onReverse: () => accordion.classList.remove("is-open")
  //   });

  //   tl.to(list, { height: "auto", opacity: 1 }, 0);
  //   tl.to(arrow, { rotation: 180 }, 0);

  //   accordion.tl = tl;

  //   const accordionHandler = function (e) {
  //     e.stopPropagation();

  //     if (active && active === accordion) {
  //       // If clicking the already active accordion, close it
  //       accordion.tl.reverse();
  //       active = null; // Reset active since it's closed
  //     } else {
  //       if (active) active.tl.reverse(); // Close the previously active accordion
  //       accordion.tl.play(); // Open the clicked accordion
  //       active = accordion; // Set the new active accordion
  //     }
  //   };
  //   accordion.addEventListener("click", accordionHandler);
  //   cleanupListeners.push(() =>
  //     accordion.removeEventListener("click", accordionHandler)
  //   );
  // });

  accordions.forEach(accordion => {
    const list = accordion.querySelector(".c-header-dd-group");
    const arrow = accordion.querySelector(".c-icon.dd-arrow");
    let tl = gsap.timeline({
      paused: true,
      defaults: {
        duration: 0.8,
        ease: "ease-in-out-1",
      },
    });

    tl.to(list, { height: "auto", opacity: 1 });
    accordion.tl = tl;

    const accordionHandler = function (e) {
      e.stopPropagation();
      if (active && active === accordion) {
        // If clicking the already active accordion, close it
        accordion.tl.reverse();
        accordion.classList.remove("is-open");
        active = null; // Reset active since it's closed
      } else {
        if (active) {
          active.tl.reverse();
          active.classList.remove("is-open");
        }
        accordion.tl.play(); // Open the clicked accordion
        accordion.classList.add("is-open");
        active = accordion; // Set the new active accordion
      }
    };

    accordion.addEventListener("click", accordionHandler);
    cleanupListeners.push(() =>
      accordion.removeEventListener("click", accordionHandler)
    );
  });

  // Header right
  nav.appendChild(headerCTA);
  gsap.set(headerCTA, { display: "flex" });

  return () => cleanupListeners.forEach(cleanup => cleanup());
}

// --------------- HOME LOADER ---------------
function homeLoader() {
  const sectionWrap = document.querySelector("[data-home-hero]");
  if (!sectionWrap) return;

  const textRow = sectionWrap.querySelector(".o-row.hm-hero");
  const visualRow = sectionWrap.querySelector(".c-img-contain.hm-hero-visual");
  const bg = document.querySelector(".c-img-contain.hm-hero-bg");

  const tl = gsap.timeline({
    defaults: {
      duration: 1.2,
      ease: "ease-out-1",
    },
  });

  gsap.set([textRow, visualRow], { y: "6em" });

  tl.to(bg, { opacity: 1 });
  tl.to(textRow, { y: "0em", opacity: 1 }, "<");
  tl.to(visualRow, { y: "0em", opacity: 1 }, "<0.2");
}

// --------------- BUTTONS HOVER EFFECT ---------------
function buttonHover() {
  $(
    "[data-btn='wrap']:not([data-wf--global-button--settings-style='inline'])"
  ).each(function () {
    const clipEl = $(this)
      .find("[data-btn='clip']")
      .attr("aria-hidden", "true");
    const durationSetting = 0.4;
    const easeSetting = "power2.inOut";

    function getPercentTop(el, e) {
      let elTop = el.offset().top - $(window).scrollTop();
      let mouseTop = e.pageY - $(window).scrollTop() - elTop;
      return (mouseTop / el.innerHeight()) * 100;
    }

    function getPercentLeft(el, e) {
      let elLeft = el.offset().left;
      let mouseLeft = e.pageX - elLeft;
      return (mouseLeft / el.innerWidth()) * 100;
    }

    let initialBorderColor = $(this).css("border");

    $(this).on("mouseenter", function (e) {
      let percentTop = getPercentTop($(this), e);
      let percentLeft = getPercentLeft($(this), e);
      gsap.set(clipEl, { display: "flex" });
      gsap.fromTo(
        clipEl,
        { clipPath: `circle(0% at ${percentLeft}% ${percentTop}%)` },
        {
          clipPath: `circle(141.4% at ${percentLeft}% ${percentTop}%)`,
          duration: durationSetting,
          ease: easeSetting,
        }
      );
      gsap.to($(this), {
        border: "1px solid rgba(31, 27, 4, 1)",
        duration: durationSetting,
        ease: easeSetting,
      });
    });
    $(this).on("mouseleave", function (e) {
      let percentTop = getPercentTop($(this), e);
      let percentLeft = getPercentLeft($(this), e);
      gsap.to(clipEl, {
        clipPath: `circle(0% at ${percentLeft}% ${percentTop}%)`,
        overwrite: true,
        duration: durationSetting,
        ease: easeSetting,
      });
      gsap.to($(this), {
        border: initialBorderColor,
        duration: durationSetting,
        ease: easeSetting,
      });
    });
  });
}

// --------------- INFO STATS ---------------
function homeInfoMobile() {
  const statsInfo = document.querySelector(".c-stats-info");
  if (!statsInfo) return;

  let draggable = Draggable.create(statsInfo, {
    type: "x",
    bounds: ".o-row.stats-info",
    inertia: true,
    onDrag: updateProgressBar,
    onThrowUpdate: updateProgressBar,
    onPress: function () {
      gsap.set(this.target, { zIndex: 1 });
    },
    onRelease: function () {
      gsap.set(this.target, { zIndex: "" });
    },
  })[0];

  function updateProgressBar() {
    let progress = 1 - (this.x - this.minX) / (this.maxX - this.minX);
    gsap.to(".c-stats-info-progress-bar", {
      width: `${progress * 100}%`,
      ease: "none",
    });
  }

  // Set initial width on page load
  updateProgressBar.call(draggable);
}

// --------------- CASE TESTIMONIALS MARQUEE ---------------
function caseTestimonialsMarquee() {
  const wrap = document.querySelector(".c-case-wrap");
  if (!wrap) return;

  const list = document.querySelector(".c-case-list");
  const duplicatedList = list.cloneNode(true);

  wrap.appendChild(duplicatedList);

  const caseItems = wrap.querySelectorAll(".c-case-item").length;
  const marqueeDuration =
    window.innerWidth <= 479 ? caseItems * 12 : caseItems * 9;

  const tl = gsap.timeline();
  tl.to([list, duplicatedList], {
    xPercent: -100,
    duration: marqueeDuration,
    ease: "linear",
    repeat: -1,
  });
}

// --------------- INIT ---------------
function init() {
  statsCounter();
  faqAccordions();
  testimonialsTabber();
  teamSlider();
  tabber();
  dtbTabber();
  blogFilters();
  resourceAPIChecker();
  careersStructure();
  storyboardAnimation();
  caseTestimonialsMarquee();
  if (homepage) {
    homeLoader();
  }
  headerScrolled();
}

init();

// --------------- MATCHMEDIA (DESKTOP) ---------------
mm.add("(min-width: 992px)", () => {
  const headerCleanup = headerDesktop();
  industryCardHover();
  splitTextInit();
  headingsAnimation();
  fade();
  buttonHover();
  // storyboardAnimation();
  if (homepage) {
    homepageReload();
  }
  return () => {
    headerCleanup();
  };
});

// --------------- MATCHMEDIA (TABLET AND MOBILE) ---------------
mm.add("(max-width: 991px)", () => {
  testimonialsTabberMobile();

  const headerCleanup = headerMobile();
  //   document
  //     .querySelector(".c-header-nav")
  //     .setAttribute("data-lenis-prevent", "");
  if (homepage) {
    homeInfoMobile();
  }
  return () => {
    headerCleanup();
    // document
    //   .querySelector(".c-header-nav")
    //   .removeAttribute("data-lenis-prevent", "");
    document
      .querySelector(".c-btn-group.header")
      .appendChild(document.querySelector(".c-header-cta"));
    testimonialsTabberMobileRevert();
  };
});
