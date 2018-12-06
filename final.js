var root_url = "http://comp426.cs.unc.edu:3001/";
var data;
String.prototype.format = function () {
    var i = 0, args = arguments;
    return this.replace(/{}/g, function () {
      return typeof args[i] != 'undefined' ? args[i++] : '';
    });
  };
// Starting with a login screen 
var logingin = function () {
  let user = $('#user').val();
  localStorage.setItem('username',user);
  let pass = $('#pass').val();
  console.log(user);
  console.log(pass);
  let udata = {
    "user": {
      "username": user,
      "password": pass
    }
  };
  $.ajax(root_url + 'sessions', {
      type: 'POST',
      xhrFields: {
          withCredentials: true
      },
      data: udata,
      success:function(d, textStatus, jqXHR) {
        alert("hello");
        homePage();
      },
      error: () => {
        alert('error');
      },
      complete: function(jqXHR, textStatus) {
        isSubmitting = false;
        $loginSubmitButton.prop('disabled', false);
      },
  });
}

var createUser = function(){
  let user = $('#user').val();
  let pass = $('#pass').val();
  console.log(user);
  console.log(pass);
  let udata = {
    "user": {
      "username": user,
      "password": pass
    }
  };
  $.ajax(root_url + 'users', {
      type: 'POST',
      xhrFields: {
          withCredentials: true
      },
      data: udata,
      success:function(d, textStatus, jqXHR) {
        alert("userCreated");
      },
      error: () => {
        alert('error');
      },
      complete: function(jqXHR, textStatus) {
        isSubmitting = false;
        $loginSubmitButton.prop('disabled', false);
      },
  });
}

var loginPage = function () {
  let body = $('body');

  body.empty();
  let mainHtml = ` <h3>Login</h3><br>
    
  <div class = 'authentication'>
      Name:  <input type = "text" id = "user"><br>
      Password: <input type = "password" id = "pass"><br>
  </div>

  <button id = 'login' onclick="logingin()">Login</button>
  <button id = 'createUser' onclick="createUser()">New User</button>`
  body.append(mainHtml);
}

var homePage = function () {
  let body = $('body');
  body.empty();
  let navbar = '<ul> \
  <li id = "home_btn">Home</li>\
  <li id = "review_btn">Review</li>\
  <li id = "logout_btn">Logout</li>\
  <li style="float:right">{}</li>\
  </ul>\
  <div id="mesg_div"></div>'.format(localStorage.getItem('username'));
  body.append(navbar);

 
 

}

/* When the user clicks on the button, 
toggle between hiding and showing the dropdown content */
function dropdownFunction() {
    document.getElementById("dropdown1").classList.toggle("show");
}

// Close the dropdown if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {

    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
};

