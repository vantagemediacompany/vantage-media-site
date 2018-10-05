$(document).ready(function() {
  const t1 = new TimelineMax({ paused: true });

  //   Menu animations
  t1.to(".btn-line-one", 0.8, {
    y: 6,
    rotation: 45,
    ease: Expo.easeInOut
  });

  t1.to(".btn-line-two", 0.8, {
    y: -18,
    rotation: -45,
    ease: Expo.easeInOut,
    delay: -0.8
  });

  t1.to(".menu-span", 0.8, {
    opacity: 0,
    ease: Expo.easeInOut,
    delay: -1
  });

  t1.to(".menu", 1, {
    top: "0%",
    ease: Expo.easeInOut,
    delay: -1
  });

  t1.staggerFrom(
    ".menu ul li",
    1,
    { x: -200, opacity: 0, ease: Expo.easeOut },
    0.3
  );

  t1.reverse();
  $(document).on("click", ".menu-btn", function() {
    t1.reversed(!t1.reversed());
  });

  // NavBar black animation on scroll
  $(window).on("scroll", function() {
    if ($(window).scrollTop()) {
      $(".navbar").addClass("black");
    } else {
      $(".navbar").removeClass("black");
    }
  });

  //   Scroll reveal animations
  window.sr = ScrollReveal();
  sr.reveal(".menu-btn", {
    mobile: false,
    duration: 2000,
    origin: "right",
    distance: "300px"
  });
  sr.reveal(".menu-branding", {
    mobile: false,
    duration: 2000,
    origin: "left",
    distance: "300px"
  });
  sr.reveal(".border", {
    mobile: false,
    duration: 2000,
    origin: "bottom",
    distance: "50px"
  });
  sr.reveal(".icons", {
    mobile: false,
    duration: 250,
    origin: "bottom",
    distance: "300px"
  });
  sr.reveal(".services", {
    mobile: false,
    duration: 1000,
    origin: "bottom",
    distance: "300px"
  });
  sr.reveal(".bottomFadeIn", {
    mobile: false,
    duration: 1000,
    origin: "bottom",
    distance: "50px"
  });
  sr.reveal(".topFadeIn", {
    mobile: false,
    duration: 1000,
    origin: "top",
    distance: "50px"
  });
  sr.reveal(".leftFadeIn", {
    mobile: false,
    duration: 1000,
    origin: "left",
    distance: "50px"
  });
  sr.reveal(".rightFadeIn", {
    mobile: false,
    duration: 1000,
    origin: "right",
    distance: "50px"
  });

  // Closing tag for document.ready
});
