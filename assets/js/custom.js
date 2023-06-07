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
  app.route({ view: "about", load: "about.html" });

  // run app
  app.run();
});
