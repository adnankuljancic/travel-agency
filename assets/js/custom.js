$(document).ready(function () {
  $("main#spapp > section").height($(document).height() - 60);

  var app = $.spapp({ pageNotFound: "error_404" }); // initialize

  // define routes
  app.route({

    view: "home",
    load: "home.html"
  });
  app.route({ view: "view_2", load: "view_2.html" });

  // run app
  app.run();
});
