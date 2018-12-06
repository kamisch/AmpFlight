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
        // $loginSection.hide();
        // $dashboardWelcome.html('Hello! You\'re currently logged in as ' + data.user.username + '.');
        // $status.html('<strong class="text-success">Login successful.</strong>');
        // $dashboardSection.show();
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
  $.ajax(root_url + 'users', {
      type: 'POST',
      xhrFields: {
          withCredentials: true
      },
      data: {
          "user": {
            "username": user,
            "password": pass
        }
      },
      success: (response) => {
          if (response.status) {
            alert("it works");
              // homePage();
              // xhr.getResponseHeader('Set-Cookie');
          } else {
              alert("Login failed. Try again.");
          }
      },
      error: () => {
          alert('error');
      }
  });
}

var loginPage = function () {
  let body = $('body');

  body.empty();
  let mainHtml = `    <h1>A4 User Login</h1>

  <div id="login_div">
      User: <input type="text" id="login_user"><br>
      Password: <input type="text" id="login_pass"><br>
      <button id="login_btn" onclick="logingin()">Login</button>
  </div>
  <div id="mesg_div"></div>`
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

  body.append('<h1>Answers and Review Questions</h1>');

  let qlist = $('<div id = "questions-container"></div>');
  body.append(qlist);

  $('#questions-container').css("overflow-y", "scroll");
  $('#questions-container').css("height", "800px");
  $('#questions-container').css("width", "100%");

  let reset_btn = $(`<button onclick='resetAnswers()'>Reset all answers</button>`)
  qlist.append(reset_btn);
  $.ajax(root_url + "questions", {
      type: 'GET',
      dataType: 'json',
      xhrFields: {
          withCredentials: true
      },
      success: (response) => {
          let qarray = response.data;
          for (let i = 0; i < qarray.length; i++) {
              let qdiv = create_question_div(qarray[i]);
              qlist.append(qdiv);
              let qid = qarray[i].id
              $.ajax(root_url + 'answers/' + qid, {
                  type: 'GET',
                  dataType: 'json',
                  xhrFields: {
                      withCredentials: true
                  },
                  success: (response) => {
                      if (response.data != null) {
                          let answer = response.data;
                          qdiv.append('<div class="answer" id="aid_' + answer.answer_id + '">' + "Answer: " +
                              answer.answer_text + '</div>');
                          qdiv.addClass('answered');
                      }
                  }
              });
          }
      }
  });

 

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

