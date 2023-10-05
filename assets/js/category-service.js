var CategoryService = {
  AddNewTripClickListener: function () {
    $("#addTripBtn").click(function () {
      CategoryService.getCategories();
    });
  },

  getCategories: function () {
    $.ajax({
      url: "rest/categories",
      type: "GET",
      dataType: "json",
      success: function (data) {
        CategoryService.CategoriesInSelector(data);
      },
      error: function (xhr, status, error) {
        console.error(error);
      },
    });
  },

  CategoriesInSelector: function (data) {
    var html = "";
    for (var i = 0; i < data.length; i++) {
      html +=
        "<option value='" + data[i].id + "'>" + data[i].name + "</option>";
    }
    $("#addTripCategory").html(html);
  },
};
