
function clientiLOG() {
    // let cookie = getCookie("SessionCookie")
     //let data = {cookie: cookie}
     $.ajax({
       url: "/db/clientiLOG",
       type: "GET",
       data: '',
       dataType: "json",
       contentType: "application/x-www-form-urlencoded",
       success: function (d) {
         tableCustomer(d);
       },
     });
}
   
 
 
 function tableCustomer(d) {
 
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
  <td class="tdCustomer"><button data-bs-toggle="modal" data-bs-target="#modUserModal" class="btn btn-secondary" aria-label="bottone di modifica cliente" type="button" onclick="getUser(this)"><i class="bi bi-pencil-square"></i></button>
  </td>`;
 
 tbody.appendChild(tr);
 console.log(d.result)
 }
  
 }
 

 /*
 function tableCustomer(d) {
 
   
 document.getElementById("anagraficaClientiBody").innerHTML = "";
 let tbody = document.getElementById("anagraficaClientiBody");
 for (let i in d.result) {
 let nome = d.result[i].nome.toLowerCase();
 let cognome = d.result[i].cognome.toLowerCase();
 let username = d.result[i].username.toLowerCase();
 console.log(nome)
 
 
 
 const tr = document.createElement("tr");
 tr.innerHTML =
 '<th scope="row" style="text-transform: capitalize" class="titleRowCustomer">' + nome + ' ' + cognome + '</th>'
 '<td class="tdCustomer">' + username + '</td>'
 tbody.appendChild(tr);
 }
 
 console.log(d.result)
 }
 */
 
 

/*
 function visualizzaClienti() {
     
     var div = document.getElementById("content");
     div.style.visibility = "visible";
     div.innerHTML = `
               
               <div class="row d-flex align-items-center" style="padding: 2rem; height: 80%; position: relative;" id="anagraficaClienti">
                 <table class="table" tabIndex="0" aria-label = "tabella clienti" style="position: absolute; top: 0; width: 95%">
                   <thead>
                     <tr>
                       <th scope="col">Nome e Cognome</th>
                       <th scope="col">Username</th>
                       <th scope="col">Indirizzo di Fatturazione</th>
                       <th scope="col">Punti Fedeltà</th>
                       <th scope="col">ID cliente</th>
                       <th scope="col">Modifica</th>
                     </tr>
                   </thead>
                   <tbody id="anagraficaClientiBody">
                   </tbody>
                 </table>
                 <div class="row align-items-center" id="buttons" >
                 <div id = "rightButton" class ="text-center">
                   <button id="addUserBtn" type="button" aria-label="Bottone aggiunta clienti" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addUserModal"> Aggiungi Utente
                   </button>
                 </div>
               </div>
               </div>`;
   }
 */
 
 
 
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