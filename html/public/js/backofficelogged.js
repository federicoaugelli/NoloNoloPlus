                                                                         
                                                                            /* ========================== */
                                                                            /*                            */
                                                                            /*           CLIENTI          */
                                                                            /*                            */
                                                                            /* ========================== */                                               
                                               
                                                                                                                            
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
        listClientiSelectNoleggio(d);
       },
     });
}


function creaTabellaNoleggi(){


  
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
      //console.log(d.result[i])
 }
}
 
                                                // VISUALIZZA LA TABELLA CON TUTTI I CLIENTI

function visualizzaClienti() {
     
    var div = document.getElementById("content");
    div.style.visibility = "visible";
    div.innerHTML = `
              
    <table border="2px" class="table table-striped table-bordered table-sm" cellspacing="2" width="100%">
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

var oldUser = null;
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

    var formData = $("#modUserForm").serializeArray();

    if(
      formData[0].value != " " &&
      formData[1].value != " " &&
      formData[2].value != " " &&
      formData[3].value != " " &&
      formData[4].value != " " 
      
    ){
          
      $.ajax({

        url: "/db/updateUser",
        type: "POST",
        data: { oldUser, formData },
        dataType: "json",
        contentType: "application/x-www-form-urlencoded",
        success: function(data){

          //console.log(oldUser)
          //console.log(formData)
          //console.log(data)

          if(data){

            document.getElementById("alert-body").textContent = "Utente modificato con successo"
            $("#flash-modal").modal("show");
            $("#modUserForm").trigger("reset");
            $("#modificaClienteModal").modal("hide");
            console.log("Utente modificato");
            findClienti();
          }
          else{

            document.getElementById("alert-body").textContent = "Errore. non è possibile modificare l'utente"
            $("#flash-modal").modal("show");
            console.log("errore");
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

                                                //ELIMINA IL SINGOLO CLIENTE

var userCliente = null;

  function delUser(){
    let modal = document.getElementById("modificaClienteModal");
    userCliente = modal.getElementsByClassName("form-control")[2].value;
    console.log(userCliente)
    let prenotato = 0;
    $.ajax({
      url: "/db/getNoleggi/",
      type:"GET",
      data: {},
      dataType: "json",
      contentType: "application/x-www-form-urlencoded",
      success: function(d) {
        console.log(d.result)
        for(let i in d.result){
       
          if (userCliente == d.result[i].usernameCliente && (d.result[i].stato == "futuro" || d.result[i].stato == "in corso")){
            console.log(d.result[i].usernameCliente)
            prenotato++;            
          }
        }
        
        console.log(prenotato)
      if(prenotato == 0){

        $.ajax({
          url: "/db/deleteUser",
          type: "DELETE",
          data: { oldUser },
          dataType: "json",
          contentType: "application/x-www-form-urlencoded",
          success: function(data){
          },
        });

        document.getElementById("alert-body").textContent = "Utente rimosso con successo"
        $("#flash-modal").modal("show");
        $("#modUserForm").trigger("reset");
        $("#modificaClienteModal").modal("hide");
        console.log("Utente rimosso");
      }
      else{
        document.getElementById("alert-body").textContent = "Impossibile rimuovere il cliente perchè ha almeno un noleggio prenotato"
        $("#flash-modal").modal("show");
        $("#modUserForm").trigger("reset");
        $("#modificaClienteModal").modal("hide");
      }
      findClienti();
      }
    });
  }



                                                                            
                                                                            /* ========================== */
                                                                            /*                            */
                                                                            /*          NOLEGGI           */
                                                                            /*                            */
                                                                            /* ========================== */



                                                                          //CHIAMATA AJAX CHE RITORNA TUTTO L'INVENTARIO
  function getGames() {
    $.ajax({
      url: "/db/getGames",
      type: "GET",
      data: '',
      dataType: "json",
      contentType: "application/x-www-form-urlencoded",
      success: function (g) {
           creaTabellaInventario(g);
           creaCardInventario(g);
           //console.log(g.result);
      },
    });
  }


                                                               //CREA LA LISTA DI CARTE PER IL BACKOFFICE LOGGED
  function creaCardInventario(d){

    document.getElementById("card-list").innerHTML = " ";
    //usernameSet.clear();
    //usernameArray = [];
    let cardBody = document.getElementById("card-list");
 
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
     let img = d.result[i].img;
     const div = document.createElement("div");
     div.innerHTML =
     `
     <div class="col">
     <div class="card shadow-sm gameCard" style="text-align: center;">
       <div id="pegi" style="color: white;" class="val">PEGI ` + etaMinima + `</div>
       <img id="image" src="/img/prova1.png" class="val" alt="...">
       <div class="card-body">
         <h3 style="color: white;" class="val">` + game + `</h3>
         <h5 style="color: white;" class="val">` + platform + `</h5>
         <button data-bs-toggle="modal" data-bs-target="#noleggia-modal" class="btn btn-primary" aria-label="bottone di crea noleggio" onclick="creaNoleggio(this); findClienti()"><i class="bi bi-pencil-square"> Noleggia</i></button>
         </a>
         <br>    
         <h5 class="val" style="color: white; margin-top: 20px;">` + prezzo + ` € al giorno</h5>
         
       </div>
       <div class="card-footer">
         <small style="color: white;" class="val" style="position: absolute; left: 0; margin-left: 10px;">` + annoUscita + `</small>
         <small style="color: white;" class="val">` + stato + `</small>
         <small style="color: white;" class="val"> e in ` + condizioni + ` condizioni</small>
       </div>
     </div>
    </div>
    `;
   
 cardBody.appendChild(div);
 //console.log(d.result[i])
 }    
 }


 

 function searchNavbar(){

  var input, filter, ul, li, a, i, txtValue;
  input = document.getElementById("searchFilterNavbar");
  filter = input.value.toUpperCase();
  div = document.getElementById("card-list");
  div1 = div.getElementsByClassName("col");
  
  for (i = 0; i < div1.length; i++) {
    h3 = div1[i].getElementsByTagName("h3")[0];
    txtValue = h3.textContent || h3.innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
        div1[i].style.display = "";
    } else {
        div1[i].style.display = "none";
    }
  }
 }

   
 function creaNoleggio(e){

  let current = e.parentNode.parentNode;
  let etaMinima = current.getElementsByClassName("val")[0].textContent;
  let game = current.getElementsByClassName("val")[2].textContent;
  let platform = current.getElementsByClassName("val")[3].textContent;
  let prezzo = current.getElementsByClassName("val")[4].textContent;
  let annoUscita = current.getElementsByClassName("val")[5].textContent;
  let stato = current.getElementsByClassName("val")[6].textContent;
  let condizioni = current.getElementsByClassName("val")[7].textContent;
  
  //console.log(game,platform)
  let modal = document.getElementById("noleggia-modal");
  user = modal.getElementsByClassName("useruser")[0].textContent;
  user = user.split(" ")[2];
  console.log(user)
  

  let data = modal.getElementsByClassName("newval");
  data[0].value = user;
  //modal.getElementsByClassName("useruser")[0].textContent = " NUOVO NOLEGGIO";
  data[1].value =  game + ", " + platform;
  
  let prezzo1 = prezzo.split(" ")[0];
  data[4].value = prezzo1;
  //console.log(prezzo1)s
  //console.log(data[1].value);
  
 }

 //                                     SELECT FORM CHE MOSTRA TUTTI CLIENTI A CUI ASSOCIARE UN NOLEGGIO

 function  listClientiSelectNoleggio(d){
  
  //var x = document.getElementById("usernameCliente");
  //x.remove(x);
  document.getElementById("usernameCliente").options.length = 0;
  let option = document.createElement("OPTION");
  option.setAttribute("value", "nessun cliente selezionato");
  let option2 = document.createTextNode("Scegli cliente ...");
  option.appendChild(option2);
  document.getElementById("usernameCliente").appendChild(option);

  for (let i in d.result) {

    let idCliente = d.result[i]._id;
    let username = d.result[i].username;
    let punti = d.result[i].punti;
    
    let option = document.createElement("OPTION");
    option.setAttribute("value", username);
    let option2 = document.createTextNode(username);
    option.appendChild(option2);
    document.getElementById("usernameCliente").appendChild(option);
 }
}


function calcolaPuntiCliente(){

   var usernameCliente = document.getElementById("usernameCliente").value;
   //console.log(usernameCliente)

  $.ajax({
    url: "/db/findClienti",
    type: "GET",
    data: {},
    dataType: "json",
    contentType: "application/x-www-form-urlencoded",
        success: function (d) {

          console.log(d)
          for (let i in d.result) {

            if(d.result[i].username == usernameCliente){

              punti = d.result[i].punti;
            }
          }
          
      punti = parseInt(punti)
      console.log(punti)
     
      let modal = document.getElementById("noleggia-modal");
      let data = modal.getElementsByClassName("newval");
      data[5].value = punti;       
    },
  });
}

function calculateDays() {
  var d1 = document.getElementById("inizioNoleggio").value;
  var d2 = document.getElementById("fineNoleggio").value;    
  const dateOne = new Date(d1);
  const dateTwo = new Date(d2);
  if(dateOne <= dateTwo){
     const time = Math.abs(dateTwo - dateOne);
     const days = Math.ceil(time / (1000 * 60 * 60 * 24));
     calcolaCosto(days + 1); 
  }
  else{
     days = 0;
     calcolaCosto(days);
     alert("La data di inizio del noleggio deve essere precedente alla data di fine noleggio")
  }
  //console.log(days)
  
}    


function calcolaCosto(days){

  let costoDay = document.getElementById("costo").value;
  //console.log(costoDay)
  costo = parseFloat(costoDay.split(" ")[0]);
  //console.log(costo)

  let modal = document.getElementById("noleggia-modal");
  let data = modal.getElementsByClassName("newval");
  let punti =  modal.getElementsByClassName("newval")[5].value;
  //punti = parseFloat(punti);
  data[6].value = (costo * days ).toFixed(2);
  //console.log(costo * days)
  
}
   
function applicaPunti(){

  let modal = document.getElementById("noleggia-modal");
  let data = modal.getElementsByClassName("newval");

  if (punti != 0){
    data[6].value = (data[6].value - (punti  / 10)).toFixed(2);
    punti = punti - punti;
  } 
  else{
    data[6].value = (data[6].value - (0)).toFixed(2);
  }
}








                                                                           
                                                                            /* ========================== */
                                                                            /*                            */
                                                                            /*          OGGETTI           */
                                                                            /*                            */
                                                                            /* ========================== */


                                                                             //CREA LA TABELLA PER L'INVENTARIO
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
       let img = d.result[i].img;
       let disponibile = d.result[i].disponibile;
       //usernameSet.add(username.toLowerCase());
       //let tbody = document.getElementById("anagraficaClientiBody");
       const tr = document.createElement("tr");
       tr.innerHTML =
    
    `<td class="tdCustomer1">` +
   img +
    `</td>
   <td class="tdCustomer1">` +
   game +
    `</td>
    <td class="tdCustomer1">` +
   platform +
    `</td>
    <td class="tdCustomer1">` +
   annoUscita + 
    `</td> 
    <td class="tdCustomer1">` +
   stato +
    `</td> 
    <td class="tdCustomer1">` +
   condizioni +
    `</td> 
    <td class="tdCustomer1">` +
   etaMinima +
    `</td>
    <td class="tdCustomer1">` +
   peso + 
    `</td>
    <td class="tdCustomer1">` +
   numGiocatori +
    `</td>
    <td class="tdCustomer1">` +
   prezzo + 
    `</td>
    <td class="tdCustomer1">` +
   disponibile +
     `</td>
    <td class="tdCustomer1">` +
   idGame +
     `</td>
    <td class="tdCustomer1"><button data-bs-toggle="modal" data-bs-target="#modificaOggettoModal" class="btn btn-secondary" aria-label="bottone di modifica cliente" type="button" onclick="getObject(this)"><i class="bi bi-pencil-square"></i></button>
    </td>`;
   
   tbody.appendChild(tr);
   //console.log(d.result[i])
   }    
   }


  
                                                                          //VISUALIZZA L'INVENTARIO

  function visualizzaInventario() {
     
    var div = document.getElementById("inventarioContent");
    div.style.visibility = "visible";
    div.innerHTML = `
              
    <table border="1px" class="table table-striped table-bordered table-sm" cellspacing="2"  width="100%">
    <thead>
      <tr>
      <th th class="th-sm" scope="col">Immagine</th>
      <th th class="th-sm" scope="col">Titolo</th>
      <th th class="th-sm" scope="col">Piattaforma</th>
      <th th class="th-sm" scope="col">Anno di uscita</th>
      <th th class="th-sm" scope="col">Stato</th>
      <th th class="th-sm" scope="col">Condizioni</th>
      <th th class="th-sm" scope="col">PEGI</th>
      <th th class="th-sm" scope="col">Peso (GB)</th>
      <th th class="th-sm" scope="col">N° giocatori</th>
      <th th class="th-sm" scope="col">Prezzo ($/Giorno)</th>
      <th th class="th-sm" scope="col">Disponibile</th>
      <th th class="th-sm" scope="col">ID</th>
      <th th class="th-sm" scope="col">Modifica</th>
      </tr>
    </thead>
    <tbody id="inventarioBody">  
    </tbody>
  </table>      
    `;
  }

  var oldObject = null;
                                               // RITORNA IL SINGOLO OGGETTO
  
  function getObject(e){

    let current = e.parentNode.parentNode;
    let img = current.getElementsByClassName("tdCustomer1")[0].textContent;
    let game = current.getElementsByClassName("tdCustomer1")[1].textContent;
    let platform = current.getElementsByClassName("tdCustomer1")[2].textContent;
    let annoUscita = current.getElementsByClassName("tdCustomer1")[3].textContent;
    let stato = current.getElementsByClassName("tdCustomer1")[4].textContent;
    let condizioni = current.getElementsByClassName("tdCustomer1")[5].textContent;
    let etaMinima = current.getElementsByClassName("tdCustomer1")[6].textContent;
    let peso = current.getElementsByClassName("tdCustomer1")[7].textContent;
    let numGiocatori = current.getElementsByClassName("tdCustomer1")[8].textContent;
    let prezzo = current.getElementsByClassName("tdCustomer1")[9].textContent;
    let disponibile = current.getElementsByClassName("tdCustomer1")[10].textContent;
    let modal = document.getElementById("modificaOggettoModal");
    let data = modal.getElementsByClassName("form-control");
    data[0].value = img;
    data[1].value = game;
    data[2].value = platform;
    data[3].value = annoUscita;
    data[4].value = stato;
    data[5].value = condizioni;
    data[6].value = etaMinima;
    data[7].value = peso;
    data[8].value = numGiocatori;
    data[9].value = prezzo;
    data[10].value = disponibile;
    oldObject = current.getElementsByClassName("tdCustomer1")[11].textContent;
    
    //console.log(current.getElementsByClassName("tdCustomer")[2].textContent);
    //console.log(oldObject)
  }




                                                // MODIFICA IL SINGOLO OGGETTO

  function modObject(){

    var formData = $("#modObjectForm").serializeArray();

     //console.log(formData)
     //console.log(oldObject)

    if(
      formData[0].value != " " &&
      formData[1].value != " " &&
      formData[2].value != " " &&
      formData[3].value != " " &&
      formData[4].value != " " &&
      formData[5].value != " " && 
      formData[6].value != " " && 
      formData[7].value != " " && 
      formData[8].value != " " && 
      formData[9].value != " " &&
      formData[10].value != " " 
      
    ){
          
      $.ajax({

        url: "/db/updateObject",
        type: "POST",
        data: { oldObject, formData },
        dataType: "json",
        contentType: "application/x-www-form-urlencoded",
        success: function(data){

          if(data){
            document.getElementById("alert-body").textContent = "Titolo modificato con successo"
            $("#flash-modal").modal("show");
            $("#modObjectForm").trigger("reset");
            $("#modificaOggettoModal").modal("hide");
            console.log("Utente modificato");
            getGames();
          }
          else{

            document.getElementById("alert-body").textContent = "Errore. non è possibile modificare il titolo"
            $("#flash-modal").modal("show");
            console.log("errore");
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


                                              // RIMUOVE IL SINGOLO OGGETTO

  function delObject(){ 

        $.ajax({
          url: "/db/deleteObject",
          type: "DELETE",
          data: { oldObject },
          dataType: "json",
          contentType: "application/x-www-form-urlencoded",
          success: function(data){
          },
        });

        document.getElementById("alert-body").textContent = "Titolo rimosso con successo"
        $("#flash-modal").modal("show");
        $("#modObjectForm").trigger("reset");
        $("#modificaOggettoModal").modal("hide");
        console.log("Utente modificato");
        getGames();
    
  }

