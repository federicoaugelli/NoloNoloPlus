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
     let condizioni = d.result[i].condizioni;
     let etaMinima = d.result[i].etaMinima;
     let peso = d.result[i].peso;
     let numGiocatori = d.result[i].numGiocatori;
     let prezzo = d.result[i].prezzo;
     let quantita = d.result[i].quantita;
     let img = d.result[i].img;
     let disponibile = d.result[i].disponibile;
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
 disponibile +
  `</td>`;
 
 tbody.appendChild(tr);
 //console.log(d.result)
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
      <th th class="th-sm" scope="col">Condizioni</th>
      <th th class="th-sm" scope="col">PEGI</th>
      <th th class="th-sm" scope="col">Peso (GB)</th>
      <th th class="th-sm" scope="col">N° giocatori</th>
      <th th class="th-sm" scope="col">Prezzo ($/Giorno)</th>
      <th th class="th-sm" scope="col">Disponibile</th>
      </tr>
    </thead>
    <tbody id="inventarioBody">  
    </tbody>
  </table>      
    `;
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
       <div id="pegi" class="card-pegi">PEGI ` + etaMinima + `</div>
       <img id="image" src="/img/prova1.png" class="card-img-top" alt="...">
       <div class="card-body">
         <h5 class="card-title">` + game + `</h5>
         <h3 class="card-platform">` + platform + `</h3>
         <a data-bs-toggle="modal" data-bs-target="#card-modal" class="rentbtn">
           <span></span>
           <span></span>
           <span></span>
           <span></span>
           Noleggia
         </a>
         <h6 style="color: white; margin-top: 10px;">` + prezzo + ` € al giorno</h6>
       </div>
       <div class="card-footer">
         <small class="text-muted" style="position: absolute; right: 0; margin-right: 10px;">` + annoUscita + `</small>
         <small class="text-muted">in ` + condizioni + ` condizioni</small>
       </div>
     </div>
   </div>
  
     

     `;
   
 cardBody.appendChild(div);
 //console.log(d.result[i])
 }    
 }

