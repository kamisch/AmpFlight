var root_url = "http://comp426.cs.unc.edu:3001/";

// Starting with a login screen 
$(document).ready(function(){

  $('#login').on('click',()=>{
  // Getting username and password information from input
  let user = $('#user').val();
  let pass = $('#pass').val();
  let login_url = root_url + 'sessions';
  // let uData =  {"user" :{"username": user,"password": pass}};

  $.ajax(login_url, {
    url:login_url,
    type: 'POST',
    xhrFields: {withCredentials:true},
    data: {"user" :{"username": user,"password": pass}},

    // Build home page
    success: (response) =>{
      if(response.status){
        alert("Login Successful!")
        build_question_interface();
      }else{
        alert("Username or password is incorrect!");
      }
    },
    error:()=>{
      alert("Error!");
    }
  });
}); 
});

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

