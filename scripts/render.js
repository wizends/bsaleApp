/******************************Aqui se encuentran todas las declaraciones de variables a utilizar obtenidas del DOM */

const sideBarButton = document.getElementById('sideBarButton')
const closeSideBarButton = document.getElementById('closeSideBarButton')
const sideBar = document.getElementById('sideBar')
const sideBarItems = document.getElementById('sideBarItems')
const productsContainer = document.getElementById('productsContainer')
const searchInput = document.getElementById('searchInput')
const searchResult = document.getElementById('searchResult')
const showAll = document.getElementById('showAll')
const filterContainer = document.getElementById('filterContainer')
const filter = document.getElementById('filter')
const bodyContain = document.getElementById('bodyContain')
const item = document.querySelector('.item')
const paginationContainer = document.getElementById('paginationContainer')
/************************* */

/**Funciona para formatear los numeros a tipo de moneda cl */
const formatter = new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    minimumFractionDigits: 0
  })
  /** */


/**Controlamos el comportamiento del sidebar  */
closeSideBarButton.addEventListener("click", async () => {
    sideBar.style = 'transform:translate(-350px)'//asignamos la propiedad de transform al style del sidebar haciendo que este se escodna al clickear el boton de close
});
sideBarButton.addEventListener("click", async () => {

    sideBar.style = 'transform:translate(1px)'//aca lo mostramos de la misma manera seteando a 1 px el transform
});
bodyContain.addEventListener("click", async () => {

    sideBar.style = 'transform:translate(-350px)'
});
item.addEventListener("click", async () =>{
    sideBar.style = 'transform:translate(-350px)'
});
/** */

/**Funcion que se encarga de formatear o limpiar los campos de productos y search  */
const clearProducts = async () => {
    productsContainer.innerHTML = ""
    searchResult.innerHTML = ""
}
/** */

/**Funcion que se encarga de renderizar los productos obteniendo una data que generalmente sera un objeto a mapear */
const renderProducts = async (data) => {
    await data.map(x => {
        let price = formatter.format(x.price)//definimos una variable price para aplicar el formato clp a x.price en este caso el precio iterado las veces necesarias para el objeto 
        if (x.url_image == null || x.url_image == '') {// verificamos si alguna url viene con valor nulo o vacio
            x.url_image = "../../nodisp.png"// reemplazamos cualquiera de las 2 con una imagen por defecto 
        }
        productsContainer.innerHTML += `
    <div class="card">
        <img class="card-img-top" src="${x.url_image}" alt="Card image cap">
        <div class="card-body"><h5 class="card-title">
        ${x.name}
    </h5> </div>
        
        <div class="card-footer">
        <span>${price}</span>
        </div>
    </div>`//cargamos los productos al contenedor de productos
    })
}
/** */

/**Funcion encargada de renderizar las paginas  */
const renderPages = async (data) => {//recibe una data la cual sera en este caso un arreglo contenido de un numero
    for (let index = 0; index < data; index++) {//recorremos el arreglo n cantidad de veces, en este caso el numero que viene por la funcion 
        paginationContainer.innerHTML += `
        <li class="page-item"><input value='${index+1}' type="button" onClick='paginationNumber(${index})' class="page-link"></input></li>
        `// generamos los numeros de las paginas en el contenedor de las mismas
    }
}