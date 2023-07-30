document.addEventListener("DOMContentLoaded", asignarEventos);

function asignarEventos(){
    document.getElementById('botonEjecutar').addEventListener('click',consultarPorId_O_Nombre);
}



function consultarPorId_O_Nombre(){
    let dato = document.getElementById('dato').value;
    let resultado = document.getElementById('resultado');
    let contenedor = document.getElementById('tarjeta');
    resultado.innerText="";
    if(dato.trim() != ''){
        
        fetchPokemonData(URL_POKEMON + dato , (data)=>{
            contenedor.style.display='flex';
            let tipos ='' 
            data.types.forEach((obj)=>{
                tipos += obj.type.name + ' ';
            });
            document.getElementById('nombre').innerText=data.name;
            document.getElementById('numero').innerText=data.id;
            document.getElementById('tipo').innerText=tipos;
            document.getElementById('peso').innerText=data.weight;
            document.getElementById('altura').innerText=data.height;
            try {
                document.getElementById('imagen').src=data.sprites.other.dream_world.front_default;                ;
            } catch (error) {
                document.getElementById('imagen').src=data.sprites.front_default;
            }
       
    });
    }else{
        contenedor.style.display='none';
        resultado.innerText="Por favor escriba el nombre o el id.";
    }
}