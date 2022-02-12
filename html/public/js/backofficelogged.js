                                                                         
                                                                            /* ========================== */
                                                                            /*                            */
                                                                            /*           CLIENTI          */
                                                                            /*                            */
                                                                            /* ========================== */
                                            
                                               
                                                                                                                            
                                               // CHIAMATA AJAX RITORNA TUTTI I CLIENTI
function findClienti() {
   
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


function getNoleggi() {

   $.ajax({
     url: "/db/getNoleggi",
     type: "GET",
     data: '',
     dataType: "json",
     contentType: "application/x-www-form-urlencoded",
     success: function (d) {
       //console.log(d.result)
      creaTabellaNoleggi(d);
     },
   });
}



                                                // CREA LA TABELLA CON TUTTI I CLIENTI
 function creaTabellaClienti(d) {
 
    document.getElementById("anagraficaClientiBody").innerHTML = "";
    let tbody = document.getElementById("anagraficaClientiBody");
 
   for (let i in d.result) {
 
     let idCliente = d.result[i]._id;
     let nome = d.result[i].nome;
     let cognome = d.result[i].cognome;
     let username = d.result[i].username;
     let punti = d.result[i].punti;
     let citta = d.result[i].citta;
     let via = d.result[i].via
     const tr = document.createElement("tr");
     tr.innerHTML =
  
  `<td class="td2">` +
 nome +
  `</td>
  <td class="td2">` +
 cognome +
  `</td>
  <td class="td2">` +
 username +
  `</td>
  <td class="td2">` +
 citta + ', ' + via +
  `</td>  
  <td class="td2">` +
 punti +
  `</td> 
  <td class="td2">` +
 idCliente +
  `</td> 
  <td class="td2"><button data-bs-toggle="modal" data-bs-target="#modificaClienteModal" class="btn btn-secondary" aria-label="bottone di modifica cliente" type="button" onclick="getUser(this)">Modifica</button>
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
    let nome = current.getElementsByClassName("td2")[0].textContent;
    let cognome = current.getElementsByClassName("td2")[1].textContent;
    let username = current.getElementsByClassName("td2")[2].textContent;
    let string = current.getElementsByClassName("td2")[3].textContent;
    let cittaVia = string.split(", ");
    let citta = cittaVia[0];
    let via = cittaVia[1];
    let punti = current.getElementsByClassName("td2")[4].textContent;
    let modal = document.getElementById("modificaClienteModal");
    let data = modal.getElementsByClassName("form-control");
    data[0].value = nome;
    data[1].value = cognome;
    data[2].value = username;
    data[3].value = citta;
    data[4].value = via;
    data[5].value = punti;
    oldUser = current.getElementsByClassName("td2")[5].textContent;

    //console.log(oldUser)
  }




                                                // MODIFICA IL SINGOLO CLIENTE

  function modUser(){

    var formData = $("#modUserForm").serializeArray();

    //console.log(formData)

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
            //console.log("Utente modificato");
            findClienti();
          }
          else{

            document.getElementById("alert-body").textContent = "Errore. non è possibile modificare l'utente"
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

  
                                                //ELIMINA IL SINGOLO CLIENTE

var userCliente = null;

  function delUser(){
    let modal = document.getElementById("modificaClienteModal");
    userCliente = modal.getElementsByClassName("form-control")[2].value;
    //console.log(userCliente)
    let prenotato = 0;
    $.ajax({
      url: "/db/getNoleggi",
      type:"GET",
      data: {},
      dataType: "json",
      contentType: "application/x-www-form-urlencoded",
      success: function(d) {
        //console.log(d.result)
        for(let i in d.result){
       
          if (userCliente == d.result[i].usernameCliente && (d.result[i].stato == "futuro" || d.result[i].stato == "attivo")){
            console.log(d.result[i].usernameCliente)
            prenotato++;            
          }
        }
        //console.log(oldUser);
        //console.log(prenotato)
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
        //console.log("Utente rimosso");
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


  function  updatePuntiCliente(){

     let modal = document.getElementById("noleggia-modal");
     let user = modal.getElementsByClassName("form-control")[0].value;
     //console.log(user)

    $.ajax({
      url: "/db/updatePuntiCliente",
      type: "POST",
      data: { user },
      dataType: "json",
      contentType: "application/x-www-form-urlencoded",
      success: function(data){
      },
    });


  }



                                                                            
                                                                            /* ========================== */
                                                                            /*                            */
                                                                            /*          NOLEGGI           */
                                                                            /*                            */
                                                                            /* ========================== */




function registerNoleggio(){

  var formData = $("#creaNoleggioForm").serializeArray();

  //console.log(formData)

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

      url: "/db/registerNoleggio",
      type: "POST",
      data: { formData },
      dataType: "json",
      contentType: "application/x-www-form-urlencoded",
      success: function(data){

        if(data){

          document.getElementById("alert-body").textContent = "Nuovo noleggio registrato con successo"
          $("#flash-modal").modal("show");
          $("#creaNoleggioForm").trigger("reset");
          $("#noleggia-modal").modal("hide");
          //console.log("Utente modificato");
          //findClienti();
        }
        else{

          document.getElementById("alert-body").textContent = "Errore. non è possibile registrare il noleggio"
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
    let cardBody = document.getElementById("card-list");
 
   for (let i in d.result) {
 
     let game = d.result[i].game;
     let platform = d.result[i].platform;
     let annoUscita = d.result[i].annoUscita;
     let stato = d.result[i].stato;
     let condizioni = d.result[i].condizioni;
     let etaMinima = d.result[i].etaMinima;
     let prezzo = d.result[i].prezzo;
     let img = d.result[i].img;
     const div = document.createElement("div");
     div.innerHTML =
     `
     <div class="col">
     <div class="card shadow-sm gameCard" style="text-align: center;">
       <div id="pegi" style="color: white;" class="val">PEGI ` + etaMinima + `</div>
       <img id="image" src=`+ img +` class="val" alt="immagine di " `+ game + `" per " ` + platform + `>
       <div class="card-body">
         <h3 style="color: white;" class="val">` + game + `</h3>
         <h5 style="color: white;" class="val">` + platform + `</h5>
         <button data-bs-toggle="modal" data-bs-target="#noleggia-modal" class="btn btn-primary" aria-label="bottone di crea noleggio" onclick="creaNoleggio(this); findClienti(); vediDateDisponibilitaOggetto(this); setMaxCalendar(this)"><i class="bi bi-pencil-square"> Noleggia</i></button>
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
    </div>`;
   
   

 cardBody.appendChild(div);
 //console.log(d.result[i])
 }    
 }

let dateOccupateI = [];
let dateOccupateF = [];

let dateOccupateTot = [];

//var c = {};

 function vediDateDisponibilitaOggetto(e){

  let current = e.parentNode.parentNode;
  let game = current.getElementsByClassName("val")[2].textContent;
  let platform = current.getElementsByClassName("val")[3].textContent;
  let j = 0;
  //console.log(game,platform)

  $.ajax({
    url: "/db/getNoleggi",
    type: "GET",
    data: {},
    dataType: "json",
    contentType: "application/x-www-form-urlencoded",
    success: function (d) {
         
         //console.log(d.result);

         for(let i in d.result){

          if(d.result[i].titoloNoleggiato == game && d.result[i].piattaforma == platform){

             dateOccupateI[j] = d.result[i].inizioNoleggio;
             dateOccupateF[j] = d.result[i].fineNoleggio;
             dateOccupateTot[j] =  "Il titolo è indisponibile da "+ dateOccupateI[j] + " a " + dateOccupateF[j] + " compresi";
             //console.log(dateOccupateI[i],dateOccupateF[i])
             j++;
      
            // var daylist = getDaysArray(new Date(dateOccupateI[i]),new Date(dateOccupateF[i]));
                        //daylist.map((v)=>v.toISOString().slice(0,10)).join("")

                        //let a = daylist.toString();
                        //let b = a.split(" ");
                        //c = b[1] + " " + b[2] + " "+ b[3];
                        //alert("Il titolo non è disponibile da " + dateOccupateI[i] + " a " + dateOccupateF[i])                    
          }
         }
         //alert("Il titolo non è disponibile da " + dateOccupateI.join('\n') + " a " + dateOccupateF.join('\n'))
         alert(dateOccupateTot.join('\n'))    
        //console.log(daylist)
    },
  });
}

/*
 var getDaysArray = function(start, end) {
  for(var arr=[],dt=new Date(start); dt<=end; dt.setDate(dt.getDate()+1)){
      arr.push(new Date(dt));
  }
  return arr;
};
*/


function setMaxCalendar(e){

  let current = e.parentNode.parentNode;
  let game1 = current.getElementsByClassName("val")[2].textContent;
  let platform1 = current.getElementsByClassName("val")[3].textContent;
  let maxval = null;

  $.ajax({
    url: "/db/getGames",
    type: "GET",
    data: {},
    dataType: "json",
    contentType: "application/x-www-form-urlencoded",
    success: function (d) {


      for(let i in d.result){

        if(d.result[i].game == game1 && d.result[i].platform == platform1){

          maxval = d.result[i].dataIndisponibilita;
        }
      }

      modal = document.getElementById("noleggia-modal");
      let da = modal.getElementsByClassName("newval")[3];
      let a = modal.getElementsByClassName("newval")[4];

      a.setAttribute("max", maxval);
      da.setAttribute("max", maxval);

}

});
}

/*

function verificaDisponibilita(){

  let modal = document.getElementById("noleggia-modal");
  let a = modal.getElementsByClassName("newval")[3].value;
  let b = modal.getElementsByClassName("newval")[4].value;

  a = a.split("-");
  b = b.split("-");

  let d1 = new Date(a[2],a[1]-1,a[0]);
  let d2 = new Date(b[2],b[1]-1,b[0]);

  d1 = d1.getTime();
  d2 = d2.getTime();

  for(let i in dateOccupateTot[i]){

    if(d1 ){

      alert("Il prodotto è indisponibile nel periodo selezionato");
    }
  
  }

}

*/
 

 function searchNavbar(){

  var input, filter, div, div1, h3, i, txtValue;
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


function searchNavbar2(){

  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("searchFilterNavbar2");
  filter = input.value.toUpperCase();
  table = document.getElementById("table-body-noleggi");
  tr = table.getElementsByTagName("tr");
  
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[0];
    if(td)
    //txtValue = td.textContent || td.innerText;
    if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
      tr[i].style.display = "";
    } else {
      tr[i].style.display = "none";
    }
  }
}

   
 function creaNoleggio(e){

  let current = e.parentNode.parentNode;
  let game = current.getElementsByClassName("val")[2].textContent;
  let platform = current.getElementsByClassName("val")[3].textContent;
  let prezzo = current.getElementsByClassName("val")[4].textContent;
  
  //console.log(game,platform)
  let modal = document.getElementById("noleggia-modal");
  user = modal.getElementsByClassName("useruser")[0].textContent;
  user = user.split(" ")[2];
  //console.log(user)
  

  let data = modal.getElementsByClassName("newval");
  data[0].value = user;
  data[1].value =  game;
  data[2].value =  platform;
  
  let prezzo1 = prezzo.split(" ")[0];
  data[5].value = prezzo1;
 
  
 }

 //                                     SELECT FORM CHE MOSTRA TUTTI CLIENTI A CUI ASSOCIARE UN NOLEGGIO

 function  listClientiSelectNoleggio(d){
  
  document.getElementById("usernameCliente1").options.length = 0;
  let option = document.createElement("OPTION");
  option.setAttribute("value", "nessun cliente selezionato");
  let option2 = document.createTextNode("Scegli cliente ...");
  option.appendChild(option2);
  document.getElementById("usernameCliente1").appendChild(option);
 
  for (let i in d.result) {

    let username = d.result[i].username;
    
    let option = document.createElement("OPTION");
    option.setAttribute("value", username);
    let option2 = document.createTextNode(username);
    option.appendChild(option2);
    document.getElementById("usernameCliente1").appendChild(option);
 }
}

function calcolaPuntiCliente(){

   var usernameCliente = document.getElementById("usernameCliente1").value;
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
      data[6].value = punti;       
    },
  });
}

function calculateDays() {
  var d1 = document.getElementById("inizioNoleggio1").value;
  var d2 = document.getElementById("fineNoleggio1").value;    
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

  let costoDay = document.getElementById("costo1").value;
  //console.log(costoDay)
  let costo = parseFloat(costoDay.split(" ")[0]);
  //console.log(costo)

  let modal = document.getElementById("noleggia-modal");
  let data = modal.getElementsByClassName("newval");
  let punti =  modal.getElementsByClassName("newval")[6].value;
  //punti = parseFloat(punti);
  data[7].value = (costo * days ).toFixed(2);
  //console.log(costo * days)
  
}
   
function applicaPunti(){

  let modal = document.getElementById("noleggia-modal");
  let data = modal.getElementsByClassName("newval");

  if (punti != 0){
    data[7].value = (data[7].value - (punti  / 10)).toFixed(2);
    punti = punti - punti;
  } 
  else{
    data[7].value = (data[7].value - (0)).toFixed(2);
  }
}







function creaTabellaNoleggi(d){

  document.getElementById("noleggioBody").innerHTML = "";
  //usernameSet.clear();
  //usernameArray = [];
  let tbody = document.getElementById("noleggioBody");

 for (let i in d.result) {
   let idNoleggio = d.result[i]._id;
   let usernameCliente = d.result[i].usernameCliente;
   let titoloNoleggiato = d.result[i].titoloNoleggiato;
   let piattaforma = d.result[i].piattaforma;
   let usernameFunzionario = d.result[i].usernameFunzionario;
   let inizioNoleggio = d.result[i].inizioNoleggio;
   let fineNoleggio = d.result[i].fineNoleggio;
   let prezzoTotale = d.result[i].prezzoTotale;
   let costoGiorno = d.result[i].costoGiorno;
   let stato = d.result[i].stato;
   let commenti = d.result[i].commenti
   //usernameSet.add(username.toLowerCase());
   //let tbody = document.getElementById("anagraficaClientiBody");
   const tr = document.createElement("tr");
   tr.innerHTML =

`<td class="td6">` +
usernameCliente +
`</td>
<td class="td6">` +
titoloNoleggiato +
`</td>
<td class="td6">` +
piattaforma +
`</td>
<td class="td6">` +
usernameFunzionario +
`</td>  
<td class="td6">` +
inizioNoleggio +
`</td> 
<td class="td6">` +
fineNoleggio +
`</td> 
<td class="td6">` +
prezzoTotale +
`</td> 
<td class="td6">` +
costoGiorno +
`</td> 
<td class="td6">` +
stato +
`</td> 
<td class="td6">` +
commenti +
`</td> 
<td class="td6">` +
idNoleggio +
`</td>`;

    tbody.appendChild(tr);
    //console.log(d.result[i])
}
}



function visualizzaNoleggi() {
     
  var div = document.getElementById("noleggiContent");
  div.style.visibility = "visible";
  div.innerHTML = `
            
  <table border="2px" id="table-body-noleggi" class="table table-striped table-bordered table-sm" cellspacing="2" width="100%">
  <thead>
    <tr>
    <th th class="th-sm" scope="col">Cliente</th>
    <th th class="th-sm" scope="col">Titolo</th>
    <th th class="th-sm" scope="col">Piattaforma</th>
    <th th class="th-sm" scope="col">Dipendente</th>
    <th th class="th-sm" scope="col">Data inizio noleggio</th>
    <th th class="th-sm" scope="col">Data fine noleggio</th>
    <th th class="th-sm" scope="col">Importo totale</th>
    <th th class="th-sm" scope="col">Costo/giorno</th>
    <th th class="th-sm" scope="col">Stato noleggio</th>
    <th th class="th-sm" scope="col">Commenti</th>
    <th th class="th-sm" scope="col">ID Noleggio</th>
    </tr>
  </thead>
  <tbody id="noleggioBody">  
  </tbody>
</table>      
  `;
}


function getNoleggiTerminati() {

  $.ajax({
    url: "/db/getNoleggiTerminati",
    type: "GET",
    data: '',
    dataType: "json",
    contentType: "application/x-www-form-urlencoded",
    success: function (d) {
      //console.log(d.result)
     creaTabellaNoleggiTerminati(d);
    },
  });
}


function creaTabellaNoleggiTerminati(d){

  
  document.getElementById("noleggioTerminatoBody").innerHTML = "";
  //usernameSet.clear();
  //usernameArray = [];
  let tbody = document.getElementById("noleggioTerminatoBody");

 for (let i in d.result) {
   let idNoleggio = d.result[i]._id;
   let usernameCliente = d.result[i].usernameCliente;
   let titoloNoleggiato = d.result[i].titoloNoleggiato;
   let piattaforma = d.result[i].piattaforma;
   let usernameFunzionario = d.result[i].usernameFunzionario;
   let inizioNoleggio = d.result[i].inizioNoleggio;
   let fineNoleggio = d.result[i].fineNoleggio;
   let prezzoTotale = d.result[i].prezzoTotale;
   let stato = d.result[i].stato
   let commenti = d.result[i].commenti
   //usernameSet.add(username.toLowerCase());
   //let tbody = document.getElementById("anagraficaClientiBody");
   const tr = document.createElement("tr");
   tr.innerHTML =

`<td class="td5">` +
usernameCliente +
`</td>
<td class="td5">` +
titoloNoleggiato +
`</td>
<td class="td5">` +
piattaforma +
`</td>
<td class="td5">` +
usernameFunzionario +
`</td>  
<td class="td5">` +
inizioNoleggio +
`</td> 
<td class="td5">` +
fineNoleggio +
`</td> 
<td class="td5">` +
prezzoTotale +
`</td> 
<td class="td5">` +
stato +
`</td> 
<td class="td5">` +
commenti +
`</td> 
<td class="td5">` +
idNoleggio +
`</td> 
<td class="td5"><button data-bs-toggle="modal" data-bs-target="#fattura-modal" class="btn btn-secondary" aria-label="bottone di modifica noleggio" type="button" id="btnPDF" onclick="vediFatturaNoleggiConclusi(this)">Vedi fattura</button>
</td>`;

    tbody.appendChild(tr);
    //console.log(d.result[i])
}
}




function visualizzaNoleggiTerminati() {
     
  var div = document.getElementById("noleggiTerminatiContent");
  div.style.visibility = "visible";
  div.innerHTML = `
            
  <table border="2px" class="table table-striped table-bordered table-sm" cellspacing="2" width="100%">
  <thead>
    <tr>
    <th th class="th-sm" scope="col">Cliente</th>
    <th th class="th-sm" scope="col">Titolo</th>
    <th th class="th-sm" scope="col">Piattaforma</th>
    <th th class="th-sm" scope="col">Dipendente</th>
    <th th class="th-sm" scope="col">Data inizio noleggio</th>
    <th th class="th-sm" scope="col">Data fine noleggio</th>
    <th th class="th-sm" scope="col">Importo</th>
    <th th class="th-sm" scope="col">Stato noleggio</th>
    <th th class="th-sm" scope="col">Commenti</th>
    <th th class="th-sm" scope="col">ID Noleggio</th>
    <th th class="th-sm" scope="col">Fattura</th>
    </tr>
  </thead>
  <tbody id="noleggioTerminatoBody">  
  </tbody>
</table>      
  `;
}


function vediFatturaNoleggiConclusi(e){

  let modal = document.getElementById("fattura-modal");
  let body = modal.getElementsByClassName("modal-body")[0];
  body.innerHTML=" "
  let div = document.createElement("div");
  
  let current = e.parentNode.parentNode;
  let usernameCliente = current.getElementsByClassName("td5")[0].textContent;
  let titoloNoleggiato = current.getElementsByClassName("td5")[1].textContent;
  let piattaforma = current.getElementsByClassName("td5")[2].textContent;
  //let usernameFunzionario= current.getElementsByClassName("td5")[3].textContent;
  let inizioNoleggio = current.getElementsByClassName("td5")[4].textContent;
  let fineNoleggio = current.getElementsByClassName("td5")[5].textContent;
  let prezzoTotale = current.getElementsByClassName("td5")[6].textContent;
  //let costoGiorno = current.getElementsByClassName("td5")[7].textContent;
  //let stato = current.getElementsByClassName("td5")[8].textContent;
  let commenti = current.getElementsByClassName("td5")[8].textContent;
  let idNoleggio = current.getElementsByClassName("td5")[9].textContent;
 
  // console.log(idNoleggio)
  div.innerHTML =
  `<div class="page-content container">
  <div class="page-header text-blue-d2">
      <h1 class="page-title text-secondary-d1">
          ID NOLEGGIO:
          <small class="page-info">
              <i class="fa fa-angle-double-right text-80"></i>
              ` + idNoleggio + `
          </small>
      </h1>

  </div>

  <div class="container px-0">
      <div class="row mt-4">
          <div class="col-12 col-lg-12">
              <div class="row">
                  <div class="col-12">
                      <div class="text-center text-150">
                          <i class="fa fa-book fa-2x text-success-m2 mr-1">ID noleggio</i>
                      </div>
                  </div>
              </div>
              <!-- .row -->

              <hr class="row brc-default-l1 mx-n1 mb-4" />

              <div class="row">
                  <div class="col-sm-6">
                      <div>
                          <span class="text-sm text-grey-m2 align-middle">CLIENTE: </span>
                          <span class="text-600 text-110 text-blue align-middle">`+ usernameCliente +`</span>
                      </div>
                  </div>
                  <!-- /.col -->

                  <!-- /.col -->
              </div>

              <div class="mt-4">
                  <div class="row text-600 text-white bgc-default-tp1 py-25">
                      <div class="d-none d-sm-block col-1">#</div>
                      <div class="col-9 col-sm-5">Description</div>
                      <div class="d-none d-sm-block col-4 col-sm-2">Qty</div>
                      <div class="d-none d-sm-block col-sm-2">Unit Price</div>
                      <div class="col-2">Amount</div>
                  </div>

                  <div class="text-95 text-secondary-d3">
                      <div class="row mb-2 mb-sm-0 py-25">
                          <div class="d-none d-sm-block col-1">TITOLO NOLEGGIATO:</div>
                          <div class="col-9 col-sm-5"></div>
                          <hr>
                          <div class="col-9 col-sm-5">`+ titoloNoleggiato + ", " + piattaforma +`</div>
                          <hr>
                          <div class="d-none d-sm-block col-1">DA:</div>
                          <div class="col-9 col-sm-5"></div>
                          <hr>
                          <div class="col-9 col-sm-5">`+ inizioNoleggio + `</div>
                          <hr>
                          <div class="d-none d-sm-block col-1">A:</div>
                          <div class="col-9 col-sm-5"></div>
                          <hr>
                          <div class="col-9 col-sm-5">`+ fineNoleggio + `</div>
                          <hr>
                          <div class="col-9 col-sm-5">NOTE SUL PRODOTTO</div>
                          <div class="col-9 col-sm-5"></div>
                          <hr>
                          <div class="col-9 col-sm-5">`+ commenti + `</div>
                          <hr>           
                      </div>       
                  </div>
                  <div class="row border-b-2 brc-default-l2"></div>
          

                  <div class="row mt-3">
                      <div class="col-12 col-sm-7 text-grey-d2 text-95 mt-2 mt-lg-0">
        
                      </div>

                      <div class="col-12 col-sm-5 text-grey text-90 order-first order-sm-last">
                          <div class="row my-2">
                              <div class="col-7 text-right">
                                  TOTALE IMPORTO
                              </div>
                              <div class="col-5">
                                  <span class="text-120 text-secondary-d1">` + prezzoTotale + " euro" + `</span>
                              </div>
                          </div>

                          <div class="row my-2">
                              <div class="col-7 text-right">
                                  TASSE
                              </div>
                              <div class="col-5">
                                  <span class="text-110 text-secondary-d1">`+ "0 euro" + `</span>
                              </div>
                          </div>

                          <div class="row my-2 align-items-center bgc-primary-l3 p-2">
                              <div class="col-7 text-right">
                                  Eventuali sconti sono stati applicati sull' importo totale
                              </div>
                          </div>
                      </div>
                  </div>

                  <hr />

                  <div>
                      <span class="text-secondary-d1 text-105">La ringraziamo per l'acquisto</span>
                  </div>
              </div>
          </div>
      </div>
  </div>
</div>`;
   body.appendChild(div)
}



function getNoleggiAttivi() {

  $.ajax({
    url: "/db/getNoleggiAttivi",
    type: "GET",
    data: '',
    dataType: "json",
    contentType: "application/x-www-form-urlencoded",
    success: function (d) {
      //console.log(d.result)
     creaTabellaNoleggiAttivi(d);
    },
  });
}


function creaTabellaNoleggiAttivi(d){

  
  document.getElementById("noleggioAttiviBody").innerHTML = "";
  //usernameSet.clear();
  //usernameArray = [];
  let tbody = document.getElementById("noleggioAttiviBody");

 for (let i in d.result) {
   let idNoleggio = d.result[i]._id;
   let usernameCliente = d.result[i].usernameCliente;
   let titoloNoleggiato = d.result[i].titoloNoleggiato;
   let piattaforma = d.result[i].piattaforma;
   let usernameFunzionario = d.result[i].usernameFunzionario;
   let inizioNoleggio = d.result[i].inizioNoleggio;
   let fineNoleggio = d.result[i].fineNoleggio;
   let prezzoTotale = d.result[i].prezzoTotale;
   let stato = d.result[i].stato
   let commenti = d.result[i].commenti
   //usernameSet.add(username.toLowerCase());
   //let tbody = document.getElementById("anagraficaClientiBody");
   const tr = document.createElement("tr");
   tr.innerHTML =

`<td class="td4">` +
usernameCliente +
`</td>
<td class="td4">` +
titoloNoleggiato +
`</td>
<td class="td4">` +
piattaforma +
`</td>
<td class="td4">` +
usernameFunzionario +
`</td>  
<td class="td4">` +
inizioNoleggio +
`</td> 
<td class="td4">` +
fineNoleggio +
`</td> 
<td class="td4">` +
prezzoTotale +
`</td> 
<td class="td4">` +
stato +
`</td> 
<td class="td4">` +
commenti +
`</td>
<td class="td4">` +
idNoleggio +
`</td>`;

    tbody.appendChild(tr);
    //console.log(d.result[i])
}
}




function visualizzaNoleggiAttivi() {
     
  var div = document.getElementById("noleggiAttiviContent");
  div.style.visibility = "visible";
  div.innerHTML = `
            
  <table border="2px" class="table table-striped table-bordered table-sm" cellspacing="2" width="100%">
  <thead>
    <tr>
    <th th class="th-sm" scope="col">Cliente</th>
    <th th class="th-sm" scope="col">Titolo</th>
    <th th class="th-sm" scope="col">Piattaforma</th>
    <th th class="th-sm" scope="col">Dipendente</th>
    <th th class="th-sm" scope="col">Data inizio noleggio</th>
    <th th class="th-sm" scope="col">Data fine noleggio</th>
    <th th class="th-sm" scope="col">Importo totale</th>
    <th th class="th-sm" scope="col">Stato noleggio</th>
    <th th class="th-sm" scope="col">Commenti</th>
    <th th class="th-sm" scope="col">ID Noleggio</th>
    </tr>
  </thead>
  <tbody id="noleggioAttiviBody">  
  </tbody>
</table>      
  `;
}




function getNoleggiFuturi() {

  $.ajax({
    url: "/db/getNoleggiFuturi",
    type: "GET",
    data: '',
    dataType: "json",
    contentType: "application/x-www-form-urlencoded",
    success: function (d) {
      //console.log(d.result)
     creaTabellaNoleggiFuturi(d);
    },
  });
}


function creaTabellaNoleggiFuturi(d){

  
  document.getElementById("noleggioFuturiBody").innerHTML = "";
  //usernameSet.clear();
  //usernameArray = [];
  let tbody = document.getElementById("noleggioFuturiBody");

 for (let i in d.result) {
   let idNoleggio = d.result[i]._id;
   let usernameCliente = d.result[i].usernameCliente;
   let titoloNoleggiato = d.result[i].titoloNoleggiato;
   let piattaforma = d.result[i].piattaforma;
   let usernameFunzionario = d.result[i].usernameFunzionario;
   let inizioNoleggio = d.result[i].inizioNoleggio;
   let fineNoleggio = d.result[i].fineNoleggio;
   let prezzoTotale = d.result[i].prezzoTotale;
   let stato = d.result[i].stato
   let commenti = d.result[i].commenti
   let costoGiorno = d.result[i].costoGiorno
   //usernameSet.add(username.toLowerCase());
   //let tbody = document.getElementById("anagraficaClientiBody");
   const tr = document.createElement("tr");
   tr.innerHTML =

`<td class="td3">` +
usernameCliente +
`</td>
<td class="td3">` +
titoloNoleggiato +
`</td>
<td class="td3">` +
piattaforma +
`</td>
<td class="td3">` +
usernameFunzionario +
`</td>  
<td class="td3">` +
inizioNoleggio +
`</td> 
<td class="td3">` +
fineNoleggio +
`</td> 
<td class="td3">` +
prezzoTotale +
`</td> 
<td class="td3">` +
costoGiorno +
`</td> 
<td class="td3">` +
stato +
`</td> 
<td class="td3">` +
commenti +
`</td> 
<td class="td3">` +
idNoleggio +
`</td> 
<td class="td3"><button data-bs-toggle="modal" data-bs-target="#modificaNoleggioFuturoModal" class="btn btn-secondary" aria-label="bottone di modifica noleggio" type="button" onclick="getNoleggioFuturo(this)">Modifica</button>
</td>`;

    tbody.appendChild(tr);
    //console.log(d.result[i])
}
}


function visualizzaNoleggiFuturi() {
     
  var div = document.getElementById("noleggiFuturiContent");
  div.style.visibility = "visible";
  div.innerHTML = `
            
  <table border="2px" class="table table-striped table-bordered table-sm" cellspacing="2" width="100%">
  <thead>
    <tr>
    <th th class="th-sm" scope="col">Cliente</th>
    <th th class="th-sm" scope="col">Titolo</th>
    <th th class="th-sm" scope="col">Piattaforma</th>
    <th th class="th-sm" scope="col">Dipendente</th>
    <th th class="th-sm" scope="col">Data inizio noleggio</th>
    <th th class="th-sm" scope="col">Data fine noleggio</th>
    <th th class="th-sm" scope="col">Importo totale</th>
    <th th class="th-sm" scope="col">Costo/giorno</th>
    <th th class="th-sm" scope="col">Stato noleggio</th>
    <th th class="th-sm" scope="col">Commenti</th>
    <th th class="th-sm" scope="col">ID Noleggio</th>
    <th th class="th-sm" scope="col">Modifica</th>
    </tr>
  </thead>
  <tbody id="noleggioFuturiBody">  
  </tbody>
</table>      
  `;
}



var oldNoleggio = null;

function getNoleggioFuturo(e){

  let current = e.parentNode.parentNode;
  let usernameCliente = current.getElementsByClassName("td3")[0].textContent;
  let titoloNoleggiato = current.getElementsByClassName("td3")[1].textContent;
  let piattaforma = current.getElementsByClassName("td3")[2].textContent;
  let usernameFunzionario= current.getElementsByClassName("td3")[3].textContent;
  let inizioNoleggio = current.getElementsByClassName("td3")[4].textContent;
  let fineNoleggio = current.getElementsByClassName("td3")[5].textContent;
  let prezzoTotale = current.getElementsByClassName("td3")[6].textContent;
  let costoGiorno = current.getElementsByClassName("td3")[7].textContent;
  let stato = current.getElementsByClassName("td3")[8].textContent;
  let commenti = current.getElementsByClassName("td3")[9].textContent;
  let modal = document.getElementById("modificaNoleggioFuturoModal");
  let data = modal.getElementsByClassName("form-control");
  data[0].value = titoloNoleggiato;
  data[1].value = piattaforma;
  data[2].value = usernameCliente;
  data[3].value = inizioNoleggio;
  data[4].value = fineNoleggio;
  data[5].value = costoGiorno;
  data[6].value = prezzoTotale;
  data[7].value = stato;
  data[8].value = commenti;
  oldNoleggio = current.getElementsByClassName("td3")[10].textContent;
}



function calculateDays2() {
  var d1 = document.getElementById("inizioNoleggio").value;
  var d2 = document.getElementById("fineNoleggio").value;    
  const dateOne = new Date(d1);
  const dateTwo = new Date(d2);
  if(dateOne <= dateTwo){
     const time = Math.abs(dateTwo - dateOne);
     const days = Math.ceil(time / (1000 * 60 * 60 * 24));
     calcolaCosto2(days + 1); 
  }
  else{
     days = 0;
     calcolaCosto2(days);
     alert("La data di inizio del noleggio deve essere precedente alla data di fine noleggio")
  }
  //console.log(days)
  
}    


function calcolaCosto2(days){

  let costoDay = document.getElementById("costoGiorno").value;
  //console.log(costoDay)
  let costo = parseFloat(costoDay.split(" ")[0]);
  //console.log(costo)
  //punti = parseFloat(punti);
  document.getElementById("prezzoTotale1").value = (costo * days ).toFixed(2);
  //console.log(costo * days)
  
}


  
function modNoleggioFuturo(){

  var formData = $("#modNoleggioForm").serializeArray();

  if(
    formData[0].value != " " &&
    formData[1].value != " " &&
    formData[2].value != " " &&
    formData[3].value != " " &&
    formData[4].value != " " &&
    formData[5].value != " " &&
    formData[6].value != " " &&
    formData[7].value != " " &&
    formData[8].value != " " 
    
  ){
        
    $.ajax({

      url: "/db/updateNoleggioFuturo",
      type: "POST",
      data: { oldNoleggio, formData },
      dataType: "json",
      contentType: "application/x-www-form-urlencoded",
      success: function(data){

        if(data){

          document.getElementById("alert-body").textContent = "prenotazione modificata con successo"
          $("#flash-modal").modal("show");
          $("#modNoleggioForm").trigger("reset");
          $("#modificaNoleggioFuturoModal").modal("hide");
          console.log("Noleggio modificato");
          getNoleggi();
         // getNoleggiAttivi();
         // getNoleggiFuturi();
         // getNoleggiTerminati();
        }
        else{

          document.getElementById("alert-body").textContent = "Errore. non è possibile modificare la prenotazione"
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

function delNoleggioFuturo(){ 

      $.ajax({
        url: "/db/deleteNoleggioFuturo",
        type: "DELETE",
        data: { oldNoleggio },
        dataType: "json",
        contentType: "application/x-www-form-urlencoded",
        success: function(data){
        },
      });

      document.getElementById("alert-body").textContent = "Prenotazione rimossa con successo"
      $("#flash-modal").modal("show");
      $("#modNoleggioForm").trigger("reset");
      $("#modificaNoleggioFuturoModal").modal("hide");
      console.log("noleggio modificato");
      getNoleggi();
         // getNoleggiAttivi();
         // getNoleggiFuturi();
         // getNoleggiTerminati();
  
}





                                                                           
                                                                            /* ========================== */
                                                                            /*                            */
                                                                            /*          OGGETTI           */
                                                                            /*                            */
                                                                            /* ========================== */




function registerObject(){

  var formData = $("#createObjectForm").serializeArray();

  //console.log(formData)

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
    formData[9].value != " "   
  ){
        
    $.ajax({

      url: "/db/registerObject",
      type: "POST",
      data: { formData },
      dataType: "json",
      contentType: "application/x-www-form-urlencoded",
      success: function(data){

        if(data){

          document.getElementById("alert-body").textContent = "Nuovo oggetto registrato con successo"
          $("#flash-modal").modal("show");
          $("#createObjectForm").trigger("reset");
          $("#aggiungiOggetto").modal("hide");
          //console.log("Utente modificato");
          getGames();
        }
        else{

          document.getElementById("alert-body").textContent = "Errore. non è possibile registrare l'oggetto"
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
       let dataIndisponibilita = d.result[i].dataIndisponibilita;
       //usernameSet.add(username.toLowerCase());
       //let tbody = document.getElementById("anagraficaClientiBody");
       const tr = document.createElement("tr");
       tr.innerHTML =   
    `<td class="td1">` +
   game +
    `</td>
    <td class="td1">` +
   platform +
    `</td>
    <td class="td1">` +
   annoUscita + 
    `</td> 
    <td class="td1">` +
   stato +
    `</td> 
    <td class="td1">` +
   condizioni +
    `</td> 
    <td class="td1">` +
   etaMinima +
    `</td>
    <td class="td1">` +
   peso + 
    `</td>
    <td class="td1">` +
   numGiocatori +
    `</td>
    <td class="td1">` +
   prezzo + 
    `</td>
    <td class="td1">` +
   disponibile + 
    `</td>
    <td class="td1">` +
   dataIndisponibilita + 
    `</td>
   <td class="td1">` +
   idGame +
     `</td>
    <td class="td1"><button data-bs-toggle="modal" data-bs-target="#modificaOggettoModal" class="btn btn-secondary" aria-label="bottone di modifica prodotto" type="button" onclick="getObject(this)">Modifica</button>
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
      <th th class="th-sm" scope="col">Indisponibile da</th>
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
    let img = null;//= current.getElementsByClassName("td1")[0].textContent;
    let game = current.getElementsByClassName("td1")[0].textContent;
    let platform = current.getElementsByClassName("td1")[1].textContent;
    let annoUscita = current.getElementsByClassName("td1")[2].textContent;
    let stato = current.getElementsByClassName("td1")[3].textContent;
    let condizioni = current.getElementsByClassName("td1")[4].textContent;
    let etaMinima = current.getElementsByClassName("td1")[5].textContent;
    let peso = current.getElementsByClassName("td1")[6].textContent;
    let numGiocatori = current.getElementsByClassName("td1")[7].textContent;
    let prezzo = current.getElementsByClassName("td1")[8].textContent;
    let disponibile = current.getElementsByClassName("td1")[9].textContent;
    let dataIndisponibilita = current.getElementsByClassName("td1")[10].textContent;
    let modal = document.getElementById("modificaOggettoModal");
    let data = modal.getElementsByClassName("form-control");
    
    //data[0].value = img;
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
    data[11].value = dataIndisponibilita;
    oldObject = current.getElementsByClassName("td1")[11].textContent;
    
    //console.log(oldObject)
    $.ajax({

      url: "/db/getGames",
      type: "GET",
      data: {},
      dataType: "json",
      contentType: "application/x-www-form-urlencoded",
      success: function(d){

        for(let i in d.result){

          if(d.result[i].game == game && d.result[i].platform == platform){

           img = d.result[i].img
          }    
        }
        data[0].value = img;
      }
      });



  }



                                                // MODIFICA IL SINGOLO OGGETTO

  function modObject(){

    var formData = $("#modObjectForm").serializeArray();

     console.log(formData)
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
      formData[10].value != " " &&
      formData[11].value != " "
      
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
            //console.log("Titolo modificato");
            getGames();

          }
          else{

            document.getElementById("alert-body").textContent = "Errore. non è possibile modificare il titolo"
            $("#flash-modal").modal("show");
            console.log("errore");
          }
          //getGames();
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
        //console.log("titolo rimosso");
        getGames();
    
  }


  function convertImgObject(){

    let img = document.getElementById("img11");
    var reader = new FileReader();

    if(img.files[0] != undefined){

      reader.readAsDataURL(img.files[0]);
      
      reader.onload = function(){
      document.getElementById("img").value = reader.result;
      console.log(reader.result)
      };
      
      reader.onerror = function(error){
      onmouseleave.log("errore" ,error);
      };
    }
  }


  function immagineConvertitapopolaText(){

    let imgConverted = convertImgObject();
    let modal = document.getElementById("aggiungiOggetto");
    modal.getElementsByClassName("form-control")[0].value = imgConverted;

  }




  function convertImgObject2(){

    let img = document.getElementById("img22");
    var reader = new FileReader();

    if(img.files[0] != undefined){

      reader.readAsDataURL(img.files[0]);
      
      reader.onload = function(){
      document.getElementById("imgC").value = reader.result;
      console.log(reader.result)
      };
      
      reader.onerror = function(error){
      onmouseleave.log("errore" ,error);
      };
    }
  }


  function immagineConvertitapopolaText2(){

    let imgConverted = convertImgObject2();
    let modal = document.getElementById("modificaOggettoModal");
    modal.getElementsByClassName("form-control")[0].value = imgConverted;

  }

