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

closeSideBarButton.addEventListener("click", async () => {
    sideBar.style = 'transform:translate(-350px)'
});
sideBarButton.addEventListener("click", async () => {

    sideBar.style = 'transform:translate(1px)'
});
productsContainer.addEventListener("click", async () => {

    sideBar.style = 'transform:translate(-350px)'
});

const clearProducts = async () => {
    productsContainer.innerHTML = ""
    searchResult.innerHTML = ""
}
const renderProducts = async (data) => {
    await data.map(x => {
        if (x.url_image == null || x.url_image == '') {
            x.url_image = "../../nodisp.png"
        }
        productsContainer.innerHTML += `
    <div class="card">
        <img class="card-img-top" src="${x.url_image}" alt="Card image cap">
        <div class="card-body"><h5 class="card-title">
        ${x.name}
    </h5> </div>
        
        <div class="card-footer">
        <span>${x.price}</span>
        <a><i class="fa-solid fa-cart-plus"></i></a>
        </div>
    </div>`
    })
}
const URI = "https://bsaletesapi.herokuapp.com";

filter.addEventListener('change', (e) => {
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
    clearProducts()
    await fetch(`${URI}/products`)
        .then(res => res.json())
        .catch(err => console.log(err))
        .then(data => {
            const titleCategory = document.getElementById('titleCategory')
            titleCategory.innerHTML = `Todos los productos`
            renderProducts(data)
        });
});
searchInput.addEventListener("submit", async (e) => {
    e.preventDefault()
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
fetch(`${URI}/products`)
    .then(res => res.json())
    .catch(err => console.log(err))
    .then(data => {
        filterContainer.innerHTML += `<h4 id="titleCategory">Todos los productos</h4>`
        renderProducts(data)
    });

fetch(`${URI}/categories`)
    .then(res => res.json())
    .catch(err => console.log(errrs))
    .then(data => {
        data.map(x => {
            sideBarItems.innerHTML += `<a id="${x.id}" onClick="handleClick(${x.id})"class="list-group-item item">${x.name}</a>`
        })
    });

const handleClick = async (id) => {
    fetch(`${URI}/categories/${id}`)
        .then(res => res.json())
        .then(data => {
            const titleCategory = document.getElementById('titleCategory')
            const title = document.getElementById(id)
            titleCategory.innerHTML = `${title.innerHTML.toLocaleUpperCase()}`
            clearProducts()
            renderProducts(data)
        })
}

