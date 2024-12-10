function buscarProductos(textoIngresado) {
    return productos.filter(producto =>
      producto.nombre.toLowerCase().includes(textoIngresado.toLowerCase())
    );
  }
  
function mostrarResultados(resultados) {
    const listaResultados = document.getElementById("resultadoProductos");  
      listaResultados.innerHTML = "";

    if (resultados.length === 0) {
      listaResultados.innerHTML = "<li>No se encontraron productos</li>";
      return;
    }
  
    resultados.forEach(producto => {
      const item = document.createElement("div");
      item.className = "resultado-item"
      
      const imgProducto = document.createElement("img")
      imgProducto.src = producto.img
      imgProducto.alt = producto.nombre
    imgProducto.className = "miniatura"

      const nombreYPrecio = document.createElement("p")
      nombreYPrecio = `${producto.nombre} - $${producto.precio}`
      nombreYPrecio.className = "resultado-item-p" 

      imgProducto.appendChild(item)
      nombreYPrecio.appendChild(item)
      item.appendChild(listaResultados)
    });
}

document.getElementById("inputBuscador").addEventListener("input", e => {
    const texto = e.target.value
    const resultado = buscarProductos(texto)
    mostrarResultados(resultado)

})