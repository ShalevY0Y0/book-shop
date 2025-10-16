function onInit() {
    renderFilterbyQueryParams();
    renderBooks();
}


function renderBooks() {
    const books = getBooksForDisplay();
    const carFields = ["id", "Title", "Price", "Actions"];

    var colunmTitles = `<tr>`;
    for(let i = 0; i < carFields.length; i++) {
        colunmTitles+= `<th>${carFields[i]}</th>`
    }
    colunmTitles += `</tr>`
    document.querySelector('thead').innerHTML = colunmTitles;

    var tableData = ``
    for(let i = 0; i < books.length; i++) {
        tableData += `<tr>`;
        tableData += `<td>${books[i].id}</td>`
        tableData += `<td>${books[i].name}</td>`
        tableData += `<td>${books[i].price}</td>`
        tableData += `<td><button class = "read CRUD" onclick = "onReadBook('${books[i].id}')">Read</button></td>`
        tableData += `<td><button class = "update CRUD" onclick = "onUpdateBook('${books[i].id}')">Update</button></td>`
        tableData += `<td><button class = "delete CRUD" onclick = "onRemoveBook('${books[i].id}')">Delete</button></td>`
        tableData += `</tr>`
    }

    document.querySelector('tbody').innerHTML = tableData
    
    const currentPage = getgPageIdx();
    const pageSize = getgPageSize();
    const booksLen = getBookLenAfterFilter();

    console.log(currentPage)
    if (currentPage === 0) {
        document.querySelector('.prev').disabled = true;
    } else {
        document.querySelector('.prev').disabled = false;
    }

    if(currentPage + 1 === Math.ceil(booksLen / pageSize) || booksLen === 0) {
        document.querySelector('.next').disabled = true;
    } else {
        document.querySelector('.next').disabled = false;
    }



}

function onRemoveBook(bookId) {
    removeBook(bookId);
    
    renderBooks();

}

function onAddBook() {
    var name = prompt('name ?');
    var price = Number(prompt('price ?'));

    if (price > 200) {
        alert("The price must be less than 200")
        return;
    }
    
    addBook(name,price);
    renderBooks();
}

function onUpdateBook(bookId) {
    var price = Number(prompt('price ?'));

    if (price > 200) {
        alert("The price must be less than 200")
        return;
    }
    
    updateBook(bookId,price);

    renderBooks();
}

function onReadBook(bookId) {
    const book = getBookById(bookId);
    console.log(book.desc)
    const elModal = document.querySelector('.modal')
    elModal.classList.add('open');
    elModal.querySelector('h3').innerText = `${book.name}`
    elModal.querySelector('h4').innerText = `Price: ${book.price}$`
    elModal.querySelector('p').innerText = `${book.desc}`
    elModal.querySelector('.rating').innerText = `${book.rate}`
    updateLatestBookRead(bookId);
}

function onCloseModal() {
    const elModal = document.querySelector('.modal')
    elModal.classList.remove('open');
}

function onIncreaseRate() {
    increaseRate();
    
    const book = getLatestBookRead();
    document.querySelector('.rating').innerHTML = book.rate;


}

function onDecreaseRate() {
    decreaseRate();

    const book = getLatestBookRead();
    document.querySelector('.rating').innerHTML = book.rate;
}



function onSetFilter(ev) {
    ev.preventDefault();
    
    var maxPriceFilter = document.querySelector('#max-price').value;
    var minRateFilter = document.querySelector('#min-rate').value;

    setFilter(maxPriceFilter,minRateFilter);
    renderBooks()

    const queryStringParams = `?max-price=${maxPriceFilter}&min-rate=${minRateFilter}`
    const cuurentUrl = window.location.protocol + '//' + window.location.host + window.location.pathname
    const newUrl = cuurentUrl + queryStringParams;
    window.history.pushState({path: newUrl},'',newUrl);    
    //renderFilterbyQueryParams(maxPriceFilter,minRateFilter);

    //console.log('maximum price : ',maxPrice,' min rate : ', minRate);
}

function renderFilterbyQueryParams() {
    const queryStringParams = new URLSearchParams(window.location.search);

    var maxPriceFilter = queryStringParams.get('max-price');
    var  minRateFilter = queryStringParams.get('min-rate');

    if(!maxPriceFilter && !minRateFilter){
        return;
    }

    document.querySelector('#max-price').value = maxPriceFilter;
    document.querySelector('#min-rate').value = minRateFilter;

    setFilter(maxPriceFilter,minRateFilter);

}

function onNextPage() {
    nextPage();
    renderBooks();
}

function onPrevPage() {
    prevPage();
    renderBooks();
}