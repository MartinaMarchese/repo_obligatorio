const ORDER_BY_PROD_ARTICULO = "Articulos";
const ORDER_DESC_BY_PRICE = "Por Precio Mayor";
const ORDER_ASC_BY_PRICE = "Por Precio Menor";
var Arrayproducts = [];
var minCount = undefined;
var maxCount = undefined;
var buscar = undefined;

function sortProducts(criteria, array){
    let result = [];
    if (criteria === ORDER_ASC_BY_PRICE)
    {
        result = array.sort(function(a, b) {
            if ( a.cost < b.cost ){ return -1; }
            if ( a.cost > b.cost ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_DESC_BY_PRICE){
        result = array.sort(function(a, b) {
            if ( a.cost > b.cost ){ return -1; }
            if ( a.cost < b.cost ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_BY_PROD_ARTICULO){
        result = array.sort(function(a, b) {
            let aCount = parseInt(a.soldCount);
            let bCount = parseInt(b.soldCount);

            if ( aCount > bCount ){ return -1; }
            if ( aCount < bCount ){ return 1; }
            return 0;
        });
    }

    return result;
}
    
    

function showProductsList(array) {

    let htmlContentToAppend = "";
    for (let i = 0; i < array.length; i++) {
        let product = array[i];

        htmlContentToAppend += `
        <div class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col-3">
                    <img src="` + product.imgSrc + `" alt=" `+ product.description + `" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <h4 class="mb-1"> `+ product.name +` " " `+ product.cost +` " " `+ product.currency +` </h4>
                        <small class="text-muted"> `+ product.soldCount +`  artículos</small>
                      
                        
                    </div>
                    <div class="d-flex w-100 justify-content-between">
                    <p> `+ product.description +` </p></div>

                </div>
            </div>
        </div>
        `

        document.getElementById("listaProducto").innerHTML = htmlContentToAppend;
    }
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCTS_URL).then(function(resultObj){
        if(resultObj.status = "ok"){

            Arrayproducts = resultObj.data;

            Arrayproducts = sortProducts(ORDER_ASC_BY_PRICE, Arrayproducts);

            showProductsList(Arrayproducts);
        }
    });
});

document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(CATEGORIES_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            sortProducts(ORDER_ASC_BY_PRICE, resultObj.data);
        }
    });

    document.getElementById("sortAsc").addEventListener("click", function(){
        Arrayproducts = sortProducts(ORDER_ASC_BY_PRICE, Arrayproducts);
        showProductsList(Arrayproducts);
    });

    document.getElementById("sortDesc").addEventListener("click", function(){
        Arrayproducts = sortProducts(ORDER_DESC_BY_PRICE, Arrayproducts);
        showProductsList(Arrayproducts);
    });

    document.getElementById("sortByCount").addEventListener("click", function(){
        Arrayproducts = sortProducts(ORDER_BY_PROD_ARTICULO, Arrayproducts);
        showProductsList(Arrayproducts);
    });
    
    
});