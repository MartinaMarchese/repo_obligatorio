//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    
        

});

function validate(){
    var username = document.getElementById("inputEmail").value;
    var password = document.getElementById("inputPassword").value;
    if ( username == "usuario" && password == "contraseña"){
    alert ("Login successfully");
    window.location = "index.html"; // Redirecting to other page.
    return false;
    }
    
    }