var CategoryService = {
  AddNewTripClickListener: function () {
    $("#addTripBtn").click(function () {
      CategoryService.getCategories("addTripCategory");
    });
  },
  ModifyTripClickListener: function () {
    $("#modifyTripBtn").click(function () {
      CategoryService.getCategories("tripCategory");
    });
  },

  getCategories: function (divId) {
    $.ajax({
      url: "rest/categories",
      type: "GET",
      dataType: "json",
      success: function (data) {
        CategoryService.CategoriesInSelector(data, divId);
      },
      error: function (xhr, status, error) {
        console.error(error);
      },
    });
  },

  CategoriesInSelector: function (data, divId) {
    var html = "";
    for (var i = 0; i < data.length; i++) {
      html +=
        "<option value='" + data[i].id + "'>" + data[i].name + "</option>";
    }
    $("#" + divId).html(html);
  },
};
