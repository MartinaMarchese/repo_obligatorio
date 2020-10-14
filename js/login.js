
var usersArray = [
    {
        email: "Maria123",
        password: "contraseña1"
    },
    {
        email: "Jose456",
        password: "contraseña2"
    }];

function validateUser(array, userIn, passwordIn) { 
    for (let i = 0; i < array.length; i++) {
        let usuario = array[i];
        if (usuario.email == userIn && usuario.password == passwordIn){
            return true;
        }
    }

    return false;
} 


//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    //let algo = document.getElementById("submit");

    document.getElementById("submit").onclick = function() {

        let inputEmail = document.getElementById("inputEmail").value;
        let inputPassword = document.getElementById("inputPassword").value;
        //let inputEmail = "usuario1@mail.com";
        //let inputPassword = "contraseña1";

        let camposCompletos = true;
        
        if (inputEmail.value === '') {
            inputEmail.classList.add("invalid");
            camposCompletos = false;
        }

        if (inputPassword.value === ''){
            inputPassword.classList.add("invalid");
            camposCompletos = false;
        }

        if (camposCompletos) {

            if (validateUser(usersArray, inputEmail, inputPassword)) {
                alert("Bienvenidos")
                localStorage.setItem('User-Logged', inputEmail);
                //document.getElementById("pt").innerHTML = localStorage.getItem('User-Logged');
                window.location = 'index.html';

            }else {

                alert("Usuario o contraseña incorrectas!");
            }
                    
        }else{
            alert("Debes ingresar los datos!")
        }
    };
});
    