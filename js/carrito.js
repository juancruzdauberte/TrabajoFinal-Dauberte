let carrito;

if (JSON.parse(localStorage.getItem("carrito"))) { //Si hay un carrito que traiga los productos que tiene
    carrito = JSON.parse(localStorage.getItem("carrito"))   
} else {
    carrito = []
}

function agregarAlCarrito (producto) {
    const productoId = parseInt(producto.target.dataset.id);   // Obtengo el ID del producto desde el dataset para hacer la busqueda
    const productoEncontrado = productos.find((el) => el.id === productoId);
    if (productoEncontrado) {
        carrito.push(productoEncontrado); 
        localStorage.setItem("carrito", JSON.stringify(carrito));
    } else {
        console.log("NO se ecnontro el producto")
    }

}



function mostrarCarrito (){
    const productosEnCarrito = document.getElementById("modeloCarrito")
    productosEnCarrito.innerHTML = ""; // Limpia el contenido previo

    if (carrito.length === 0) {
        productosEnCarrito.innerHTML = "<p>El carrito está vacío</p>";
        return;
    }

    carrito.forEach(producto => {
        const cardCarrito = document.createElement("div")
        cardCarrito.id = "contenidoCarrito"

        const imgCarrito = document.createElement("img")
        imgCarrito.src = producto.img
        imgCarrito.alt = producto.nombre
        imgCarrito.className = "imgCarrito"

        const nombreCarrito = document.createElement("p")
        nombreCarrito.innerText = producto.nombre
        nombreCarrito.className = "nombreCarrito"

        const precioCarrito = document.createElement("span")
        precioCarrito.innerText = `$${producto.precio}`
        precioCarrito.className = "precioCarrito"

        cardCarrito.appendChild(imgCarrito)
        cardCarrito.appendChild(nombreCarrito)
        cardCarrito.appendChild(precioCarrito)
        productosEnCarrito.appendChild(cardCarrito)
    })
            
}

// function vaciarCarrito (){
//     carrito = [];
//     localStorage.setItem("carrito", JSON.stringify(carrito));
//     console.log(carrito)
// }

// function eliminarProductoDelCarrito (productoId){
//     carrito = carrito.filter(producto => {producto.id !== productoId})
//     localStorage.setItem("carrito", JSON.stringify(carrito));
//     verCarrito()
// }


document.querySelectorAll(".botonAgregarCarrito").forEach(boton => {
    boton.addEventListener("click", e => {
      agregarAlCarrito(e);
    });
  });
  

// document.getElementById("vaciarCarrito").addEventListener("click", e => {
//     vaciarCarrito(e)
// })