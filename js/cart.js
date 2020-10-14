var arrayArticles = [];

//----------------total del precio de los productos(por cantidades)
function calcTotal(){
    let total = 0;

    let subs = document.getElementsByClassName("subtotal");
    if (subs !== null){
        for (let i = 0; i < subs.length; i++){
            total += parseInt(subs[i].innerHTML);
        }

    }
    
    document.getElementById("total").innerHTML = total;
}

//----cantidad de productos
function calcSubtotal(unitCost, i){

    let cantidad = parseInt(document.getElementById(`cantidad${i}`).value);
    subtotal = cantidad * unitCost;      
    document.getElementById(`articlesSubtotal${i}`).innerHTML = subtotal;
    calcTotal();
}



function showCart(array){

    let datos = "";
    for (let i = 0; i < array.length; i++) {
        let articles = array[i];

        let sub = 0;
        if (articles.cantidad !== undefined){
            sub = articles.unitCost * articles.cantidad;
        }
        
        datos += `
        
        <div class="container p-5">
        <table id="tableCart">
          <tr>
            <td id="imagen"><div><img src="${articles.src}"class="img-thumbnail" style="width:150px;height:150px;"></div></td>
            <td id="name"><div><strong>${articles.name}</strong></div></td>
            </tr>
            <td id="precio"><div><h3><strong>${articles.currency} ${articles.unitCost}</strong></h3></div></td>
            <td><input onchange="calcSubtotal(${articles.unitCost}, ${i})" 
                type="number" id="cantidad${i}" value="${articles.cantidad}" min="1"></td>
            <td><span class="subtotal" id="articlesSubtotal${i}">${sub}</span></td> <br>
          
          </table>
      </div>
      <br>
        `;

        /*datos +=`
        
        <div class="container p-5"
            <table id="tableCart">
                <tr>
                    <td id="imagen"><img src="`+ articles.src + `"></td>
                    <th> `+ articles.name + ` </th>
                </tr>
                <tr>
                    <td id="precio"> `+ articles.currency + articles.unitCost +`</td>
                    <td><input onchange="calcSubtotal(${articles.unitCost}, ${i})" type="number" id="cantidad` + i +`" value="`+ articles.cantidad +`" min="1"></td>
                    <td><span class="subtotal" id="articlesSubtotal${i}">${sub}</span></td>
                </tr>
          </table>
        </div>
          `;*/

        document.getElementById("datos").innerHTML = datos;
    }

}

//----(muestra dias de envio)
function calcEnvio(){


    //let total = parseInt(document.getElementById("total").innerHTML);
    let envio = document.getElementById("depto").value;


    let contenido = `
    <tr>

        <td>${envio} días</td>

    </tr>
    `

    document.getElementById("muestroDiasEnvio").innerHTML = contenido;
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(CART_INFO_URL).then(function(resultObj){
        if(resultObj.status = "ok"){

            arrayArticles = resultObj.data.articles;
            showCart(arrayArticles);
            calcEnvio()
        }
    });

    let elements = document.getElementsByName("envio");
    for (var i = 0; i < elements.length; i++) {
        elements[i].addEventListener("change", function(){
            calcEnvio()
        });
    }

});

