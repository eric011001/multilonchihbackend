$(".menu-toggle-btn").click(function(){
    $(this).toggleClass("fa-times");
    $(".navigation-menu").toggleClass("active");
  });

async function funcName(url){
    const response = await fetch(url);
    var data = await response.json();
    console.log(data);
}


if (window.location.pathname.includes('4dm1n/users.html')) {

}else if(window.location.pathname.includes('4dm1n/newuser.html')){
  const nombreInput = document.getElementById('nombreInput');
  const apellidoInput = document.getElementById('apellidoInput');
  const userInput = document.getElementById('userInput');
  
  function getUserNombre(value){
    console.log(value);
    return value.substring(0,3);
  }
  
  nombreInput.onchange = function(e){
    if (apellidoInput.value != ''){
      userInput.value = `${getUserNombre(e.target.value)}`;

    }
  };
}

var getJSON = function(url, callback) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.responseType = 'json';
  xhr.onload = function() {
    var status = xhr.status;
    if (status === 200) {
      callback(null, xhr.response);
    } else {
      callback(status, xhr.response);
    }
  };
  xhr.send();
};


async function getExtas(){

    let url = 'http://localhost:3000/datos/ext';
    getJSON(url,
    function(err, data) {
      if (err !== null) {
        alert('Something went wrong: ' + err);
      } else {
        alert('Your query count: ' + data.query.count);
      }
    });
    data = { 
      method: 'GET',
      headers: new Headers({ 
        'Content-type': 'application/json',
        'connection':'keep-alive',
        'Accept-Encoding': 'gzip, deflate, br',
        'Accept': '*/*',
        'Access-Control-Allow-Origin': '*'
      }),
      mode: 'no-cors'
    }
    let result = await fetch(url,data);
    console.log(result);
   let cosas = await fetch(url,data)
  .then(async response => {
    //handle response   
    console.log('response');
    console.log(response);  
    return await response.text()
  })
  .then(data => {
    //handle data
    console.log(data);
    console.log(data ? JSON.parse(data) : {});
  })
  .catch(error => {
    console.log(error);
    //handle error
  });

  console.log(cosas);
}
if (window.location.pathname == '/frontend/productos.html') {
    console.log(getExtas());
}
  

