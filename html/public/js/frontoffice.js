new Vue({
      el: "#app",
      data () {
        return {
          searchQuery: '',
          items: ''
        }
      },

      mounted () {
        axios
          .get('/db/getGames')
          .then(response => (this.items = response.data.result))
      },

      computed: {
        resultQuery(){
          if(this.searchQuery){
            return this.items.filter((gg)=>{
              return this.searchQuery.toLowerCase().split(' ').every(v => gg.title.toLowerCase().includes(v))
            })
          }else{
            return this.items;
          }
        }
      }
})


//var usernameLogged = NULL;

function getIDuserLogged(){

  let login = document.getElementById("myModal");
  let username = login.getElementsByClassName("input");

  usernameLogged = username[0].textContent;
  console.log(userLogged)
  
  /*
  $.ajax({

    url: "/db/getUserLogged",
    type: "GET",
    data: {usernameLogged},
    dataType: "json",
    contentType: "application/x-www-form-urlencoded",
    success: console.log(usernameLogged)
    
});
*/
}