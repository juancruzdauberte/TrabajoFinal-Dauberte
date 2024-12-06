let carrito;

if (JSON.parse(localStorage.getItem("carrito"))) {
    carrito = JSON.parse(localStorage.getItem("carrito"))  //Si hay un carrito que traiga los productos que tiene
} else {
    carrito = []
}


document.getElementById("botonAgregar").addEventListener("click", e => {
    const productoId = parseInt(e.target.dataset.id)
    console.log(productoId)
})