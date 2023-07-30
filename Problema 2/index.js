document.addEventListener("DOMContentLoaded", consultarInicialesYEventos);

function consultarInicialesYEventos(){
    fetchPokemonData(URL_TIPO , (data)=>{
        let texto = '';
        let resultados=data.results;

        resultados.forEach(obj => {
            texto += obj.name +' ';
        });

        document.getElementById('opciones').innerText=texto;

    });

    document.getElementById('botonEjecutar').addEventListener('click',consultarCantidadPorTipo);
    document.getElementById('botonEjecutarItem2').addEventListener('click',consultarPokemonsPor2Tipos);
    document.getElementById('botonEjecutarItem3').addEventListener('click',consultarIdPorNombre);
    document.getElementById('botonEjecutarItem4').addEventListener('click',consultar6StatsBasePorID);

}

//item 1
function consultarCantidadPorTipo(){
    let tipo = document.getElementById('tipo').value;
    let resultado = document.getElementById('resultado');
    resultado.innerText="";
    if(tipo != ''){
        fetchPokemonData(URL_TIPO+tipo , (data)=>{
        let cantidad = data.pokemon.length;
        let texto = 'La cantidad correspondiente a este tipo es : ' + cantidad;
        resultado.innerText=texto;
    });
    }else{
        resultado.innerText="Por favor escriba el tipo.";
    }
}
//Item 2
async function consultarPokemonsPor2Tipos(){
    let tipo1 = document.getElementById('tipo1').value;
    let tipo2 = document.getElementById('tipo2').value;
    let resultado = document.getElementById('resultado2');
    resultado.innerText="";
    if(tipo1.trim() != '' && tipo2.trim() != '' ){
        let array1=[];
        let array2=[];
        let promesa1=fetchPokemonData(URL_TIPO+tipo1 , (data)=>{
            array1 = data.pokemon;
        });
        let promesa2=fetchPokemonData(URL_TIPO+tipo2 , (data)=>{
            array2 = data.pokemon;
        });
        Promise.all([promesa1,promesa2]).then(()=>{
            if(array1 !=[] && array2!=[]){
                let arraycompleto = array1.concat(array2);
                let nombresContador={};
                let texto='';
                arraycompleto.forEach(obj => {
                    if (obj.pokemon.hasOwnProperty('name')) {
                      const nombre = obj.pokemon.name;
                      nombresContador[nombre] = (nombresContador[nombre] || 0) + 1;
                      if (nombresContador[nombre] === 2) {
                        texto += obj.pokemon.name + ' ';
                      }
                    }
                  });
                
                if(texto != ''){
                    resultado.innerText="Los siguientes pokemons cumplen con los dos tipos: " + texto;
                }else{
                    texto='No se encontraron pokemons que cumplan ambas condiciones.'
                }
            }else{
                resultado.innerText="Alguno de los tipos es invalido.";
            }
        });
        

    }else{
        resultado.innerText="Por favor escriba los tipos.";
    }
}
//Item 3
function consultarIdPorNombre(){
    let nombre = document.getElementById('nombre').value;
    let resultado = document.getElementById('resultado3');
    resultado.innerText="";
    if(nombre != ''){
        fetchPokemonData(URL_POKEMON + nombre , (data)=>{
        resultado.innerText=`El id de ${nombre}  es : ${data.id}`;
    });
    }else{
        resultado.innerText="Por favor escriba el nombre.";
    }
}
//Item 4
function consultar6StatsBasePorID(){
    let id = document.getElementById('id').value;
    let resultado = document.getElementById('resultado4');
    resultado.innerText="";
    if(nombre != ''){
        fetchPokemonData(URL_POKEMON + id , (data)=>{
        let objeto = {};
        let arrayStats = data.stats;
        for (let index = 0; index < 6; index++) {
            const element = arrayStats[index];
            objeto[element.stat.name]= ({ base_stat: element.base_stat});            
        }
        console.log(objeto);
        resultado.innerText=`Puede observar el resultado en la consola.`;
    });
    }else{
        resultado.innerText="Por favor escriba el nombre.";
    }
}
//Item 5
function consultarPokemonsPorID_Y_Ordenar(array, orden){
    let pokemons=[];
    let promesas=[];
    array.forEach((id)=>{
        promesas.push(fetchPokemonData(URL_POKEMON + id , (data)=>{
            let tipos ='' 
            data.types.forEach((obj)=>{
                tipos += obj.type.name + ' ';
            });

            pokemons.push({nombre:data.name , tipo : tipos , peso : data.weight});
        }));
    });
    Promise.all(promesas).then(()=>{
        pokemons.sort((a, b) => a[orden] > b[orden] ? 1 : -1);
        console.log(pokemons);
    })
}
//Item 6
async function perteneceElTipoAlPokemon(id,tipo){
    let objeto
    let promesa=fetchPokemonData(URL_POKEMON + id , (data)=>{
        objeto=data;
    });

    await promesa;
    return objeto.types.some((obj)=> obj.type.name===tipo);
}


