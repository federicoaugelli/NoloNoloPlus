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
     let condizioni = d.result[i].condizioni;
     let etaMinima = d.result[i].etaMinima;
     let peso = d.result[i].peso;
     let numGiocatori = d.result[i].numGiocatori;
     let disponibilita = d.result[i].disponibilita;
     let prezzo = d.result[i].prezzo;
     //usernameSet.add(username.toLowerCase());
     //let tbody = document.getElementById("anagraficaClientiBody");
     const tr = document.createElement("tr");
     tr.innerHTML =
  
  `<td class="tdCustomer">` +
 idGame +
  `</td>
  <td class="tdCustomer">` +
 game +
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
 disponibilita +
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
      <th th class="th-sm" scope="col">ID</th>
      <th th class="th-sm" scope="col">Titolo</th>
      <th th class="th-sm" scope="col">Piattaforma</th>
      <th th class="th-sm" scope="col">Anno di uscita</th>
      <th th class="th-sm" scope="col">Condizioni</th>
      <th th class="th-sm" scope="col">Etàminima</th>
      <th th class="th-sm" scope="col">Peso</th>
      <th th class="th-sm" scope="col">N° giocatori</th>
      <th th class="th-sm" scope="col">Prezzo</th>
      <th th class="th-sm" scope="col">Disponibilità</th>
      </tr>
    </thead>
    <tbody id="inventarioBody">  
    </tbody>
  </table>      
    `;
  }

