const URI = "http://localhost:3004"; //se crea la varaible URI para almacenar esta misma 
const productsToShow = 8;//Se crea la variable que determina la cantidad de productos a mostrar 

//*************************CANTIDAD DE PRODUCTOS ********************************/
fetch(`${URI}/pageQuantity`)//utilizamos la URI y hacemos una peticion de tipo GET(la predeterminada) para obtener la cantidad de productos que retorna
.then(res => res.json())//como lo anterior es una promise, una vez este fetch retorne una respuesta la parseamos a json
.then(pageQuantity => {// hacemos una arrowfunction 
    if(pageQuantity%productsToShow > 0){ //preguntamos al resto de pagequantity con productsToshow si es mayor a 0  
        numberofPages = Math.round(pageQuantity/productsToShow+1)//en tal caso utilizamos la cantidad de productos y la dividimos entre los productos a mostrar(8) a este resultado le sumamos 1 y lo redondeamos, esto en caso de que resulte un decimal, de esta manera si retorna 1,x sera siempre 2 osea n+1 
        renderPages(numberofPages)//mandamos el resultado a la funcion rederPages 
    }else if(pageQuantity%productsToShow == 0){//preguntamos si el resto es igual 
        numberofPages = Math.round(pageQuantity/productsToShow) // dividimos y redondeamos en este caso el resultado siempre sera entero
        renderPages(numberofPages)//mandamos el resultado a la funcion rederPages 
    }
})
//*************************FILTRO ********************************/
filter.addEventListener('change', (e) => {//usamos la variable filter definida anteriormente para agregarle un avento, el cual escucha un cambio 
    paginationContainer.innerHTML = ""//vacia el contenido del contenedor de paginacion
    const condition = e.target.value//le pasamos el valor del evento 
    clearProducts()//limpiamos los productos 
    fetch(`${URI}/products/filter/${condition}`)//peticion en donde le bindeamos la condicion obtenida anteriormente del target 
    .then(res => res.json())
    .then(data => {
        productsContainer.innerHTML = ""//vaciamos el contenedor de productos
        searchResult.innerHTML = ""//vaciamos el contenedor de busqueda
        const titleCategory = document.getElementById('titleCategory') //obtenemos el contenedor del titulo de la categoria
            titleCategory.innerHTML = `Ordenados por: ${condition}`//rellenamos el contenedor con un string seguido de la condicion
            renderProducts(data)//renderizamos los productos traidos por la peticion https

    })
});
//*************************RECARGA TODOS LOS PRODUCTOS ********************************/
showAll.addEventListener("click", async (e) => {//usamos la variable showall la cual recibe el evento de click 
    location.reload()//fuerza el recargo de la pagina, de esta manera nos ahorramos un fetch
});
//*************************BUSQUEDA DE LOS PRODUCTOS ********************************/
searchInput.addEventListener("submit", async (e) => {//usamos la variable searchinput la cual recibe el evento de submit
    e.preventDefault()//se previente el reload de la pagina 
    paginationContainer.innerHTML = ""//vaciamos contenedor de paginacion
    const search = document.getElementById('tosearch').value//obtenemos el valor de la busqueda
    fetch(`${URI}/products/search/${search}`)//peticion donde le bindeamos la busqueda obtenida anteriormente
        .then(res => res.json())
        .then(data => {
            const titleCategory = document.getElementById('titleCategory')//obtenemos el contenedor del titulo de la categoria
            titleCategory.innerHTML = `Resultado de busqueda: ${search}`// rellenamos ese contenedor con la busqueda para mostrar lo buscado
            clearProducts()//limpiamos el contenedor de productos
            if (data.length == 0) {//verificamos si el resultado de la busqueda tiene un largo igual a 0 osea que no encontro nada
                fetch('https://api.thecatapi.com/v1/images/search')//peticion https a la api de los gatos para traer una imagen
                    .then(res => res.json())
                    .then(data => {
                        searchResult.innerHTML = `
                <h3>No hay resultados para la busqueda: ${search}</h3>
                <div class="containerImg" ><img src="${data[0].url}" width="${data[0].width}" height="${data[0].height}" /></div>
                `//el resultado de la api es una imagen random, la ponemos en un div debajo del resultado obtenido, en este ninguno
                    })
            } else {
                renderProducts(data)//en el caso que el largo de la busqueda sea mayor a 0 va a renderizar los productos encontrados
            }

        })
});
//*************************TODOS LOS PRODUCTOS ********************************/
fetch(`${URI}/products/page?page=${0}&limit=${productsToShow}`)//peticion https donde bindeamos mediante query(? con este simbolo) la pagina actual seguida del limite de productos a mostrar
    .then(res => res.json())
    .catch(err => console.log(err))//capturamos un error si es que lo hubiera
    .then(resJson => resJson[0].rows)// aca simplificamos la respuesta trayendo solo la primera fila del arreglo en la cual viene el objeto, luego de eso llamamos a la key rows en donde vienen los datos
    .then(data => {
        filterContainer.innerHTML += `<h4 id="titleCategory">Todos los productos</h4>`//rellenamos el contenedor del filtro para mostrar el titulo de lo obtenido
        renderProducts(data)//renderizamos el resultado 

});
//*************************FUNCION PARA MANEJAR LA PAGINACION  ********************************/
const paginationNumber = async (page) => {//genereamos una arrowfunction que reciba una pagina 
    fetch(`${URI}/products/page?page=${page}&limit=${productsToShow}`)//peticion https la cual bindea mediante una query la pagina y el limite de productos a mostrar
    .then(res => res.json())
    .catch(err => console.log(err))
    .then(resJson => resJson[0].rows)
    .then(data => {
        filterContainer.innerHTML = `<h4 id="titleCategory">Todos los productos</h4>`
        clearProducts()
        renderProducts(data)

});
}
//*************************TODAS LAS CATEGORIAS ********************************/
fetch(`${URI}/categories`)//peticion https para categorias
    .then(res => res.json())
    .catch(err => console.log(err))
    .then(data => {
        data.map(x => {//mapeamos la data obtenida en este caso un array con el objeto a recorrer 
            sideBarItems.innerHTML += `<a id="${x.id}" onClick="handleClick(${x.id})"class="list-group-item item">${x.name}</a>`//llenamos con las categorias el contenedor del sidebar
        })
    });
//*************************MUESTRA PRODUCTOS POR CATEGORIA SELECCIONADA********************************/
const handleClick = async (id) => {// creamos una arrowfunction que reciba un id  
    paginationContainer.innerHTML = ""//vaciamos el contenedor de productos 
    fetch(`${URI}/categories/${id}`)//peticion https hacia categorias bindeandole el id de categoria que posee el producto
        .then(res => res.json())
        .then(data => {
            const titleCategory = document.getElementById('titleCategory')//obtenemos el contenedor del titulo de la categoria
            const title = document.getElementById(id)//obtenemos el titulo mediante el id que reciba la funcion
            titleCategory.innerHTML = `${title.innerHTML.toLocaleUpperCase()}`//rellenamos el titulo con lo obtenido anteriormente y lo pasamos a mayusculas
            clearProducts()//limpiamos el contenedor de productos   
            renderProducts(data)//renderizamos los productos 
            sideBar.style = 'transform:translate(-350px)'//escondemos el sidebar una vez estos son renderizados
        })
        
}

