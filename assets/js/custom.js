$(document).ready(function () {
  $("main#spapp > section").height($(document).height()-150);

  var app = $.spapp({ pageNotFound: "error_404" }); // initialize

  // define routes
  app.route({
    view: "home",
    load: "home.html",
  });
  app.route({ view: "view_2", load: "view_2.html" });
  app.route({ view: "login", load: "login.html" });
  app.route({ view: "register", load: "register.html" });
  app.route({ view: "about", load: "about.html" });
  app.route({ view: "trips", load: "trips.html" });
  app.route({ view: "contact", load: "contact.html" });

  // run app
  app.run();
});
