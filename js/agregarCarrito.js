let carrito;

if (JSON.parse(localStorage.getItem("carrito"))) { //Si hay un carrito que traiga los productos que tiene
    carrito = JSON.parse(localStorage.getItem("carrito"))   
} else {
    carrito = []
}

function agregarAlCarrito (boton) {
    const productoId = parseInt(boton.target.dataset.id);   // Obtengo el ID desde el dataset para hacer la busqueda
    const productoEncontrado = producto.find((el) => el.id === productoId);
    if (productoEncontrado) {
        carrito.push(productoEncontrado); 
        localStorage.setItem("carrito", JSON.stringify(carrito));
    } else {
        console.log("NO se ecnontro el producto")
    }

}
