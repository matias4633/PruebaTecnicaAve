document.addEventListener("DOMContentLoaded", asignarEventos);

function asignarEventos(){
    document.getElementById('botonCalcular').addEventListener('click', ()=>{
    let parametroA = document.getElementById('parametroA').value;
    let parametroB = document.getElementById('parametroB').value;
    let resultado = document.getElementById('resultado');
    let resultadoNumerico;
    resultado.innerText = "";
    if(parametroA.trim() =='' || parametroB.trim() ==''){
        resultado.innerText='Ambos parametros son necesarios.';
        return;
    }
    if(parametroA == 0 || parametroB == 0){
        resultado.innerText='El resultado es 0.';
        return;
    }

    resultadoNumerico = parametroA / (1/parametroB);
    resultado.innerText='El resultado es ' + resultadoNumerico;
})
}
