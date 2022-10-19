const jsonData= require('../assets/catalogo.json'); 


function obtenerModelos(){
    var cosa = jsonData.productos;
    cosa.map(item => {
        delete item.formulasCant;
        delete item.formulasPrice;
    })
    return cosa;
}


function obtenerExtras() {
    var cosa = jsonData.extras;
    return cosa
}
module.exports = {obtenerModelos, obtenerExtras}