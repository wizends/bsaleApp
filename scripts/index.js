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
            sideBar.style = 'transform:translate(-350px)'
        })
        
}

