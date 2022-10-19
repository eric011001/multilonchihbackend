$(".menu-toggle-btn").click(function(){
    $(this).toggleClass("fa-times");
    $(".navigation-menu").toggleClass("active");
  });

async function funcName(url){
    const response = await fetch(url);
    var data = await response.json();
    console.log(data);
}


async function getExtas(){
    let url = 'http://10.20.14.72:3000/datos/ext';
    
    fetch(url)
  .then(response => {
    //handle response            
    console.log(response);
  })
  .then(data => {
    //handle data
    console.log(data);
  })
  .catch(error => {
    //handle error
  });
}

if (window.location.pathname == '/productos.html') {
    //console.log(getExtas());
}
  