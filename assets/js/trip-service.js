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
        "<div class='col'><div class='card m-3' style='width: 24rem' data-id='" +
        data[i].id +
        "'>" +
        "<img src='" +
        data[i].image_link +
        "' class='card-img-top' alt='...' /> " +
        " <div class='card-body'> <h3 class='card-title'> " +
        data[i].name +
        "</h3> <p style='color: #4761FF'>" +
        data[i].price +
        "BAM</p><p class='card-text'>" +
        data[i].short_description +
        "</p> <a href='#trip-details' class='btn btn-primary see-more-button'>See more</a> </div></div></div>";
    }
    $("#trips-div").html(html);
    $("#trips-div").on("click", ".card", function () {
      // Get the trip ID from the data attribute
      const tripId = $(this).data("id");

      // Redirect or navigate to the trip details page with the trip ID
      // Example: You can set the hash fragment with the trip ID
      TripService.updateTripIdInParagraph(tripId);
    });
  },

  updateTripIdInParagraph: function(tripId) {
    // Get the paragraph element by its ID
    const tripIdParagraph = document.getElementById("tripIdParagraph");

    // Update the content of the paragraph with the trip ID
    tripIdParagraph.textContent = "Trip ID: " + tripId;
  }
};
