$(document).ready(function() {
  // Barba transition
  var transEffect = Barba.BaseTransition.extend({
    start: function() {
      this.newContainerLoading.then(val =>
        this.fadeInNewcontent($(this.newContainer))
      );
    },
    fadeInNewcontent: function(nc) {
      nc.hide();
      var _this = this;
      $(this.oldContainer)
        .fadeOut(1000)
        .promise()
        .done(() => {
          nc.css("visibility", "visible");
          nc.fadeIn(1000, function() {
            _this.done();
          });
        });
    }
  });
  Barba.Pjax.getTransition = function() {
    return transEffect;
  };
  Barba.Pjax.start();

  // Menu toggle-button
  $(".menu-btn").on("click", function() {
    $("nav ul").toggleClass("showing");
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
  sr.reveal(".menu-nav li", {
    duration: 2000,
    origin: "right",
    distance: "300px"
  });
  sr.reveal(".menu-branding", {
    duration: 2000,
    origin: "left",
    distance: "300px"
  });
  sr.reveal(".border", {
    duration: 2000,
    origin: "bottom",
    distance: "50px"
  });
  sr.reveal(".icons", {
    duration: 250,
    origin: "bottom",
    distance: "300px"
  });
  sr.reveal(".services", {
    duration: 1000,
    origin: "bottom",
    distance: "300px"
  });
  sr.reveal(".bottomFadeIn", {
    duration: 1000,
    origin: "bottom",
    distance: "50px"
  });
  sr.reveal(".topFadeIn", {
    duration: 1000,
    origin: "top",
    distance: "50px"
  });
  sr.reveal(".leftFadeIn", {
    duration: 1000,
    origin: "left",
    distance: "50px"
  });
  sr.reveal(".rightFadeIn", {
    duration: 1000,
    origin: "right",
    distance: "50px"
  });

  // Closing tag for document.ready
});
