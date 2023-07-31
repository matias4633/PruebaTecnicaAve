const URL_TIPO = 'https://pokeapi.co/api/v2/type/';
const URL_POKEMON = 'https://pokeapi.co/api/v2/pokemon/'

async function fetchPokemonData(apiUrl , callback) {
    let mensajero = document.getElementById('MensajeGeneral');
    mensajero.innerText='';
    return fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Ocurrio un error.');
            }
            return response.json();
        })
        .then(data => {
            
            
            callback(data);
        })
        .catch(error => {
            mensajero.innerText="Los parametros son invalidos.";
            console.error('Ocurrio un error :', error);
        });
}