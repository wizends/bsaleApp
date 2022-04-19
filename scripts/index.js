const URI = "http://localhost:3000";

const productsToShow = 8;

fetch(`${URI}/pageQuantity`)
.then(res => res.json())
.then(pageQuantity => {
    if(pageQuantity%productsToShow > 0){
        numberofPages = Math.round(pageQuantity/productsToShow+1)
        renderPages(numberofPages)
    }else if(pageQuantity%productsToShow == 0){
        numberofPages = Math.round(pageQuantity/productsToShow)
        renderPages(numberofPages)
    }
})

filter.addEventListener('change', (e) => {
    paginationContainer.innerHTML = ""
    const condition = e.target.value
    clearProducts()
    fetch(`${URI}/products/filter/${condition}`)
    .then(res => res.json())
    .then(data => {
        productsContainer.innerHTML = ""
        searchResult.innerHTML = ""
        const titleCategory = document.getElementById('titleCategory')
            titleCategory.innerHTML = `Ordenados por: ${condition}`
            renderProducts(data)

    })
});
showAll.addEventListener("click", async (e) => {
    location.reload()
});
searchInput.addEventListener("submit", async (e) => {
    e.preventDefault()
    paginationContainer.innerHTML = ""
    const search = document.getElementById('tosearch').value
    fetch(`${URI}/products/search/${search}`)
        .then(res => res.json())
        .then(data => {
            const titleCategory = document.getElementById('titleCategory')
            titleCategory.innerHTML = `Resultado de busqueda: ${search}`
            clearProducts()
            if (data.length == 0) {
                fetch('https://api.thecatapi.com/v1/images/search')
                    .then(res => res.json())
                    .then(data => {
                        console.log(data[0])
                        searchResult.innerHTML = `
                <h3>No hay resultados para la busqueda: ${search}</h3>
                <div class="containerImg" ><img src="${data[0].url}" width="${data[0].width}" height="${data[0].height}" /></div>
                `
                    })
            } else {
                renderProducts(data)
            }

        })
});
//*************************TODOS LOS PRODUCTOS ********************************/
fetch(`${URI}/products/page?page=${0}&limit=${productsToShow}`)
    .then(res => res.json())
    .catch(err => console.log(err))
    .then(resJson => resJson[0].rows)
    .then(data => {
        console.log(data)
        filterContainer.innerHTML += `<h4 id="titleCategory">Todos los productos</h4>`
        renderProducts(data)

});
const paginationNumber = async (page) => {
    fetch(`${URI}/products/page?page=${page}&limit=${productsToShow}`)
    .then(res => res.json())
    .catch(err => console.log(err))
    .then(resJson => resJson[0].rows)
    .then(data => {
        filterContainer.innerHTML = `<h4 id="titleCategory">Todos los productos</h4>`
        clearProducts()
        renderProducts(data)

});
}

fetch(`${URI}/categories`)
    .then(res => res.json())
    .catch(err => console.log(err))
    .then(data => {
        data.map(x => {
            sideBarItems.innerHTML += `<a id="${x.id}" onClick="handleClick(${x.id})"class="list-group-item item">${x.name}</a>`
        })
    });

const handleClick = async (id) => {
    paginationContainer.innerHTML = ""
    fetch(`${URI}/categories/${id}`)
        .then(res => res.json())
        .then(data => {
            const titleCategory = document.getElementById('titleCategory')
            const title = document.getElementById(id)
            titleCategory.innerHTML = `${title.innerHTML.toLocaleUpperCase()}`
            clearProducts()
            renderProducts(data)
            sideBar.style = 'transform:translate(-350px)'
        })
        
}

