var UserService = {
  init: function () {
    var token = localStorage.getItem("jwt_token");
    if (token) {
      window.location.replace("index.html");
    }
    $("#loginForm").validate({
      focusCleanup: true,
      errorElement: "em",
      rules: {
        username: {
          required: true,
          minlength: 4,
          maxlength: 50,
        },
        password: {
          required: true,
          minlength: 8,
          maxlength: 100,
        },
      },
      messages: {
        username: {
          required: "Username is required",
          minlength: "Username must be at least 4 characters long",
          maxlength: "Username can't be longer than 50 characters",
        },
        password: {
          required: "Password is required",
          minlength: "Password must be at least 8 characters long",
          maxlength: "Password can't be longer than 100 characters",
        },
      },
      highlight: function (element, errorClass) {
        $(element).fadeOut(function () {
          $(element).fadeIn();
        });
      },
      submitHandler: function (form, validator) {
        var entity = Object.fromEntries(new FormData(form).entries());
        UserService.login(entity);
      },
      invalidHandler: function (event, validator) {
        var errors = validator.numberOfInvalids();
        toastr.error("Error");
        if (errors) {
          var message =
            errors == 1
              ? "You missed 1 field."
              : "You missed " + errors + " fields.";
          $("div.error span").html(message);
          $("div.error").show();
        } else {
          $("div.error").hide();
        }
      },
    });

    $("#registerForm").validate({
      focusCleanup: true,
      errorElement: "em",
      rules: {
        username: {
          required: true,
          minlength: 4,
          maxlength: 50,
        },
        full_name: {
          required: true,
          minlength: 3,
          maxlength: 100,
        },
        email: {
          required: true,
          maxlength: 100,
        },
        password: {
          required: true,
          minlength: 8,
          maxlength: 100,
        },
      },
      messages: {
        username: {
          required: "Username is required",
          minlength: "Username must be at least 4 characters long",
          maxlength: "Username can't be longer than 50 characters",
        },
        full_name: {
          required: "Full name is required",
          minlength: "Full name must be at least 3 characters long",
          maxlength: "Full name can't be longer than 100 characters",
        },
        email: {
          required: "Email is required",
          maxlength: "Email can't be longer than 100 characters",
        },
        password: {
          required: "Password is required",
          minlength: "Password must be at least 8 characters long",
          maxlength: "Password can't be longer than 100 characters",
        },
      },
      highlight: function (element, errorClass) {
        $(element).fadeOut(function () {
          $(element).fadeIn();
        });
      },
      submitHandler: function (form, validator) {
        var entity = Object.fromEntries(new FormData(form).entries());
        UserService.register(entity);
      },
      invalidHandler: function (event, validator) {
        var errors = validator.numberOfInvalids();
        toastr.error("Error");
        if (errors) {
          var message =
            errors == 1
              ? "You missed 1 field."
              : "You missed " + errors + " fields.";
          $("div.error span").html(message);
          $("div.error").show();
        } else {
          $("div.error").hide();
        }
      },
    });
  },

  login: function (entity) {
    $.ajax({
      url: "rest/login",
      type: "POST",
      data: JSON.stringify(entity),
      contentType: "application/json",
      dataType: "json",
      success: function (result) {
        if (result.message) {
          toastr.error(result.message);
        }
        if (result.token) {
          localStorage.setItem("jwt_token", result.token);
          window.location.replace("index.html");
        }
      },
      error: function (XMLHttpRequest, textStatus, errorThrown) {
        toastr.error(XMLHttpRequest.responseJSON.message);
      },
    });
  },

  register: function (entity) {
    $.ajax({
      url: "rest/register",
      type: "POST",
      data: JSON.stringify(entity),
      contentType: "application/json",
      dataType: "json",
      success: function (result) {
        if (result.message == "success") {
          window.location.replace("index.html#login");
        } else {
          toastr.error(result.message);
        }
      },
      error: function (XMLHttpRequest, textStatus, errorThrown) {
        toastr.error(XMLHttpRequest.responseJSON.message);
      },
    });
  },

  logout: function () {
    localStorage.clear();
    window.location.reload();
  },
};
