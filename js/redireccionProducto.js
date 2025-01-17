const botonesCategorias = document.querySelectorAll(".boton-categoria")
const tituloProductos = document.querySelector("#titulo__productos")

botonesCategorias.forEach(boton => {
    boton.addEventListener("click", e =>{
        const idCategoria = e.currentTarget.id 
        window.location.href = `../pages/productos.html?categoria=${idCategoria}`    
    })
})