var product = {};
var comentariosArray = [];
var Arrayproducts = [];

function showRelatedProducts(arrayLista, arrayRelated){
    let cont = '<hr>';
    arrayRelated.forEach(function(i){
        cont += '' + arrayLista[i].name + '<br>';
        cont += 'Precio: ' + arrayLista[i].cost + '<br>';
        cont += 'Vendidos: ' + arrayLista[i].soldCount + '<br>';
        cont += '<img class="img" src="' + arrayLista[i].imgSrc + ' " >  <br>  ';
        cont += '<a href="product-info.html"><button style="float: right;" class="button">Ver Producto</button></a><br><br>'
        cont += '<br><hr><br>'
    });

    document.getElementById("productoRelacionado").innerHTML = cont;

} 

function showComents(product, arrayComments){

    let inf = "";
    let img = "";
    let comments = "<hr>";

    inf += `
                    <h2> ${product.name} </h2>
                    <strong>${product.description}</strong><br><hr>
                    <h5>Precio: ${product.currency} ${product.cost}</h5><br>
                    <h5>Cantidad Vendidos: ${product.soldCount}</h5><br>
                    <h5>Categoría: ${product.category}</h5><br>
                    `;

    img += `
                    <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
                <div class="carousel-inner">
                    <div class="carousel-item active">
                    <img src="${product.images[0]}" class="d-block w-100" alt="">
                    </div>
                    <div class="carousel-item">
                    <img src="${product.images[1]}" class="d-block w-100" alt="">
                    </div>
                    <div class="carousel-item">
                    <img src="${product.images[2]}" class="d-block w-100" alt="">
                    </div>
                    <div class="carousel-item">
                    <img src="${product.images[3]}" class="d-block w-100" alt="">
                    </div>
                    <div class="carousel-item">
                    <img src="${product.images[4]}" class="d-block w-100" alt="">
                    </div>
                </div>
                <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="sr-only">Previous</span>
                </a>
                <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="sr-only">Next</span>
                </a>
                </div>
                `;

    arrayComments.forEach(function (comment) {
        let points = "";

        comments += `
                                        <strong>${comment.user}</strong>:<br>
                                        <p>${comment.description}</p>
                                        `;

        for (let i = 1; i <= comment.score; i++) {
            points += `<span class="fa fa-star checked"></span>`;
        }

        for (let i = comment.score + 1; i <= 5; i++) {
            points += `<span class="fa fa-star"></span>`;
        }
        comments += `<sub>${comment.dateTime}</sub><br>`;

        comments += `<div style="text-align: right;">${points}</div><br><hr>`;

    });

    document.getElementById("comments").innerHTML = comments;
    document.getElementById("content").innerHTML = inf;
    document.getElementById("imagen").innerHTML = img;

}

document.addEventListener("DOMContentLoaded", function (e) {

    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            comentariosArray = resultObj.data;
        }

    });


    getJSONData(PRODUCT_INFO_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            product = resultObj.data;

            showComents(product, comentariosArray);
        }

    });

    getJSONData(PRODUCTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            Arrayproducts = resultObj.data;

            showRelatedProducts(Arrayproducts, product.relatedProducts);
        }

    });

    

    let userLogged = localStorage.getItem('User-Logged');
    if (userLogged) {
        document.getElementById("nuevoComment").style = "display: inline-block";
    }

    document.getElementById("sendComment").addEventListener("click", function () {
        let now = new Date();

        let dateTime = `${now.getFullYear()}-${now.getMonth()+1}-${now.getDate()} `;
        dateTime += `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;

        let newComment = {
            score: parseInt(document.getElementById('newScore').value),
            description: document.getElementById('newComment').value,
            user: JSON.parse(localStorage.getItem('User-Logged')).email,
            dateTime: dateTime
        };


        comentariosArray.push(newComment);

        showComents(product, arrayComments);

    })

});


//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCT_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            product = resultObj.data;

            //Muestro las imagenes en forma de galería
            showComents(images);
        }
    });

});



                    /*<img class="img" src="${product.images[0]}">
                    <img class="img" src="${product.images[1]}">
                    <img class="img" src="${product.images[2]}">
                    <img class="img" src="${product.images[3]}">
                    <img class="img" src="${product.images[4]}">*/