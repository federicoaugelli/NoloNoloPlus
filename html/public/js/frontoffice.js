function getIDuserLogged(){

  let login = document.getElementById("myModal");
  let username = login.getElementsByClassName("input");

  let usernameLogged = username[0].textContent;
  //console.log(usernameLogged)
  
  
  $.ajax({

    url: "/db/getUserLogged",
    type: "GET",
    data: {usernameLogged},
    dataType: "json",
    contentType: "application/x-www-form-urlencoded",
    success: console.log(usernameLogged)
    
});

}

function loggedUserSetFalse(){

  $.ajax({

    url: "/db/loggedUserSetFalse",
    type: "POST",
    data: {},
    dataType: "json",
    contentType: "application/x-www-form-urlencoded",
    success: console.log(usernameLogged)
    
});
}


function showHideLoginRegister(){

  var x = document.getElementsByClassName("login");
  var y = document.getElementsByClassName("sign-up-form");

  if (x.style.display === "none") {
    y.style.display = "block";
  } else {
    y.style.display = "none";
  }



}