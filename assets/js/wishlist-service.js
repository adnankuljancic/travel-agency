var WishlistService = {
  init: function () {
    $("#wishlist-btn").click(function () {
      WishlistService.addToWishlist();
    });
  },
  addToWishlist: function () {
    var jwtToken = localStorage.getItem("jwt_token");
    var tripId = $("#tripId").val();
    console.log(tripId);

    var data = {
      jwt: jwtToken,
      trip_id: tripId,
    };

    console.log(JSON.stringify(data));

    $.ajax({
      url: "rest/wishlist",
      type: "POST",
      dataType: "json",
      contentType: "application/json", // Set the content type to JSON
      data: JSON.stringify(data), // Convert the data object to JSON
      success: function (response) {
        // Handle the success response here
        console.log("Wishlist item added:", response);
        toastr.success("Added to the wishlist!");
      },
      error: function (xhr, status, error) {
        // Handle errors here
        console.error("Error adding item to wishlist:", error);
        toastr.error("Error");
      },
    });
  },

  fetchWishlist: function () {
    $.ajax({
      url: "rest/wishlist",
      type: "GET",
      dataType: "json",
      success: function (data) {
        console.log(data);
        WishlistService.listWishlistTrips(data);
      },
      error: function (xhr, status, error) {
        console.error(error);
      },
    });
  },

  listWishlistTrips: function (data) {
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
        "</p> <a class='btn btn-primary'>Remove</a> </div></div></div>";
    }
    $("#trips-div").html(html);
    $("#trips-div").on("click", ".card", function () {
      const tripId = $(this).data("id");
      $.ajax({
        url: "rest/wishlist/" + tripId,
        type: "DELETE",
        dataType: "json",
        success: function (response) {
          // Handle the success response here
          console.log("Wishlist item deleted:", response);
          toastr.success("Deleted from wishlist!");
        },
        error: function (xhr, status, error) {
          // Handle errors here
          console.error("Error deleting wishlist item:", error);
          toast.error("Error");
        },
      });
    });
  },
};
