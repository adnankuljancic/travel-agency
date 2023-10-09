var TripService = {
  trip_id: null,
  // function to get trips
  getTrips: function () {
    $("#addTripModalBtn").click(function () {
      TripService.addTrip();
    });

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

  // function to list trips as cards
  listTrips: function (data) {
    var html = "";
    for (var i = 0; i < data.length; i++) {
      html +=
        "<div class='col mb-5'><div class='card m-3 h-100' style='width: 24rem' data-id='" +
        data[i].id +
        "'>" +
        "<img src='" +
        data[i].image_link +
        "' class='card-img-top' alt='...' /> " +
        " <div class='card-body d-flex flex-column'> <h3 class='card-title'> " +
        data[i].name +
        "</h3> <p style='color: #4761FF'>" +
        data[i].price +
        "BAM</p><p class='card-text'>" +
        data[i].short_description +
        "</p> <a class='btn btn-primary see-more-button mt-auto'>See more</a> </div></div></div>";
    }
    $("#trips-div").html(html);

    // on click listener for trips
    $("#trips-div").on("click", ".card", function () {
      // Get the trip ID from the data attribute
      const tripId = $(this).data("id");
      console.log(tripId);
      window.location.hash = "trip-details";
      TripService.tripDetailsFunction(tripId);
    });
  },

  //function that gets trip and shows its data on trip details page
  tripDetailsFunction: function (tripId) {
    this.trip_id = tripId;
    $.ajax({
      url: `rest/trips/${tripId}`,
      type: "GET",
      dataType: "json",
      success: function (data) {
        console.log(data);
        $("#trip_name").text(data.name);
        $("#trip_price").text("Price: " + data.price + "BAM");
        $("#trip_short_description").text(data.short_description);
        $("#trip_long_description").text(data.long_description);
        $("#trip_image").attr("src", data.image_link);
        $("#trip_category").text("Category: " + data.category_name);

        $("#tripName").val(data.name);
        $("#tripShortDescription").val(data.short_description);
        $("#tripLongDescription").val(data.long_description);
        $("#tripImageSrc").val(data.image_link);
        $("#tripPrice").val(data.price);
        $("#tripId").val(data.id);
        $("#tripCategory").val(data.category_id).trigger("change");
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

  //function that saves modified trip
  saveModifiedTrip: function () {
    const editedName = $("#tripName").val();
    const editedShortDescription = $("#tripShortDescription").val();
    const editedLongDescription = $("#tripLongDescription").val();
    const editedImageSrc = $("#tripImageSrc").val();
    const editedPrice = $("#tripPrice").val();
    const editedCategory = $("#tripCategory").val();

    console.log(this.trip_id);
    // Create a JSON object from the edited data
    const editedData = {
      id: this.trip_id,
      name: editedName,
      short_description: editedShortDescription,
      long_description: editedLongDescription,
      image_link: editedImageSrc,
      price: editedPrice,
      category_id: editedCategory,
    };

    // Create a PUT request to update the trip data
    $.ajax({
      url: "rest/trips",
      type: "PUT",
      dataType: "json",
      contentType: "application/json; charset=utf-8",
      data: JSON.stringify(editedData),
      success: function (response) {
        $("#modifyTripModal").modal("hide");
        toastr.success("Update successful");
        console.log("Update successful:", response);
        window.location.hash = "trips";
        TripService.getTrips();
      },
      error: function (xhr, status, error) {
        console.error("Update error:", error);
      },
    });
  },

  //function that deletes trip
  deleteTrip: function () {
    $.ajax({
      url: "rest/trips/" + this.trip_id,
      type: "DELETE",
      dataType: "json",
      success: function (response) {
        console.log("Delete successful:", response);
        $("#deleteTripModal").modal("hide");
        window.location.hash = "trips";
        TripService.getTrips();
      },
      error: function (xhr, status, error) {
        console.error("Delete error:", error);
      },
    });
  },

  addTrip: function () {
    const tripData = {
      name: $("#addTripName").val(),
      short_description: $("#addTripShortDescription").val(),
      long_description: $("#addTripLongDescription").val(),
      image_link: $("#addTripImageSrc").val(),
      price: $("#addTripPrice").val(),
      category_id: $("#addTripCategory").val(),
    };

    // Create a PUT request to update the trip data
    $.ajax({
      url: "rest/trips",
      type: "POST",
      dataType: "json",
      contentType: "application/json; charset=utf-8",
      data: JSON.stringify(tripData),
      success: function (response) {
        $("#addTripModal").modal("hide");
        toastr.success("Trip added");
        console.log("Trip added:", response);
        window.location.hash = "trips";
        TripService.getTrips();
      },
      error: function (xhr, status, error) {
        console.error("Update error:", error);
      },
    });
  },
};
