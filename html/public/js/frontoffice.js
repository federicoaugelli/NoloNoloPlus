function showHideLoginRegister(){

  var x = document.getElementsByClassName("login");
  var y = document.getElementsByClassName("sign-up-form");

  if (x.style.display === "none") {
    y.style.display = "block";
  } else {
    y.style.display = "none";
  }
}




function registerCliente(){

  var formData = $("#createUserForm").serializeArray();

  //console.log(formData)

  if(
    formData[0].value != " " &&
    formData[1].value != " " &&
    formData[2].value != " " &&
    formData[3].value != " " &&
    formData[4].value != " " &&
    formData[5].value != " " 
    
  ){
        
    $.ajax({

      url: "/db/registerCliente",
      type: "POST",
      data: { formData },
      dataType: "json",
      contentType: "application/x-www-form-urlencoded",
      success: function(data){

        if(data){

          document.getElementById("alert-body").textContent = "Utente registrato con successo"
          $("#flash-modal").modal("show");
          $("#createUserForm").trigger("reset");
          $("#myModal").modal("hide");
          console.log("Utente registrato");
          findClienti();
        }
        else{

          document.getElementById("alert-body").textContent = "Errore. non è possibile registrare l'utente"
          $("#flash-modal").modal("show");
          //console.log("errore");
        }
      }
    });
  }
  else{

    document.getElementById("alert-body").textContent = "Compilare tutti i campi"
    $("#flash-modal").modal("show");
    console.log("err")
  }
}
