let entrar;
window.addEventListener('load', function() {
    let form = document.querySelector("form");
    let email = document.querySelector("#email");
    let password = document.querySelector("#password");

    let alert = document.getElementById("alert");
    let msg = document.getElementById("msg");

    form.addEventListener("submit", function(event){
        event.preventDefault();

        let regexEmail = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i
        entrar = false;
   
        if(email.value == ""){
          entrar = true;
            
        }else if(!regexEmail.test(email.value)) {
            entrar = true;
        }
        
        if(password.value.length < 8){
            entrar = true;
             
        }
        if(entrar){
            alert.classList.add("error")
            msg.classList.remove("invisible"); 
        }
        if(!entrar){
        
            form.submit();
          }
    })
});