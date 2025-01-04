document.getElementById("formulario").addEventListener("submit", e =>{
    e.preventDefault()
    let email = document.getElementById("email")
    let mensaje = document.getElementById("mensaje")

    console.log(email.value)
    console.log(mensaje.value)
    email.value = ""
    mensaje.value = ""

    Swal.fire({
        title: "Mensaje enviado exitosamente!",
        icon: "success",
        draggable: true,
        timer: 1000
      });
})