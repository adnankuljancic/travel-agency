var TripService = {
  trip_id: null,
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
      console.log(tripId);

      // Redirect or navigate to the trip details page with the trip ID
      // Example: You can set the hash fragment with the trip ID
      TripService.tripDetailsFunction(tripId);
    });
  },

  tripDetailsFunction: function (tripId) {
    // // Get the paragraph element by its ID
    const trip_name = document.getElementById("trip_name");
    const trip_price = document.getElementById("trip_price");
    const trip_long_decription = document.getElementById(
      "trip_long_description"
    );
    const trip_image = document.getElementById("trip_image");
    this.trip_id = tripId;
    $.ajax({
      url: `rest/trips/${tripId}`,
      type: "GET",
      dataType: "json",
      success: function (data) {
        console.log(data);
        this.trip_data = data;
        trip_name.textContent = data.name;
        trip_price.textContent = "Price: " + data.price + "BAM";
        trip_long_decription.textContent = data.long_description;
        trip_image.src = data.image_link;

        $("#tripName").val(data.name);
        $("#tripDescription").val(data.short_description);
        $("#tripImageSrc").val(data.image_link);
        $("#tripPrice").val(data.price);
        $("#tripId").val(data.id);
      },
      error: function (xhr, status, error) {
        console.error(error);
      },
    });
    $("#saveChangesButton").click(function () {
      TripService.saveModifiedTrip();
    });

    $("#deleteTripButton").click(function () {
      TripService.deleteTrip();
    });
  },

  saveModifiedTrip: function () {
    const editedName = $("#tripName").val();
    const editedDescription = $("#tripDescription").val();
    const editedImageSrc = $("#tripImageSrc").val();
    const editedPrice = $("#tripPrice").val();

    console.log(this.trip_id);
    console.log("Radi");
    // Create a JSON object from the edited data
    const editedData = {
      id: this.trip_id,
      name: editedName,
      short_description: editedDescription,
      image_link: editedImageSrc,
      price: editedPrice,
    };

    // Create a PUT request to update the trip data
    $.ajax({
      url: "rest/trips",
      type: "PUT", // Use the PUT method to update the data
      dataType: "json",
      contentType: "application/json; charset=utf-8", // Set the content type to JSON
      data: JSON.stringify(editedData), // Send the editedData object as JSON
      success: function (response) {
        // Handle the success response from the server
        $("#modifyTripModal").modal("hide");
        toastr.success("Update successful");
        console.log("Update successful:", response);
        window.location.hash = "trips";
      },
      error: function (xhr, status, error) {
        // Handle any errors that occur during the request
        console.error("Update error:", error);
      },
    });
  },

  deleteTrip: function () {
    $.ajax({
      url: "rest/trips/" + this.trip_id,
      type: "DELETE",
      dataType: "json",
      success: function (response) {
        console.log("Delete successful:", response);
        $("#deleteTripModal").modal("hide");
        window.location.hash = "trips";
      },
      error: function (xhr, status, error) {
        console.error("Delete error:", error);
      },
    });
  },
};
