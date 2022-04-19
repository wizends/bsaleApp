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

const formatter = new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    minimumFractionDigits: 0
  })

closeSideBarButton.addEventListener("click", async () => {
    sideBar.style = 'transform:translate(-350px)'
});
sideBarButton.addEventListener("click", async () => {

    sideBar.style = 'transform:translate(1px)'
});
bodyContain.addEventListener("click", async () => {

    sideBar.style = 'transform:translate(-350px)'
});
item.addEventListener("click", async () =>{
    sideBar.style = 'transform:translate(-350px)'
});

const clearProducts = async () => {
    productsContainer.innerHTML = ""
    searchResult.innerHTML = ""
}
const renderProducts = async (data) => {
    await data.map(x => {
        let price = formatter.format(x.price)
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
        <span>${price}</span>
        </div>
    </div>`
    })
}
const renderPages = async (data) => {
    for (let index = 0; index < data; index++) {
        paginationContainer.innerHTML += `
        <li class="page-item"><a onClick='paginationNumber(${index})' class="page-link">${index+1}</a></li>
        `
    }
}