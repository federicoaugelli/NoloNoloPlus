                                                // CHIAMATA AJAX RITORNA TUTTI I CLIENTI
function findClienti() {
    // let cookie = getCookie("SessionCookie")
     //let data = {cookie: cookie}
     $.ajax({
       url: "/db/findClienti",
       type: "GET",
       data: '',
       dataType: "json",
       contentType: "application/x-www-form-urlencoded",
       success: function (d) {
        creaTabellaClienti(d);
       },
     });
}

                                                // CREA LA TABELLA CON TUTTI I CLIENTI
 function creaTabellaClienti(d) {
 
    document.getElementById("anagraficaClientiBody").innerHTML = "";
    //usernameSet.clear();
    //usernameArray = [];
    let tbody = document.getElementById("anagraficaClientiBody");
 
   for (let i in d.result) {
 
     let idCliente = d.result[i]._id;
     let nome = d.result[i].nome;
     let cognome = d.result[i].cognome;
     let username = d.result[i].username;
     let punti = d.result[i].punti;
     let citta = d.result[i].citta;
     let via = d.result[i].via
     //usernameSet.add(username.toLowerCase());
     //let tbody = document.getElementById("anagraficaClientiBody");
     const tr = document.createElement("tr");
     tr.innerHTML =
  
  `<td class="tdCustomer">` +
 nome +
  `</td>
  <td class="tdCustomer">` +
 cognome +
  `</td>
  <td class="tdCustomer">` +
 username +
  `</td>
  <td class="tdCustomer">` +
 citta + ', ' + via +
  `</td>  
  <td class="tdCustomer">` +
 punti +
  `</td> 
  <td class="tdCustomer">` +
 idCliente +
  `</td> 
  <td class="tdCustomer"><button data-bs-toggle="modal" data-bs-target="#modificaClienteModal" class="btn btn-secondary" aria-label="bottone di modifica cliente" type="button" onclick="getUser(this)"><i class="bi bi-pencil-square"></i></button>
  </td>`;
 
      tbody.appendChild(tr);
      console.log(d.result)
 }
}
 
                                                // VISUALIZZA LA TABELLA CON TUTTI I CLIENTI

function visualizzaClienti() {
     
    var div = document.getElementById("content");
    div.style.visibility = "visible";
    div.innerHTML = `
              
    <table border="1px" class="table table-striped table-bordered table-sm" cellspacing="2" width="100%">
    <thead>
      <tr>
      <th th class="th-sm" scope="col">Nome</th>
      <th th class="th-sm" scope="col">Cognome</th>
      <th th class="th-sm" scope="col">Username</th>
      <th th class="th-sm" scope="col">Indirizzo di Fatturazione</th>
      <th th class="th-sm" scope="col">Punti Fedeltà</th>
      <th th class="th-sm" scope="col">ID cliente</th>
      <th th class="th-sm" scope="col">Modifica</th>
      </tr>
    </thead>
    <tbody id="anagraficaClientiBody">  
    </tbody>
  </table>      
    `;
  }


                                                // RITORNA IL SINGOLO CLIENTE

  function getUser(e){

    let current = e.parentNode.parentNode;
    let nome = current.getElementsByClassName("tdCustomer")[0].textContent;
    let cognome = current.getElementsByClassName("tdCustomer")[1].textContent;
    let username = current.getElementsByClassName("tdCustomer")[2].textContent;
    let string = current.getElementsByClassName("tdCustomer")[3].textContent;
    let cittaVia = string.split(", ");
    let citta = cittaVia[0];
    let via = cittaVia[1];
    let punti = current.getElementsByClassName("tdCustomer")[4].textContent;
    let modal = document.getElementById("modificaClienteModal");
    let data = modal.getElementsByClassName("form-control");
    data[0].value = nome;
    data[1].value = cognome;
    data[2].value = username;
    data[3].value = citta;
    data[4].value = via;
    data[5].value = punti;
    oldUser = current.getElementsByClassName("tdCustomer")[5].textContent;
  }




                                                // MODIFICA IL SINGOLO CLIENTE

  function modUser(){

    var formData = $("form").serializeArray();
  

    if(
      formData[0].value != " " &&
      formData[1].value != " " &&
      formData[2].value != " " &&
      formData[3].value != " " &&
      formData[4].value != " " &&
      formData[5].value != " "
    ){
          
      $.ajax({

        url: "/db/updateUser",
        type: "POST",
        data: { oldUser, formData },
        dataType: "json",
        contentType: "application/x-www-form-urlencoded",
        success: function(data){

          if(data){

            document.getElementById("alert-body").textContent = "Utente modificato con successo"
            $("#alertModal").modal("show");
            $("#modUserForm").trigger("reset");
            $("#modificaClienteModal").modal("hide");
            console.log("Utente modificato");
            findClienti();
          }
          else{

            document.getElementsById("alertContent").textContent = "Errore. non è possibile modificare l'utente"
            $("alertmodal1").modal("show");
            console.log("errore");
          }
        }
      });
    }
    else{

      document.getElementById("alertContent").textContent = "Compilare tutti i campi"
      $("alertmodal").modal("show");
    }

    console.log(formData);
  }

                                                //ELIMINA IL SINGOLO CLIENTE

  function delUser(){

    //let user = document.getElementsById("usernameModUser").value;
    //let formData = {type: "username", rent: [user]};
    let countPrenotati = 0;
    /*$.ajax({
      url: "/db/searchRent/",
      type:"POST",
      data: formData,
      dataType: "json",
      contentType: "application/x-www-form-urlencoded",
      success: function(data) {

        for(let i = 0; i < data.result.length; i++){

          if(data.result[i].stato == "prenotato" || data.result[i].stato == "in corso"){

          countPrenotati++;
        }
      }
    */
      console.log(countPrenotati);
      if(countPrenotati == 0){

        $.ajax({
          url: "/db/deleteUser",
          type: "DELETE",
          data: {oldUser},
          dataType: "json",
          contentType: "application/x-www-form-urlencoded",
          success: function(data){
          },
        });

        document.getElementsById("alertContent").textContent = "Utente rimosso con successo"
        $("alertmodal").modal("show");
        $("#modUserForm").trigger("reset");
        $("#modUserModal").modal("hide");
        console.log("Utente rimosso");
      }
      else{

        document.getElementsById("alertContent").textContent = "Errore. non è possibile rimuovere l'utente"
        $("alertmodal").modal("show");
        $("#modUserForm").trigger("reset");
        $("#modUserModal").modal("hide");
      }
      findClienti();
    //}
    //});
  }









  function getGames() {
    $.ajax({
      url: "/db/getGames",
      type: "GET",
      data: '',
      dataType: "json",
      contentType: "application/x-www-form-urlencoded",
      success: function (g) {
           creaTabellaInventario(g);
           console.log(g.result);
      },
    });
  }
     
   
   
   function creaTabellaInventario(d) {
   
      document.getElementById("inventarioBody").innerHTML = "";
      //usernameSet.clear();
      //usernameArray = [];
      let tbody = document.getElementById("inventarioBody");
   
     for (let i in d.result) {
   
       let idGame = d.result[i]._id;
       let game = d.result[i].game;
       let platform = d.result[i].platform;
       let annoUscita = d.result[i].annoUscita;
       let stato = d.result[i].stato;
       let condizioni = d.result[i].condizioni;
       let etaMinima = d.result[i].etaMinima;
       let peso = d.result[i].peso;
       let numGiocatori = d.result[i].numGiocatori;
       let prezzo = d.result[i].prezzo;
       let quantita = d.result[i].quantita;
       let img = d.result[i].img;
       //usernameSet.add(username.toLowerCase());
       //let tbody = document.getElementById("anagraficaClientiBody");
       const tr = document.createElement("tr");
       tr.innerHTML =
    
    
   `<td class="tdCustomer">` +
   game +
    `</td>
    <td class="tdCustomer">` +
   idGame +
    `</td>
    <td class="tdCustomer">` +
   platform +
    `</td>
    <td class="tdCustomer">` +
   annoUscita + 
    `</td> 
    <td class="tdCustomer">` +
   stato +
    `</td> 
    <td class="tdCustomer">` +
   condizioni +
    `</td> 
    <td class="tdCustomer">` +
   etaMinima +
    `</td>
    <td class="tdCustomer">` +
   peso +
    `</td>
    <td class="tdCustomer">` +
   numGiocatori +
    `</td>
    <td class="tdCustomer">` +
   prezzo +
    `</td>
    <td class="tdCustomer">` +
   quantita +
    `</td>
    <td class="tdCustomer"><button data-bs-toggle="modal" data-bs-target="#modificaClienteModal" class="btn btn-secondary" aria-label="bottone di modifica cliente" type="button" onclick="getUser(this)"><i class="bi bi-pencil-square"></i></button>
    </td>`;
   
   tbody.appendChild(tr);
   console.log(d.result)
   }    
   }





  function visualizzaInventario() {
     
    var div = document.getElementById("inventarioContent");
    div.style.visibility = "visible";
    div.innerHTML = `
              
    <table border="1px" class="table table-striped table-bordered table-sm" cellspacing="2" width="100%">
    <thead>
      <tr>
      <th th class="th-sm" scope="col">Titolo</th>
      <th th class="th-sm" scope="col">ID</th>
      <th th class="th-sm" scope="col">Piattaforma</th>
      <th th class="th-sm" scope="col">Anno di uscita</th>
      <th th class="th-sm" scope="col">Stato</th>
      <th th class="th-sm" scope="col">Condizioni</th>
      <th th class="th-sm" scope="col">Etàminima</th>
      <th th class="th-sm" scope="col">Peso</th>
      <th th class="th-sm" scope="col">N° giocatori</th>
      <th th class="th-sm" scope="col">Prezzo</th>
      <th th class="th-sm" scope="col">Quantità</th>
      <th th class="th-sm" scope="col">Modifica</th>
      </tr>
    </thead>
    <tbody id="inventarioBody">  
    </tbody>
  </table>      
    `;
  }

