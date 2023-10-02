var MytripsService = {
    init: function () {

      //book now button click listener
      $("#booktrip-btn").click(function () {
        MytripsService.bookTrip();
      });
    },

    //book now function
    bookTrip: function () {
      var jwtToken = localStorage.getItem("jwt_token");
      var tripId = $("#tripId").val();
  
      var data = {
        jwt: jwtToken,
        trip_id: tripId,
      };
  
      $.ajax({
        url: "rest/mytrips",
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
        url: "rest/mytrips",
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
            "<div class='col'>" +
            "<div class='card mb-3' style='max-width: 540px;' data-id='" + data[i].id + "'>" +
            "<div class='row g-0'>" +
            "<div class='col-md-4'>" +
            "<img src='" + data[i].image_link + "' class='img-fluid rounded-start' alt='...'>" +
            "</div>" +
            "<div class='col-md-8'>" +
            "<div class='card-body'>" +
            "<h5 class='card-title'>" + data[i].name + "</h5>" +
            "<p class='card-text'>" + data[i].short_description + "</p>" +
            "<p class='card-text'><small class='text-muted'>" + data[i].price + " BAM</small></p>" +
            "<a class='btn btn-primary'>Remove</a>" +
            "</div>" +
            "</div>" +
            "</div>" +
            "</div>" +
            "</div>";
        }
        $("#trips-div").html(html);
        
    },
  };
  