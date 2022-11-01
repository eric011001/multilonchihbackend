const e = require('express');
const jsonData= require('../../assets/catalogo.json'); 
const regexAncho = /\ban\b/gmi;
const regexLargo = /\bla\b/gmi;
const regexAlto = /\bal\b/gmi;

async function obtenerModeloJSON(modelo){
    let tempObj = {};
    jsonData.productos.forEach(item => {
        if (item.fullTitle == modelo) {
            tempObj = item;
        }
    });
    return tempObj;

}

async function calcularPrecio(ruta) {
    const modelo = await obtenerModeloJSON(ruta.modelo);

    let result = analizadorLexico(modelo,ruta);
    let total = Number.parseFloat(new Function(result.total)());
    
    total = total.toFixed(2);

    const formatter = new Intl.NumberFormat('es-MX', {
        style: 'currency',
        currency: 'MXN'
    });

    const t = formatter.format(total);
    result.total = t;
    return(result)
}

function analizadorLexico(modelo,ruta) {
    let stringFinal = modelo.formulasPrice[modelo.formulasPrice.length-1].formula;
    let cantidades = [];
    
    console.log(stringFinal);
    modelo.formulasPrice.map( item => {
        const dynReg = new RegExp(` ${item.short} `,'gmi');
        var result =  modelo.formulasPrice.find(element => element.short === item.short).formula;
        stringFinal = stringFinal.replaceAll(dynReg,result);
    });
    jsonData.materiales.map(item => {
        const dynReg = new RegExp(` ${item.short} `,'gmi');
        var result =  jsonData.materiales.find(element => element.short === item.short).price;
        stringFinal = stringFinal.replaceAll(dynReg,result);
    })
    modelo.formulasCant.map(item => {
        const dynReg = new RegExp(`${item.short}`,'gmi');
        var result =  modelo.formulasCant.find(element => element.short === item.short).formula;
        cantidades.push({"name": item.name, "cant": result});
        cantidades.map(subItem => {
            subItem.cant = subItem.cant.replaceAll(dynReg,result);
        })
        stringFinal = stringFinal.replaceAll(dynReg,result);
    })
    cantidades.map(item => {
        let dynReg = new RegExp(` al `,'gmi');
        item.cant = item.cant.replaceAll(dynReg,ruta.alto)
        dynReg = new RegExp(` an `,'gmi');
        item.cant = item.cant.replaceAll(dynReg,ruta.ancho);
        dynReg = new RegExp(` la `,'gmi');
        item.cant = item.cant.replaceAll(dynReg,ruta.largo);
        item.cant = `const total = ${item.cant}; return total.toFixed(2);`;
        let total = Number.parseFloat(new Function(item.cant)());
    
        item.cant = total.toFixed(2);
    });

    let dynReg = new RegExp(` al `,'gmi');
    stringFinal = stringFinal.replaceAll(dynReg,ruta.alto);
    dynReg = new RegExp(` an `,'gmi');
    stringFinal = stringFinal.replaceAll(dynReg,ruta.ancho);
    dynReg = new RegExp(` la `,'gmi');
    stringFinal = stringFinal.replaceAll(dynReg,ruta.largo);
    stringFinal = `const total = ${stringFinal}; return total.toFixed(2);`;
    return {"total": stringFinal, cantidades};
}


module.exports = {calcularPrecio} 