var root_url = "http://comp426.cs.unc.edu:3001/";
var airline_data;
var airport_data;
var flight_data;
var fname;
var lname;
var age;
var gender;
// var ticket_data;


String.prototype.format = function () {
  var i = 0,
    args = arguments;
  return this.replace(/{}/g, function () {
    return typeof args[i] != 'undefined' ? args[i++] : '';
  });
};
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
      homePage();
    },
    error: () => {
      alert('Incorrect Username or Password');
    },
  });
}

var changeUser = function () {
  let user = $('#user').val();
  let opass = $('#oldpass').val();
  let npass = $('#newpass').val();

  console.log(user);
  console.log(opass);
  console.log(npass);

  let udata = {
    "user": {
      "username": user,
      "old_password": opass,
      "new_password": npass
    }
  };
  $.ajax(root_url + 'passwords', {
    type: 'PUT',
    xhrFields: {
      withCredentials: true
    },
    data: udata,
    success: function (d, textStatus, jqXHR) {
      alert("Password Successfully Changed");
      loginPage();
    },
    error: () => {
      alert('Error');
    },
  });
}
var passwordPage = function () {
  let body = $('body');

  body.empty();
  let mainHtml = ` <div id = 'login-container'>
  <div id = 'loginBox'>
      <h3 id = 'loginTitle'>Login</h3><br>
  
      <div class = 'authentication'>
          <input type = "text" id = "user" class = loginInput placeholder = "Username"><br>
          <input type = "password" id = "oldpass" class = loginInput placeholder = "Old Password"><br>
          <input type = "password" id = "newpass" class = loginInput placeholder = "New Password"><br>

      </div>
  
      <br> 

      <div class = 'loginBtns'>
          <button class = "btn" onclick="changeUser()">Change Password</button>
          <button class = "btn" onclick="loginPage()">Back to Login</button>
      </div>

      <br>
      <br>
  </div>
</div> `
  body.append(mainHtml);
}
var loginPage = function () {
  let body = $('body');

  body.empty();
  let mainHtml = ` <div id = 'login-container'>
  <div id = 'loginBox'>
      <h3 id = 'loginTitle'>Login</h3><br>
  
      <div class = 'authentication'>
          <input type = "text" id = "user" class = loginInput placeholder = "Username"><br>
          <input type = "password" id = "pass" class = loginInput placeholder = "Password"><br>
      </div>
  
      <br> 

      <div class = 'loginBtns'>
          <button id = 'login' class = "btn" onclick="logingin()">Login</button><br>
          <button id = 'changeUser' class = "btn" onclick="passwordPage()">Change Password</button>
      </div>

      <br>
      <br>
  </div>
</div> `
  body.append(mainHtml);
}

var homePage = function () {
  let body = $('body');
  body.empty();

  
  let navbar = '<ul> \
  <li id = "home_btn" class = "navTag" >Home</li>\
  <li id = "logout_btn" class = "navTag" >Logout</li>\
  <li id = "user_info" class = "navTag" style="float:right">{}</li>\
  </ul>\
  <div id="mesg_div"></div>'.format(localStorage.getItem('username'));
  body.append(navbar);

  let main = `
  <div id = "header">
    <h1 id = 'title'>Welcome to AmpFlight</h1>
  </div>

  <div id = "home-container">
  <div>
    <input type = 'text' placeholder= 'Where do you want to go?' id = 'search'>
  </div>

  <div id = 'dropdowns'>

    <div id = "dropdown1" class = "dropdown-content">
    </div> 

  </div>
  </div>
  <button id = "resultBtn">Get Ticket</button>
  <footer>
    <p id = 'credit'> AMPFlight is trademarked by jeffcc and chengtw</p>
  </footer>   
  <div id = "airplaneFilter"></div>
  <div id = "airportFilter"></div>
  <div id = "flightFilter"></div>`;
  
  body.append(main);
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(getWeather);
  } else { 
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
  // add filter buttons
  let airlines = $('<button onclick = "dropdownFunction({})" class = "dropbtn">Airlines</button>'.format("'airlines'"));
  let airports = $('<button onclick = "dropdownFunction({})" class = "dropbtn">Airports</button>'.format("'airports'"));
  let flights = $('<button onclick = "dropdownFunction({})" class = "dropbtn">Departure</button>'.format("'flights'"));

  $('#dropdowns').append(airlines);
  $('#dropdowns').append(airports);
  $('#dropdowns').append(flights);

  $('#header').fadeIn(1500);
  $('#header').fadeOut(1500);

  fname =  $("<input type = 'text' placeholder= 'first name' id = 'fname'>");
  lname = $("<input type = 'text' placeholder= 'last name' id = 'lname'>");
  age = $("<input type = 'text' placeholder= 'last name' id = 'lname'>");
  gender = $("<input type = 'text' placeholder= 'last name' id = 'lname'>");


  body.append(fname);
  body.append(lname);
  hoverTicket();
  tabClick();

}

var resultPage = function (fname,lname,age,gender,airline,airport,flight) {
  console.log(fname,lname,airline,airport,flight);
 
  let info ="Flight from {} by {} at {} ".format(airport,airline,flight);
  let udata = {
    "ticket": {
      "first_name":   fname,
      "last_name":    lname,
      "age":          parseInt(age),
      "gender":       gender,
      "info": info
   
    }
  };
  $.ajax(root_url + 'tickets', {
    type: 'POST',
    xhrFields: {
      withCredentials: true
    },
    data: udata,
    success: function (d, textStatus, jqXHR) {
      alert("ticket created");
      let body = $('body');
      body.empty();
      let navbar = '<ul> \
      <li id = "home_btn" class = "navTag" >Home</li>\
      <li id = "logout_btn" class = "navTag" >Logout</li>\
      <li id = "user_info" class = "navTag" style="float:right">{}</li>\
      </ul>\
      <div id="mesg_div"></div>'.format(localStorage.getItem('username'));
      body.append(navbar);
    
      let main = `
      <div id='ticket-container'>
    
        <div id='ticketBox'>
          <h3 id='ticketTitle'>Ticket</h3>
    
          <div class='ticketInfo'>
              <p>Passenger:</p>
              <p>{}</p>
              <p>{}</p>
              <p>Age: {}</p>
              <p>Gender: {}</p>
              <p>Aiport: {}</p>
              <p>Airline: {}</p>
              <p>Departure: {}</p>
    
          </div>
    
          <br>
          <br>
    
        </div>
    
        <input type="button" id = "printBtn" value="Print This Content" onclick="javascript:printerDiv('printablediv')" />
      </div>`.format(fname,lname,age,gender,airport,airline,flight);
    
      body.append(main);
    
      localStorage.setItem('fname',fname);
      localStorage.setItem('lname',lname);
      localStorage.setItem('airport',airport);
      localStorage.setItem('airline',airline);
      localStorage.setItem('flight',flight);
      localStorage.setItem('age',age);
      localStorage.setItem('gender',gender);
    },
    error: () => {
      alert('failed to create tickets');
      homePage();
    },
  });

  hoverTicket();
  tabClick();
}


function printerDiv(divID) {  
  //Print Page
  window.print();
}


var tabClick = function () {

  $('li').click(function () {
    let tabId = $(this).attr('id');
    if (tabId == "logout_btn") {
      loginPage();
    } else if (tabId == "home_btn") {
      console.log("homepage");
      homePage();
    }
  });
}
function getWeather(position) {
  // weatherUrl = 'http://api.openweathermap.org/data/2.5/weather?lat={}&lon={}&APPID=55a78b6eb9a4499b196c6e193756059f'.format(Math.round(position.coords.latitude),Math.round(position.coords.longitude));
  //   $.ajax(weatherUrl, {
  //     type: 'GET',
  //     crossDomain: true,
  //     success: (response) => {
  //       //gets the main weather
  //       weather = response['weather'][0]['main'];
  //       console.log(weather);
  //       $("#header").append($("<h3>Today's weather is {} </h3>".format(weather)));
        
  //       console.log(response);
  //     }
  //   })
  
}
/* When the user clicks on the button, toggle between hiding and showing the dropdown content */
function dropdownFunction(keyword) {
  $.ajax(root_url + keyword, {
    type: 'GET',
    xhrFields: {
      withCredentials: true
    },
    success: (response) => {
      if (keyword == "airlines") {
        $('#dropdown1').empty();
        let nameArr = [];
        response.forEach(element => {
          let name = element['name'];
          if (!nameArr.includes(name)) {
            nameArr.push(name);
          }
        });
        nameArr.sort();
        nameArr.forEach(element => {
        $('#dropdown1').append($('<li class = "dropdownEl airlineEl">{}</li>'.format(element)));
        })
        $('#search').fadeIn(1000);

      } else if (keyword == "airports") {
        $('#dropdown1').empty();
        let nameArr = [];
        response.forEach(element => {
          let name = element['name'];
          if (!nameArr.includes(name)) {
            nameArr.push(name);
          }
        });
        nameArr.sort();
        nameArr.forEach(element => {
        $('#dropdown1').append($('<li class = "dropdownEl airportEl">{}</li>'.format(element)));
        })
        $('#search').fadeIn(1000);

      } else if (keyword == "flights") {
        $('#dropdown1').empty();
        // let departArr = [];
        let arr = [], i, j;
for(i=0; i<24; i++) {
  for(j=0; j<2; j++) {
    arr.push(i + ":" + (j===0 ? "00" : 30*j) );
  }
}
        arr.forEach(element => {
        $('#dropdown1').append($('<li class = "dropdownEl ticketEl">{}</li>'.format(element)));
        })
        $('#search').fadeIn(1000);

      } 
    },
    error: () => {
      alert('Incorrect username or password');
    },
  });
}
var hoverTicket = function (){
  $("#user_info").hover(function(){
    
     // only need to check one because they should be all null or all exist
     if (typeof(localStorage.getItem('fname')) === null ){
      
    }else {
      console.log('last ticket touched');
      let lastTicket = `
      <div id='lastticket-container'>
    
        <div id='ticketBox'>
          <h3 id='ticketTitle'>Ticket</h3>
    
          <div class='ticketInfo'>
              <p>Passenger:</p>
              <p>{}</p>
              <p>{}</p>
              <p>Age: {}</p>
              <p>Gender: {}</p>
              <p>Aiport: {}</p>
              <p>Airline: {}</p>
              <p>Departure: {}</p>
          </div>
    
          <br>
          <br>
    
        </div>
    
        <input type="button" id = "printBtn" value="Print This Content" onclick="javascript:printerDiv('printablediv')" />
      </div>`.format(localStorage.getItem('fname'),localStorage.getItem('lname'),localStorage.getItem('age'),localStorage.getItem('gender'), localStorage.getItem('airport'),localStorage.getItem('airline'),localStorage.getItem('flight'));

      $('body').append(lastTicket);
    }
   
}, function (){
  $('#lastticket-container').remove();
});
   
}

  
// Close the dropdown if the user clicks outside of it
window.onclick = function (event) {
  if (event.target.matches('.dropbtn')) {
    let menu = document.getElementById("dropdown1");
    if (!menu.classList.contains('show')) {
      menu.classList.toggle('show');
      document.getElementById("search").classList.toggle('show');
    }

  } else if (event.target.matches('.airlineEl')) {
    let selected = $(event.target).text()
    console.log(selected);
    airline_data = $('#airlineFilter');
    airline_data.remove();
    airline_data = $('<div id = "airlineFilter">{}</div>'.format(selected));
    $('body').append(airline_data);
  } else if (event.target.matches('.airportEl')) {
    let selected = $(event.target).text()
    console.log(selected);
    airport_data = $('#airportFilter');
    airport_data.remove();
    airport_data = $('<div id = "airportFilter">{}</div>'.format(selected));
    $('body').append(airport_data);
  } else if (event.target.matches('.ticketEl')) {
    let selected = $(event.target).text()
    console.log(selected);
    flight_data = $('#flightFilter');
    flight_data.remove();
    flight_data = $('<div id = "flightFilter">{}</div>'.format(selected));
    $('body').append(flight_data);
    console.log("element ap clicked");
  } else if (event.target.matches('#search')) {
    $('#search').keydown(function (event) {
      // if (event.keyCode === 13) {
        $(".dropdownEl").each(function(){
          console.log('search');
          let dropdownText = $(this).text().toLowerCase();
          let searchText = $('#search').val().toLowerCase();
          if($("#search").val() === "" ){
              $(this).show();
          } else if (dropdownText.includes(searchText)){
            console.log($(this).text());
            console.log($('#search').val());
              $(this).show();
          } else{
              $(this).hide();
          }
      })
    })
  } else if (event.target.matches('#resultBtn')){
    if (typeof(fname) == "undefined" || typeof(lname) == "undefined" || typeof(airline_data) == "undefined" || typeof(age) == "undefined" || typeof(gender) == "undefined" ||typeof(airport_data) == "undefined" || typeof(flight_data) == "undefined"){
      alert("your information is not complete for ordering");
    }else {
      resultPage(fname.val(),lname.val(), age.val(), gender.val(),airline_data.text(),airport_data.text(),flight_data.text());

    }
  } else {
    let dropdowns = document.getElementsByClassName("dropdown-content");
    let i;
    for (i = 0; i < dropdowns.length; i++) {
      let openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
      if (document.getElementById("search").classList.contains('show')){
        document.getElementById("search").classList.remove('show');
      }
    }
    $('#search').fadeOut(1000);
  }
  

};
