var root_url = "http://comp426.cs.unc.edu:3001/";
var airline_data;
var airport_data;
var flight_data;
var ticket_data;

String.prototype.format = function () {
  var i = 0,
    args = arguments;
  return this.replace(/{}/g, function () {
    return typeof args[i] != 'undefined' ? args[i++] : '';
  });
};
$(document).ready(function(){
  
});
// Starting with a login screen 
var logingin = function () {
  let user = $('#user').val();
  localStorage.setItem('username', user);
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
    success: function (d, textStatus, jqXHR) {
      // alert("Hello There");
      homePage();
    },
    error: () => {
      alert('Incorrect username or password');
    },
  });
}

var createUser = function () {
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
    success: function (d, textStatus, jqXHR) {
      alert("userCreated");
      loginPage();
    },
    error: () => {
      alert('error');
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
  let data = loadDB();
  airline_data = data[0];
  airport_data = data[1];
  flight_data = data[2];
  ticket_data = data[3];
  console.log(airport_data);
  console.log(airline_data);
  console.log(flight_data);
  console.log(ticket_data);

  let body = $('body');
  body.empty();
  let navbar = '<ul> \
  <li id = "logout_btn">Logout</li>\
  <li style="float:right">{}</li>\
  </ul>\
  <div id="mesg_div"></div>'.format(localStorage.getItem('username'));
  body.append(navbar);

  let main = `
  <div id = "header">
    <h1 id = 'title'>Welcome to AMPFlight</h1>
  </div>

  <div>
    <input type = 'text' placeholder= 'Where do you want to go?' id = 'search'><br>
  </div>

  <div id = 'dropdowns'>
    <button onclick = "dropdownFunction()" class = "dropbtn">Airlines</button>
    <div id = "dropdown1" class = "dropdown-content">
    </div> 

  </div>
  <footer>
    <p id = 'credit'> AMPFlight is trademarked by jeffcc and chengtw</p>
  </footer> `

  body.append(main);
  tabClick();

}
var tabClick = function () {

  $('li').click(function () {
    let tabId = $(this).attr('id');
    if (tabId == "logout_btn") {
      loginPage();
    }
  });
}

var loadDB = function () {
  let airline;
  let airport;
  let flight;
  let ticket;
  $.ajax(root_url + 'airlines', {
    type: 'GET',
    xhrFields: {
      withCredentials: true
    },
    success: (response) => {
      // console.log(response);
      airline = response;
    },
    error: () => {
      alert('Incorrect username or password');
    },
  });
  $.ajax(root_url + 'airports', {
    type: 'GET',
    xhrFields: {
      withCredentials: true
    },
    success: (response) => {
      airport = response;
    },
    error: () => {
      alert('Incorrect username or password');
    },
  });
  $.ajax(root_url + 'flights', {
    type: 'GET',
    xhrFields: {
      withCredentials: true
    },
    success: (response) => {
      flight = response;
    },
    error: () => {
      alert('Incorrect username or password');
    },
  });
  $.ajax(root_url + 'tickets', {
    type: 'GET',
    xhrFields: {
      withCredentials: true
    },
    success: (response) => {
      ticket = response;
    },
    error: () => {
      alert('Incorrect username or password');
    },
  });
  console.log(airline);
  return [airline, airport, flight, ticket];
}

/* When the user clicks on the button, toggle between hiding and showing the dropdown content */
function dropdownFunction() {
  document.getElementById("dropdown1").classList.toggle("show");
}

// Close the dropdown if the user clicks outside of it
window.onclick = function (event) {
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
