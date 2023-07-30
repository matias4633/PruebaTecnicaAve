const inputCantidad = document.getElementById("cantidad");
const gallery = document.getElementById("gallery");

inputCantidad.addEventListener("input", actualizarGaleria);

function actualizarGaleria() {
  const cantidad = parseInt(inputCantidad.value);
  if (isNaN(cantidad) || cantidad < 1 || cantidad > 15) {
    return;
  }

  gallery.innerHTML = "";

  for (let i = 0; i < cantidad; i++) {
    const img = document.createElement("img");
    img.src = `./imagen.jpg`;
    img.alt = `Imagen ${i + 1}`;
    gallery.appendChild(img);
  }
}
