                                                                         
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

`<td class="tdCustomer">` +
usernameCliente +
`</td>
<td class="tdCustomer">` +
titoloNoleggiato +
`</td>
<td class="tdCustomer">` +
piattaforma +
`</td>
<td class="tdCustomer">` +
usernameFunzionario +
`</td>  
<td class="tdCustomer">` +
inizioNoleggio +
`</td> 
<td class="tdCustomer">` +
fineNoleggio +
`</td> 
<td class="tdCustomer">` +
prezzoTotale +
`</td> 
<td class="tdCustomer">` +
costoGiorno +
`</td> 
<td class="tdCustomer">` +
stato +
`</td> 
<td class="tdCustomer">` +
commenti +
`</td> 
<td class="tdCustomer">` +
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
      console.log(d.result)
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

`<td class="tdCustomer">` +
usernameCliente +
`</td>
<td class="tdCustomer">` +
titoloNoleggiato +
`</td>
<td class="tdCustomer">` +
piattaforma +
`</td>
<td class="tdCustomer">` +
usernameFunzionario +
`</td>  
<td class="tdCustomer">` +
inizioNoleggio +
`</td> 
<td class="tdCustomer">` +
fineNoleggio +
`</td> 
<td class="tdCustomer">` +
prezzoTotale +
`</td> 
<td class="tdCustomer">` +
stato +
`</td> 
<td class="tdCustomer">` +
commenti +
`</td> 
<td class="tdCustomer">` +
idNoleggio +
`</td> 
<td class="tdCustomer"><button data-bs-toggle="modal" data-bs-target="#fattura-modal" class="btn btn-secondary" aria-label="bottone di modifica cliente" type="button" id="btnPDF"onclick="vediFatturaNoleggiConclusi(this)">Vedi fattura<i class="bi bi-pencil-square"></i></button>
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

  let current = e.parentNode.parentNode;
  let usernameCliente = current.getElementsByClassName("tdCustomer")[0].textContent;
  let titoloNoleggiato = current.getElementsByClassName("tdCustomer")[1].textContent;
  let piattaforma = current.getElementsByClassName("tdCustomer")[2].textContent;
  //let usernameFunzionario= current.getElementsByClassName("tdCustomer")[3].textContent;
  let inizioNoleggio = current.getElementsByClassName("tdCustomer")[4].textContent;
  let fineNoleggio = current.getElementsByClassName("tdCustomer")[5].textContent;
  let prezzoTotale = current.getElementsByClassName("tdCustomer")[6].textContent;
  //let costoGiorno = current.getElementsByClassName("tdCustomer")[7].textContent;
  //let stato = current.getElementsByClassName("tdCustomer")[8].textContent;
  let commenti = current.getElementsByClassName("tdCustomer")[8].textContent;
  let idNoleggio = current.getElementsByClassName("tdCustomer")[9].textContent;
 
  console.log(idNoleggio)
  let modal = document.getElementById("fattura-modal");
  let body = modal.getElementsByClassName("modal-body")[0];
  let div = document.createElement("div");
  //modal.getElementsByClassName("modal-body").innerHTML =
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
                          <i class="fa fa-book fa-2x text-success-m2 mr-1"></i>
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
                      `+ "nome sito" + `
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
                                  <span class="text-110 text-secondary-d1">`+ "euro" + `</span>
                              </div>
                          </div>

                          <div class="row my-2 align-items-center bgc-primary-l3 p-2">
                              <div class="col-7 text-right">
                                  Eventuali sconti sono stati applicati all' importo totale
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
</div>`
;
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
      console.log(d.result)
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

`<td class="tdCustomer">` +
usernameCliente +
`</td>
<td class="tdCustomer">` +
titoloNoleggiato +
`</td>
<td class="tdCustomer">` +
piattaforma +
`</td>
<td class="tdCustomer">` +
usernameFunzionario +
`</td>  
<td class="tdCustomer">` +
inizioNoleggio +
`</td> 
<td class="tdCustomer">` +
fineNoleggio +
`</td> 
<td class="tdCustomer">` +
prezzoTotale +
`</td> 
<td class="tdCustomer">` +
stato +
`</td> 
<td class="tdCustomer">` +
commenti +
`</td>
<td class="tdCustomer">` +
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
      console.log(d.result)
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

`<td class="tdCustomer">` +
usernameCliente +
`</td>
<td class="tdCustomer">` +
titoloNoleggiato +
`</td>
<td class="tdCustomer">` +
piattaforma +
`</td>
<td class="tdCustomer">` +
usernameFunzionario +
`</td>  
<td class="tdCustomer">` +
inizioNoleggio +
`</td> 
<td class="tdCustomer">` +
fineNoleggio +
`</td> 
<td class="tdCustomer">` +
prezzoTotale +
`</td> 
<td class="tdCustomer">` +
costoGiorno +
`</td> 
<td class="tdCustomer">` +
stato +
`</td> 
<td class="tdCustomer">` +
commenti +
`</td> 
<td class="tdCustomer">` +
idNoleggio +
`</td> 
<td class="tdCustomer"><button data-bs-toggle="modal" data-bs-target="#modificaNoleggioFuturoModal" class="btn btn-secondary" aria-label="bottone di modifica cliente" type="button" onclick="getNoleggioFuturo(this)">Modifica noleggio<i class="bi bi-pencil-square"></i></button>
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
  let usernameCliente = current.getElementsByClassName("tdCustomer")[0].textContent;
  let titoloNoleggiato = current.getElementsByClassName("tdCustomer")[1].textContent;
  let piattaforma = current.getElementsByClassName("tdCustomer")[2].textContent;
  let usernameFunzionario= current.getElementsByClassName("tdCustomer")[3].textContent;
  let inizioNoleggio = current.getElementsByClassName("tdCustomer")[4].textContent;
  let fineNoleggio = current.getElementsByClassName("tdCustomer")[5].textContent;
  let prezzoTotale = current.getElementsByClassName("tdCustomer")[6].textContent;
  let costoGiorno = current.getElementsByClassName("tdCustomer")[7].textContent;
  let stato = current.getElementsByClassName("tdCustomer")[8].textContent;
  let commenti = current.getElementsByClassName("tdCustomer")[9].textContent;
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
  oldNoleggio = current.getElementsByClassName("tdCustomer")[10].textContent;
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
      url: "/db/getNoleggi",
      type:"GET",
      data: {},
      dataType: "json",
      contentType: "application/x-www-form-urlencoded",
      success: function(d) {
        console.log(d.result)
        for(let i in d.result){
       
          if (userCliente == d.result[i].usernameCliente && (d.result[i].stato == "futuro" || d.result[i].stato == "attivo")){
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
         <button data-bs-toggle="modal" data-bs-target="#noleggia-modal" class="btn btn-primary" aria-label="bottone di crea noleggio" onclick="creaNoleggio(this); findClienti(); vediDateDisponibilitaOggetto(this)"><i class="bi bi-pencil-square"> Noleggia</i></button>
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

var dateOccupateI = {};
var dateOccupateF = {};

 function vediDateDisponibilitaOggetto(e){

  let current = e.parentNode.parentNode;
  let game = current.getElementsByClassName("val")[2].textContent;
  let platform = current.getElementsByClassName("val")[3].textContent;
  //console.log(game,platform)

  $.ajax({
    url: "/db/getNoleggi",
    type: "GET",
    data: {},
    dataType: "json",
    contentType: "application/x-www-form-urlencoded",
    success: function (d) {
         
         console.log(d.result);

         for(let i in d.result){

          if(d.result[i].titoloNoleggiato == game && d.result[i].piattaforma == platform){

             dateOccupateI[i] = d.result[i].inizioNoleggio;
             dateOccupateF[i] = d.result[i].fineNoleggio;
             console.log(dateOccupateI[i],dateOccupateF[i])
             //console.log(d.result[i].inizioNoleggio,d.result[i].fineNoleggio)
          }
         }

        

         //document.getElementById("inizioNoleggio1").



    },
  });


 }


 

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
  data[1].value =  game;
  data[2].value =  platform;
  
  let prezzo1 = prezzo.split(" ")[0];
  data[5].value = prezzo1;
  //console.log(prezzo1)s
  //console.log(data[1].value);
  
 }

 //                                     SELECT FORM CHE MOSTRA TUTTI CLIENTI A CUI ASSOCIARE UN NOLEGGIO

 function  listClientiSelectNoleggio(d){
  
  //var x = document.getElementById("usernameCliente");
  //x.remove(x);
  //let modal = document.getElementById("noleggia-modal");
  //modal.getElementsByClassName("form-control")[0].options.length = 0;
  document.getElementById("usernameCliente1").options.length = 0;
  let option = document.createElement("OPTION");
  option.setAttribute("value", "nessun cliente selezionato");
  let option2 = document.createTextNode("Scegli cliente ...");
  option.appendChild(option2);
  document.getElementById("usernameCliente1").appendChild(option);
  //modal.getElementsByClassName("form-control")[0].appendChild(option);

  for (let i in d.result) {

    let idCliente = d.result[i]._id;
    let username = d.result[i].username;
    let punti = d.result[i].punti;
    
    let option = document.createElement("OPTION");
    option.setAttribute("value", username);
    let option2 = document.createTextNode(username);
    option.appendChild(option2);
    document.getElementById("usernameCliente1").appendChild(option);
 }
 /*
    if(document.getElementById("usernameCliente1").value != "nessun cliente selezionato"){

          
    }else{
      document.getElementById("bbz").disabled= true;
    }
 */
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

