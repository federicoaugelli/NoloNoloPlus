function showHideLoginRegister(){

  var x = document.getElementsByClassName("login");
  var y = document.getElementsByClassName("sign-up-form");

  if (x.style.display === "none") {
    y.style.display = "block";
  } else {
    y.style.display = "none";
  }

}

 
function findClienti() {
 
  $.ajax({
    url: "/db/findClienti",
    type: "GET",
    data: '',
    dataType: "json",
    contentType: "application/x-www-form-urlencoded",
    success: function (d) {
      //console.log(g)
    },
  });
}

//sistemare nome quando modifica utente
//sistemare noleggio (loop?)

