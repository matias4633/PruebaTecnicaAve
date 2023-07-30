document.addEventListener("DOMContentLoaded", asignarEventos);

function asignarEventos(){
    document.getElementById('pass').addEventListener('keyup', (event)=>{
        validarPassword(document.getElementById('pass').value);
        cambiarVista();
    })
}
function cambiarVista(){
    let hijos = document.getElementById('contendorAnimado').children;
    posiciones.forEach((dato,index)=>{
        if(dato===1){
            hijos[index+1].classList='exito';
            hijos[index+1].firstElementChild.innerText='✔';
        }else{
            hijos[index+1].classList='fallo';
            hijos[index+1].firstElementChild.innerText='✖';
        }
    });
}

