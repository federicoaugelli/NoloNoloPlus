function clientiLOG() {
    let cookie = getCookie("SessionCookie")
    let data = {cookie: cookie}
    $.ajax({
      url: "/db/clientiLOG",
      type: "POST",
      data: data,
      dataType: "json",
      contentType: "application/x-www-form-urlencoded",
      success: function (d) {
        tableCustomer(d);
      },
    });
  }
  


function visualizzaClienti() {
    
    var div = document.getElementById("content");
    div.style.visibility = "visible";
    div.innerHTML = `
              <div class="row align-items-center" id="buttons" >
                <div id="search"> 
                    <form onkeypress="return event.keyCode != 13" id="searchForm">
                        <div class="mb-3">
                            <select id="searchSelection" class="form-select" aria-label="Filtro ricerca clienti">
                                <option value="username" aria-selected="true" selected>Ricerca per username</option>
                                <option value="nome" aria-selected="false">Ricerca per nome</option>
                                <option value="cognome" aria-selected="false">Ricerca per cognome</option>
                            </select>
                        </div>
                        <div class="mb-3 row">
                            <div class="col-10">
                                <input id="inputSearch" type="text" placeholder="Inserisci testo..." class="form-control" aria-label="Inserisci testo ricerca">
                            </div>
                            <div class="col-2">
                                <button aria-label="Bottone ricerca clienti" type="button" class="btn btn-primary" id="searchBtn" onclick="searchUser()">
                                    <i class="fa fa-search"></i>
                                </button>
                            </div>
                        </div> 
                    </form>
                </div>
                <div id = "rightButton" class ="text-center">
                  <button
                      id="addUserBtn"
                      type="button"
                      aria-label="Bottone aggiunta clienti"
                      class="btn btn-primary"
                      data-bs-toggle="modal"
                      data-bs-target="#addUserModal"
                  >
                      Aggiungi <br />
                      Utente
                  </button>
                  </div>
              </div>
              <div
              class="row d-flex align-items-center"
              style="padding: 2rem; height: 80%; position: relative;"
              id="anagraficaClienti"
              >
                <table class="table" tabIndex="0" aria-label = "tabella clienti" style="position: absolute; top: 0; width: 95%">
                  <thead>
                    <tr>
                      <th scope="col">Nome e Cognome</th>
                      <th scope="col">Username</th>
                      <th scope="col">Mail</th>
                      <th scope="col">Telefono</th>
                      <th scope="col">Indirizzo di Fatturazione</th>
                      <th scope="col">Punti Fedeltà</th>
                      <th scope="col">Modifica</th>
                    </tr>
                  </thead>
                  <tbody id="anagraficaClientiBody">
                  </tbody>
                </table>
              </div>
              </div>`;
  }






function tableCustomer(d) {

    document.getElementById("anagraficaClientiBody").innerHTML = "";
    usernameSet.clear();
    usernameArray = [];
    for (let i in d.result) {
    
        let idCliente = d.result[i]._id;
        let nome = d.result[i].nome.toLowerCase();
        let cognome = d.result[i].cognome.toLowerCase();
        let username = d.result[i].username.toLowerCase();
        let mail = d.result[i].mail;
        let tel = d.result[i].tel;
        let punti = d.result[i].punti;
        let indirizzo = d.result[i].indirizzo
        let provincia = d.result[i].provincia
        let cap = d.result[i].cap
        usernameSet.add(username.toLowerCase());
        let tbody = document.getElementById("anagraficaClientiBody");
        const tr = document.createElement("tr");
        tr.innerHTML =
     `
     <th scope="row" style="text-transform: capitalize" class="titleRowCustomer">` +
     nome +
     ` ` +
    cognome +
     `</th>
     <td class="tdCustomer">` +
    username +
     `</td>
     <td class="tdCustomer">` +
    mail +
     `</td>
     <td class="tdCustomer">` +
    tel +
     `</td> 
     <td class="tdCustomer">` +
    indirizzo + ", " + provincia + ", " + cap +
     `</td> 
     <td class="tdCustomer">` +
    punti +
     `</td> 
     <td class="tdCustomer" style="display:none">` +
    idCliente +
     `</td> 
     <td class="tdCustomer"><button data-bs-toggle="modal" data-bs-target="#modUserModal" class="btn btn-secondary" aria-label="bottone di modifica cliente" type="button" onclick="getUser(this)"><i class="bi bi-pencil-square"></i></button></td>`;
    tbody.appendChild(tr);
    }
}