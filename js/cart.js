var arrayArticles = [];

//----------------total del precio de los productos(por cantidades)----------
function calcTotal() {
    let total = 0.0;

    let subs = document.getElementsByName("subtotal");
    if (subs !== null) {
        for (let i = 0; i < subs.length; i++) {
            total += parseInt(subs[i].innerHTML);
        }

    }

    document.getElementById("total").innerHTML = total;
}

//----cantidad de productos------------- calculo de pesos a dolar ---------------------------------
function calcSubtotal(unitCost, i) {

    let cantidad = parseInt(document.getElementById(`cantidad${i}`).value);
    console.log(arrayArticles[i].currency);
    subtotal = cantidad * unitCost;
    if (arrayArticles[i].currency === "UYU") {
        subtotal = subtotal / 40;
    }


    document.getElementById(`articlesSubtotal${i}`).innerHTML = subtotal;
    calcTotal();
}



function showCart(array) {

    let datos = "";
    for (let i = 0; i < array.length; i++) {
        let articles = array[i];

        let sub = 0;
        if (articles.cantidad !== undefined) {
            sub = articles.unitCost * articles.cantidad;
        }

        datos += `

        <div class="container">
            <div class="row">
                <div class="col">
                    <h4 class="mb-1"> <strong>"${articles.name}"</strong></h4>
                    <img src="${articles.src}"class="img-thumbnail" style="width:150px;height:150px;">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                            <div class="input-group mb-3">
                                <div class="input-group-prepend">
                                <span class="input-group-text">${articles.currency}</span>
                                <span class="input-group-text">${articles.unitCost}</span>
                            </div>
                            <input class="form-control" onchange="calcSubtotal(${articles.unitCost}, ${i})" 
                            type="number" id="cantidad${i}" value="${articles.cantidad}" min="1" required>
                            <span class="input-group-text">USD</span>
                            <span class="input-group-text" name="subtotal"  id="articlesSubtotal${i}">${sub}</span>
                            
                            <div class="invalid-feedback">
                                Por favor, seleccione la cantidad.
                            </div> <br>
                            

                            <button class="btn btn-danger" onclick="remove(${i})">Quitar</button>
                    </div>
                    
                </div>
                
            </div>
        </div>
        <br>
        `;

        document.getElementById("datos").innerHTML = datos;
    }

}


function remove(i) {
    if (arrayArticles.length > 1) {
        arrayArticles.splice(i, 1);
        showCart(arrayArticles);
    } else {
        document.getElementById("miCarrito").innerHTML =
            `
                            <h2>No hay más artículos en tu carrito.</h2>
                            <p>Puede buscar artículos en nuestro <a href="index.html">Inicio</a></p>
                                        `;
    }
}

//----(muestra dias de envio)--------costo sobre el subtotal % ------------------------------------
function calcEnvio() {


    //let total = parseInt(document.getElementById("total").innerHTML);
    let envio = document.getElementById("tipoDeEnvio").value;
    let precioTotal = document.getElementById("total").innerText;
    let costoEnvio = precioTotal * parseInt(envio) / 100;


    let contenido = `
    <tr>

        <td><strong>Costo del ${envio}% sobre el subtotal: USD ${costoEnvio}</strong></td>

    </tr>
    `
    document.getElementById("muestroPorcentajeSub").innerHTML = contenido;


}

//----------------------validacion MODAL--------------------------------------------
document.addEventListener("DOMContentLoaded", function () {
    let form = document.getElementById('needs-validation');

    form.addEventListener('submit', function (event) {
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        form.classList.add('was-validated');
    });
});
//----------------------------------------------------------------------------------

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(CART_INFO_URL).then(function (resultObj) {
        if (resultObj.status = "ok") {

            arrayArticles = resultObj.data.articles;
            showCart(arrayArticles);
            calcEnvio()
        }
    });

    let elements = document.getElementsByName("envio");
    for (var i = 0; i < elements.length; i++) {
        elements[i].addEventListener("change", function () {
            calcEnvio()
        });
    }

});

