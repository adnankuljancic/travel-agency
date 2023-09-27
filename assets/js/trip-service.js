var TripService = {
  init: function () {
    $.ajax({
      url: "rest/trips",
      type: "GET",
      dataType: "json",
      success: function (data) {
        console.log(data);
        TripService.listTrips(data);
      },
      error: function (xhr, status, error) {
        console.error(error);
      },
    });
  },

  listTrips: function (data) {
    var html = "";
    for (var i = 0; i < data.length; i++) {
      html +=
        "<div class='col'><div class='card m-3' style='width: 18rem'>" +
        "<img src='https://i.natgeofe.com/n/5de6e34a-d550-4358-b7ef-4d79a09c680e/aerial-beach-miami-florida_16x9.jpg'" +
        "class='card-img-top' alt='...' /> " +
        " <div class='card-body'> <h3 class='card-title'> " +
        data[i].name +
        "</h3> <p class='card-text'>" +
        data[i].description +
        "</p> <a href='#' class='btn btn-primary'>Go somewhere</a> </div></div></div>";
    }
    $("#trips-div").html(html);
  },
};
