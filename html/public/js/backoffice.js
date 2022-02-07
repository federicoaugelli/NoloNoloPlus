                                                                            /* ========================== */
                                                                            /*                            */
                                                                            /*      TABELLA INVENTARIO    */
                                                                            /*                            */
                                                                            /* ========================== */     


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



function getDipendenti() {
  $.ajax({
    url: "/db/getDipendenti",
    type: "GET",
    data: '',
    dataType: "json",
    contentType: "application/x-www-form-urlencoded",
    success: function (g) {
        
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
     let prezzo = d.result[i].prezzo;
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
  `</td>`;
 
 tbody.appendChild(tr);
 //console.log(d.result)
 } 
}
 

 
function visualizzaInventario() {
     
    var div = document.getElementById("inventarioContent");
    div.style.visibility = "visible";
    div.innerHTML = `
              
    <table border="1px" class="table table-striped table-bordered table-sm" cellspacing="2" width="100%" summary="titolo, id, piattaforma, anno di uscita, condizioni, età minima, peso, numero giocatori, prezzo e disponibilità">
    <thead>
      <tr>
      <th th abbr="titolo" class="th-sm" scope="col">Titolo</th>
      <th th abbr="id" class="th-sm" scope="col">ID</th>
      <th th abbr="piattaforma" class="th-sm" scope="col">Piattaforma</th>
      <th th abbr="anno di uscita" class="th-sm" scope="col">Anno di uscita</th>
      <th th abbr="condizioni="th-sm" scope="col">Condizioni</th>
      <th th abbr="pegi" class="th-sm" scope="col">PEGI</th>
      <th th abbr="peso" class="th-sm" scope="col">Peso (GB)</th>
      <th th abbr="num giocatori" class="th-sm" scope="col">N° giocatori</th>
      <th th abbr="euro al giorno" class="th-sm" scope="col">Prezzo ($/Giorno)</th>
      </tr>
    </thead>
    <tbody id="inventarioBody">  
    </tbody>
  </table>      
    `;
  }

                                                                            /* ========================== */
                                                                            /*                            */
                                                                            /*   CARD E IPOTESI NOLEGGIO  */
                                                                            /*                            */
                                                                            /* ========================== */ 

  
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
      listClientiSelectNoleggio(d);
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
       <img id="image" src=`+ img +` class="val" alt="immagine di " `+ game + `" per " ` + platform + `>
       <div class="card-body">
         <h3 style="color: white;" class="val">` + game + `</h3>
         <h5 style="color: white;" class="val">` + platform + `</h5>
         <button data-bs-toggle="modal" data-bs-target="#noleggia-modal" class="btn btn-primary" aria-label="bottone di crea noleggio" type="button" onclick="creaNoleggio(this); findClienti(); vediDateDisponibilitaOggetto(this); setMaxCalendar(this)"><i class="bi bi-pencil-square"> Noleggia</i></button>
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
  //user = modal.getElementsByClassName("useruser")[0].textContent;
  //user = user.split(" ")[2];
  //console.log(user)
  

  let data = modal.getElementsByClassName("newval");
  data[0].value = "";
  //modal.getElementsByClassName("useruser")[0].textContent = " NUOVO NOLEGGIO";
  data[1].value =  game + ", " + platform;
  
  let prezzo1 = prezzo.split(" ")[0];
  data[4].value = prezzo1;
  //console.log(prezzo1)s
  //console.log(data[1].value);
  
 }

 //                                     SELECT FORM CHE MOSTRA TUTTI CLIENTI A CUI ASSOCIARE UN NOLEGGIO

 function  listClientiSelectNoleggio(d){
  
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



let dateOccupateI = [];
let dateOccupateF = [];
let dateOccupateTot = [];


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
      let da = modal.getElementsByClassName("newval")[2];
      let a = modal.getElementsByClassName("newval")[3];

      a.setAttribute("max", maxval);
      da.setAttribute("max", maxval);

}

});
}

