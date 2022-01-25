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


function getIdFromUserLogged(d){

    //console.log(session);
  
}

function deleteUserLogged(){
  $.ajax({
    url: "/db/deleteUserLogged",
    type: "POST",
    data: {idUserLogged},
    dataType: "json",
    contentType: "application/x-www-form-urlencoded",
    success: {
    },
  });

}

