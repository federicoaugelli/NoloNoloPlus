
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

function getGames() {
  $.ajax({
    url: "/db/getGames",
    type: "GET",
    data: '',
    dataType: "json",
    contentType: "application/x-www-form-urlencoded",
    success: function (g) {
         //tableCustomer(g);
         console.log(g.result);
    },
  });
}
   
 
 
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
     let indirizzo = d.result[i].indirizzo
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
 indirizzo + 
  `</td> 
  <td class="tdCustomer">` +
 punti +
  `</td> 
  <td class="tdCustomer">` +
 idCliente +
  `</td> 
  <td class="tdCustomer"><button data-bs-toggle="modal" data-bs-target="#modificaClienteModal" class="btn btn-secondary" aria-label="bottone di modifica cliente" type="button" onclick="getUser(d.result[i])"><i class="bi bi-pencil-square"></i></button>
  </td>`;
 
      tbody.appendChild(tr);
      console.log(d.result)
 }
}
 


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



  function getUser(result){

    var div = document.getElementById("content-2");
    div.style.visibility = "visible";
    div.innerHTML = `
              
    <div class="mb-3">
      <label for="formFile" class="form-label">Default file input example </label>
        <input class="form-control" type="file" id="formFile">
    </div>
    `;


    document.getElementsByClassName("bar")[i].value = result.nome;
      
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
       let disponibilita = d.result[i].disponibilita;
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
