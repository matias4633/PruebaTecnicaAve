function procesarInformacion(array){
    let cantidadTotal=array.length;
    console.log(`La cantidad de elementos es : ${cantidadTotal}`);
    let pares = array.filter((dato)=> dato%2==0).length;
    porcentajePares = pares*100/cantidadTotal;
    console.log(`El pocentaje de pares es ${porcentajePares} % y el de impares es ${100-porcentajePares} %`);
    let numeroMayoresA1000 = array.filter((dato)=> dato>1000).length;
    console.log(`El porcentaje de numeros mayores a mil es ${numeroMayoresA1000*100/cantidadTotal}%`);
    let maximo = Math.max(...array);
    let minimo = Math.min(...array)
    console.log(`El numero mayor es ${maximo} y el numero menor es ${minimo}`);
    let promedio = array.reduce(function(acumulador, siguienteValor){
        return acumulador + siguienteValor;
      }, 0)/cantidadTotal;
    console.log(`El porcentaje del minimo es ${minimo*100/maximo} % y el porcentaje del promedio es ${promedio*100/maximo} %`);
}