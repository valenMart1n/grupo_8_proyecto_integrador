
let entrar;
window.addEventListener('load', function() {
    let form = document.querySelector("form");
    let email = document.querySelector("#email");
    let password = document.querySelector("#password");
    let password2 = document.querySelector("#password2");
    let nombre = document.querySelector("#nombre");
    let apellido = document.querySelector("#apellido");
    
    let email_error = document.getElementById("error_email");
    let password_error = document.getElementById("error_password");
    let password2_error = document.getElementById("error_password2");
    let nombre_error = document.getElementById("error_nombre");
    let apellido_error = document.getElementById("error_apellido");

    form.addEventListener("submit", function(event){
        event.preventDefault();

        let regexEmail = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i
        entrar = false;
   
        if(email.value == ""){
          email_error.classList.remove("invisible");
          email_error.classList.add("error_style");
            email.classList.remove("fondo_correcto");
            email.classList.add("fondo_error");
            entrar = true;
            
        }else if(!regexEmail.test(email.value)) {
            email_error.classList.remove("invisible"); 
            email_error.classList.add("error_style");
            email.classList.remove("fondo_correcto");
            email.classList.add("fondo_error");
            entrar = true;
        }else{
        email_error.classList.remove("error_style");
        email_error.classList.add("invisible"); 
        email.classList.remove("fondo_error");
        email.classList.add("fondo_correcto");
        }
        if(password.value.length < 8){
            password_error.classList.remove("invisible");
            password_error.classList.add("error_style"); 
            password.classList.remove("fondo_correcto");
            password.classList.add("fondo_error");
            entrar = true;
             
        }else{
            email_error.classList.remove("error_style");
            password_error.classList.add("invisible"); 
            password.classList.remove("fondo_error");
            password.classList.add("fondo_correcto");
        
        }   
        if(password2.value != password.value || password2.value == ""){
            password2_error.classList.remove("invisible"); 
            password2_error.classList.add("error_style");
            password2.classList.remove("fondo_correcto");
            password2.classList.add("fondo_error");
        }else{
            password2_error.classList.remove("error_style");
            password2_error.classList.add("invisible");
            password2.classList.remove("fondo_error");
            password2.classList.add("fondo_correcto");
        }
        if(nombre.value == ""){
            nombre_error.classList.remove("invisible"); 
            nombre_error.classList.add("error_style");
            nombre.classList.remove("fondo_correcto");
            nombre.classList.add("fondo_error");
            entrar = true;
        }else{
            nombre_error.classList.remove("error_style");
            nombre_error.classList.add("invisible"); 
            nombre.classList.remove("fondo_error");
            nombre.classList.add("fondo_correcto");
            
        }   
        if(apellido.value == ""){
            apellido_error.classList.remove("invisible"); 
            apellido_error.classList.add("error_style");
            apellido.classList.remove("fondo_correcto");
            apellido.classList.add("fondo_error");
            entrar = true;
        }else{
            apellido_error.classList.remove("error_style");
            apellido_error.classList.add("invisible"); 
            apellido.classList.remove("fondo_error");
            apellido.classList.add("fondo_correcto");
            
        }
       if(!entrar){
        
         form.submit();
       }
       
    });
});
