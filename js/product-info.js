var product = {};
var comentariosArray = [];
var Arrayproducts = [];

function showComents(product, arrayComments){

    let inf = "";
    let img = "";
    let comments = "<hr>";

    inf += `
                    <h2> ${product.name} </h2>
                    <strong>${product.description}</strong><br><hr>
                    <h5>Precio: ${product.cost}</h5><br>
                    <h5>Moneda: ${product.currency}</h5><br>
                    <h5>Cantidad Vendidos: ${product.soldCount}</h5><br>
                    <h5>Categoría: ${product.category}</h5><br>
                    `;

    img += `
                    <img class="img" src="${product.images[0]}">
                    <img class="img" src="${product.images[1]}">
                    <img class="img" src="${product.images[2]}">
                    <img class="img" src="${product.images[3]}">
                    <img class="img" src="${product.images[4]}">
                    `;

    arrayComments.forEach(function (comment) {
        let points = "";

        comments += `
                                        <strong>${comment.user}</strong> dice:<br>
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

