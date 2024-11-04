function redirigirPagina() {
    window.location.href = "/pages/productos.html";

}

const buttonAllProductos = document.getElementById("buttonProductos").addEventListener("click", redirigirPagina)


function redirigirPaginaColgantes() {
    window.location.href = "/pages/productos.html#productos__colgantes";

}

const buttonColgantes = document.getElementById("buttonColgantes").addEventListener("click", redirigirPaginaColgantes)


function redirigirPaginaTapices() {
    window.location.href = "/pages/productos.html#productos__tapices";

}

const buttonTapices = document.getElementById("buttonTapices").addEventListener("click", redirigirPaginaTapices)