var articles = [];

function showArticles (array){

    let datos = "";
    for (let i = 0; i < array.length; i++) {
        let articles = array[i];

        datos += `
        
        <div class="container p-5">
        <table id="tableCart">
          <tr>
            <td id="imagen"><div><img src="${articles.images}"></div></td>
            <td id="name"><div>${articles.name}</div></td>
            <td id="precio"><div>${articles.currency} ${articles.unitCost}</div></td>
          </tr>
          </table>
      </div>
        `

        document.getElementById("datos").innerHTML = datos;
    }

}

/*function showArticles (articles){
    let datos = "";
    let imag = "";

    datos +=`
                <h2> ${articles.name} </h2>
                <h5>Cantidad: ${articles.count}</h5><br>
                <h5>Precio: ${articles.unitCost}</h5><br>
                <h5>Moneda: ${articles.currency}</h5><br>
                `
    imag +=`
                <img class="img" src="${articles.images[0]}">
                `

    document.getElementById("datos").innerHTML = datos;
    document.getElementById("imagen").innerHTML = imag;
}*/


//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(CART_INFO_URL).then(function(resultObj){
        if(resultObj.status = "ok"){

            articles = resultObj.data;
            showArticles(articles);
        }
    });

});
