let title = document.getElementById("title");
let price = document.getElementById("price");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let taxes = document.getElementById("taxes");
let total = document.getElementById("total");
let category = document.getElementById("category");
let count = document.getElementById("count");
let submit = document.getElementById("create");
let dataproduct;
// let mood = "creat";
// let temp;
// get total
function getTotal() {
    if (price.value != '') {
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML = result;
        let final = Number(result) * Number(count.value);
        total.innerHTML = final;
        console.log(final)
        total.style.background = '#008000';
    } else {
        total.innerHTML = 'Total : ';
        total.style.background = 'red'
    }
}
// create product
if (localStorage.product != null) {
    dataproduct = JSON.parse(localStorage.product)
} else {
    dataproduct = [];
}
submit.onclick =  function () {
    let newproduct = {
        title: title.value,
        price: price.value,
        ads: ads.value,
        discount: discount.value,
        taxes: taxes.value,
        total: total.innerHTML,
        category: category.value,
        count: count.value
    }
    dataproduct.push(newproduct)
    localStorage.setItem('product', JSON.stringify(dataproduct))
    showdata()
    cleardata()
    
}
// clear data 
function cleardata() {
    title.value = '';
    price.value = '';
    ads.value = '';
    discount.value = '';
    taxes.value = '';
    category.value = '';
    count.value = '';
    total.innerHTML = 'Total : ';
}
// show data
function showdata() {
    let table = '';
    for (let i = 0; i < dataproduct.length; i++){
        table += `<tr>
                <td>${i + 1}</td>
                <td>${dataproduct[i].title}</td>
                <td>${dataproduct[i].category}</td>
                <td>${dataproduct[i].price}</td>
                <td>${dataproduct[i].taxes}</td>
                <td>${dataproduct[i].ads}</td>
                <td>${dataproduct[i].discount}</td>
                <td>${dataproduct[i].count}</td>
                <td>${dataproduct[i].total}</td>
                <td><button onclick="updateData(${i})" class="btn btn-warning">UPDATE</button></td>
                <td><button onclick="deleteproduct(${i})" class="btn btn-danger">DELETE</button></td>
            </tr>`
    }
    document.getElementById("tbody").innerHTML = table;
    let deleteAll = document.getElementById("deleteAll");
    if (dataproduct.length > 0) {
        deleteAll.innerHTML = `<button onclick="deleteAll()" type="button" class="btn btn-danger w-75  mt-5  " 
            aria-describedby="emailHelp">delat all <span class="text-warning">(${dataproduct.length})</span></button>`
    } else {
        deleteAll.innerHTML = '';
    }
}
showdata()
function deleteproduct(i) {
    dataproduct.splice(i, 1);
    localStorage.product = JSON.stringify(dataproduct);
    showdata()
}
function updateData(i) {
    title.value = dataproduct[i].title;
    price.value = dataproduct[i].price;
    taxes.value = dataproduct[i].taxes;
    ads.value = dataproduct[i].ads;
    discount.value = dataproduct[i].discount;
    category.value = dataproduct[i].category;
    count.value = dataproduct[i].count;
    getTotal()
    submit.innerHTML = 'Update'
    // mood = "update"
}
function deleteAll() {
    localStorage.clear();
    dataproduct.splice(0);
    showdata();
}
