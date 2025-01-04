
const navLink = document.querySelectorAll(".nav-link")
console.log(navLink)
navLink.forEach(a => {
    a.addEventListener("click", e => {
        navLink.forEach(a => a.classList.remove("active"))
        e.currentTarget.classList.add("active")
    })
})

