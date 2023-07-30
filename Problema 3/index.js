let posiciones=[0,0,0,0,0,0,0];
//Longitud , Minusculas , Mayusculas , Letras iguales , Numeros , Caracteres especiales , Caracteres prohibidos.
function validarPassword(password) {
    // Requerimientos
    const MIN_LONGITUD = 16;
    const MIN_NUMEROS = 4;
    const MIN_ESPECIALES = 2;
    const CARACTERES_ESPECIALES = '!@#$%^&*-_+=?';
    const CARACTERES_PROHIBIDOS = '0 ';
    let noCumple = false;

    posiciones=[1,1,1,1,1,1,1];
  
    // Verificar longitud mínima
    if (password.length < MIN_LONGITUD) {
        posiciones[0]=0;
      noCumple=true;
    }
    
    // Verificar letras minúsculas y mayúsculas
    let tieneMinusculas = false;
    let tieneMayusculas = false;
    for (let i = 0; i < password.length; i++) {
      const char = password[i];
      if (char >= 'a' && char <= 'z') {
        tieneMinusculas = true;
      } else if (char >= 'A' && char <= 'Z') {
        tieneMayusculas = true;
      }
    }
    if (!tieneMinusculas || !tieneMayusculas) {
        noCumple=true;
    }

    if(!tieneMinusculas){
        posiciones[1]=0;
    }
    if(!tieneMayusculas){
        posiciones[2]=0;
    }
    
  
    // Verificar letras iguales consecutivas
    for (let i = 1; i < password.length; i++) {
      if (password[i] === password[i - 1]) {
        noCumple=true;
        posiciones[3]=0;
      }
    }

    
  
    // Verificar números
    let numCount = 0;
    for (let i = 0; i < password.length; i++) {
      if (password[i] >= '0' && password[i] <= '9') {
        numCount++;
        if (numCount >= MIN_NUMEROS && password[i + 1] == password[i]) {
          noCumple=true;
          posiciones[4]=0;
        }
      }
    }
    if(numCount < MIN_NUMEROS){
        noCumple=true;
        posiciones[4]=0;
    }
    
    // Verificar caracteres especiales
    let especialesCount = 0;
    for (let i = 0; i < password.length; i++) {
      if (CARACTERES_ESPECIALES.includes(password[i])) {
        especialesCount++;
        if (especialesCount >= MIN_ESPECIALES && CARACTERES_ESPECIALES.includes(password[i + 1])) {
          noCumple=true;
          posiciones[5]=0;
        }
      }
    }
    if(especialesCount < MIN_ESPECIALES){
        noCumple=true;
        posiciones[5]=0;
    }
    
    // Verificar caracteres prohibidos
    if (password.split('').some(char => CARACTERES_PROHIBIDOS.includes(char))) {
      noCumple=true;
      posiciones[6]=0;
    }
  
    return !noCumple;
  }
  