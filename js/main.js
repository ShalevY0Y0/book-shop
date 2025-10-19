function onInit() {
    renderFilterbyQueryParams();
    doTrans();
    renderBooks();
}


function renderBooks() {
    const books = getBooksForDisplay();
    const carFields = ["id", "Title", "Price", "Actions"];

    var colunmTitles = `<tr>`;
    for(let i = 0; i < carFields.length; i++) {
        colunmTitles+= `<th data-trans="table-${carFields[i]}">${carFields[i]}</th>`
    }
    colunmTitles += `</tr>`
    document.querySelector('thead').innerHTML = colunmTitles;

    var tableData = ``
    for(let i = 0; i < books.length; i++) {
        tableData += `<tr>`;
        tableData += `<td>${books[i].id}</td>`
        tableData += `<td>${books[i].name}</td>`
        tableData += `<td data-price = "${books[i].price}" class = "price-by-lang">${formatCurrency(books[i].price,getgCurrentLang())}</td>`
        tableData += `<td><button data-trans = "read" class = "read CRUD" onclick = "onReadBook('${books[i].id}')">Read</button></td>`
        tableData += `<td><button data-trans = "update" class = "update CRUD" onclick = "onUpdateBook('${books[i].id}')">Update</button></td>`
        tableData += `<td><button data-trans = "delete" class = "delete CRUD" onclick = "onRemoveBook('${books[i].id}')">Delete</button></td>`
        tableData += `</tr>`
    }

    document.querySelector('tbody').innerHTML = tableData
    
    const currentPage = getgPageIdx();
    const pageSize = getgPageSize();
    const booksLen = getBookLenAfterFilter();

    
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
    doTrans();

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
    doTrans();
}

function onUpdateBook(bookId) {
    var price = Number(prompt('price ?'));

    if (price > 200) {
        alert("The price must be less than 200")
        return;
    }
    
    updateBook(bookId,price);

    renderBooks();
    doTrans();
}

function onReadBook(bookId) {
    openModal(bookId);
    updateLatestBookRead(bookId);

    const maxPriceFilter = getgMaxPrice();
    const minRateFilter = getgMinRate();
    const latestBookReadId = getgLatestBookRead().id;
    const isModalOpen = getgModalOpen();
    
    const queryStringParams = `?max-price=${maxPriceFilter}&min-rate=${minRateFilter}&latest-book-desc-read-id=${latestBookReadId}&is-modal-open=${isModalOpen}`
    const cuurentUrl = window.location.protocol + '//' + window.location.host + window.location.pathname
    const newUrl = cuurentUrl + queryStringParams;
    window.history.pushState({path: newUrl},'',newUrl);
}

function openModal(bookId) {
    console.log(gBooks)
    const lang = getgCurrentLang();
    const book = getBookById(bookId);
    const elModal = document.querySelector('.modal')
    elModal.classList.add('open');
    elModal.querySelector('h3').innerText = `${book.name}`
    elModal.querySelector('.book-price').textContent = ` ${formatCurrency(book.price,lang)}`
    elModal.querySelector('p').innerText = `${book.desc[lang]}`
    elModal.querySelector('.rating').innerText = `${book.rate}`
    setgModalOpen();
    
}

function onCloseModal() {
    const elModal = document.querySelector('.modal')
    elModal.classList.remove('open');
    
    setgModalOpen()

    const maxPriceFilter = getgMaxPrice();
    const minRateFilter = getgMinRate();
    const latestBookReadId = getgLatestBookRead().id;
    const isModalOpen = getgModalOpen();


    const queryStringParams = `?max-price=${maxPriceFilter}&min-rate=${minRateFilter}&latest-book-desc-read-id=${latestBookReadId}&is-modal-open=${isModalOpen}`
    const cuurentUrl = window.location.protocol + '//' + window.location.host + window.location.pathname
    const newUrl = cuurentUrl + queryStringParams;
    window.history.pushState({path: newUrl},'',newUrl);
}

function onIncreaseRate() {
    increaseRate();
    
    const book = getgLatestBookRead();
    document.querySelector('.rating').innerHTML = book.rate;
}

function onDecreaseRate() {
    decreaseRate();

    const book = getgLatestBookRead();
    document.querySelector('.rating').innerHTML = book.rate;
}



function onSetFilter(ev) {
    ev.preventDefault();
    
    var maxPriceFilter = document.querySelector('#max-price').value;
    var minRateFilter = document.querySelector('#min-rate').value;

    var latestBookReadId;
    if (!getgLatestBookRead()){
        latestBookReadId = "none"
    } else {
        latestBookReadId = getgLatestBookRead().id
    }
         
    const isModalOpen = getgModalOpen();

    setFilter(maxPriceFilter,minRateFilter);
    renderBooks()
    doTrans()

    const queryStringParams = `?max-price=${maxPriceFilter}&min-rate=${minRateFilter}&latest-book-desc-read-id=${latestBookReadId}&is-modal-open=${isModalOpen}`
    const cuurentUrl = window.location.protocol + '//' + window.location.host + window.location.pathname
    const newUrl = cuurentUrl + queryStringParams;
    window.history.pushState({path: newUrl},'',newUrl);   
}

function renderFilterbyQueryParams() {
    const queryStringParams = new URLSearchParams(window.location.search);

    var maxPriceFilter = queryStringParams.get('max-price');
    var  minRateFilter = queryStringParams.get('min-rate');
    const latestBookReadId = queryStringParams.get('latest-book-desc-read-id');
    const isModalOpen = queryStringParams.get('is-modal-open');

    if(!maxPriceFilter && !minRateFilter && !isModalOpen && !latestBookReadId){
        const initPrice = getgMaxPrice();
        const initRate = getgMinRate();
        const initgModalOpen = getgModalOpen();
        const initLatestBookRead = "none";
        const queryStringParams = `?max-price=${initPrice}&min-rate=${initRate}&latest-book-desc-read-id=${initLatestBookRead}&is-modal-open=${initgModalOpen}`
        const cuurentUrl = window.location.protocol + '//' + window.location.host + window.location.pathname
        const newUrl = cuurentUrl + queryStringParams;
        window.history.pushState({path: newUrl},'',newUrl);

        document.querySelector('#max-price').value = initPrice;
        document.querySelector('#min-rate').value = initRate;
        
        return;
    }

    document.querySelector('#max-price').value = maxPriceFilter;
    document.querySelector('#min-rate').value = minRateFilter;


    setFilter(maxPriceFilter,minRateFilter);
    updateLatestBookRead(latestBookReadId);
    
    if (isModalOpen === 'true') {
        openModal(latestBookReadId)
    }
}

function onNextPage() {
    nextPage();
    renderBooks();
    doTrans();
}

function onPrevPage() {
    prevPage();
    renderBooks();
    doTrans();
}

function refreshPriceFormatInTable() {
    document.querySelectorAll('.price-by-lang').forEach(el => {
        const price = Number(el.dataset.price);
        el.textContent = formatCurrency(price, getgCurrentLang())
    })
}

function onSetLang(lang) {
    setLang(lang)
    console.log('main.js')


    if (lang === 'he') {
        document.querySelector('body').classList.add('rtl')
    } else {
        document.querySelector('body').classList.remove('rtl')
    }
    doTrans()
    refreshPriceFormatInTable()

    
}