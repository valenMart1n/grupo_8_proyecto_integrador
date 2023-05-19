window.addEventListener('load', function() {
const button = document.getElementById("icon");
const nav = document.querySelector(".nav");

button.addEventListener("click", ()=>{
    nav.classList.toggle("activo");
    });
});