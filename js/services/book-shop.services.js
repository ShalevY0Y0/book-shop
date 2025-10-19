var gBooks;
var gLatestBookRead;
var gMaxPrice = 200;
var gMinRate = 0;
var gPageIdx = 0;
var gModalOpen = false;
const gPageSize = 3;

_createBooks();



function getBooks() {
    return gBooks;
}

function removeBook(bookId) {
    const index = gBooks.findIndex(book => bookId === book.id);
    gBooks.splice(index,1);

    const booksLen = getBookLenAfterFilter();
    if (booksLen % gPageSize === 0 && (gPageIdx) * gPageSize === booksLen && gPageIdx !== 0) {
        gPageIdx--;
    }

    _saveBooksToStorage();
}

function addBook(name,price) {
    var newBook = _createBook(makeId(),name,price,makeLoremForAllLang(),0);
    gBooks.push(newBook);
    _saveBooksToStorage();
}

function updateBook(bookId, price) {
    const index = gBooks.findIndex(book => bookId === book.id);
    gBooks[index].price = price;

    const booksLen = getBookLenAfterFilter();
    if (booksLen % gPageSize === 0 && (gPageIdx) * gPageSize === booksLen && gPageIdx !== 0) {
        gPageIdx--;
    }
    
    _saveBooksToStorage();
}



function getBookById(bookId) {
    
    var book;
    for(let i = 0; i < gBooks.length; i++) {
        if(gBooks[i].id === bookId) {
            book = gBooks[i];
            break;
        }
    }
    return book;
}

function updateLatestBookRead(bookId) {
    gLatestBookRead = getBookById(bookId);
}

function increaseRate() {
    if(gLatestBookRead.rate === 10) {
        return;
    }
    gLatestBookRead.rate++;

    _saveBooksToStorage();
}

function decreaseRate() {
    if(gLatestBookRead.rate === 0) {
        return;
    }
    gLatestBookRead.rate--;

    _saveBooksToStorage();
}

function getBooksForDisplay() {
    var books = gBooks.filter(book => (book.price <= gMaxPrice && book.rate >= gMinRate));

    const startIdx = gPageIdx * gPageSize
    books = books.slice(startIdx, startIdx + gPageSize)

    return books
}

function getBookLenAfterFilter() {
    var books = gBooks.filter(book => (book.price <= gMaxPrice && book.rate >= gMinRate));
    return books.length;
}

function setFilter(maxPrice,minRate) {
    gMaxPrice = maxPrice;
    gMinRate = minRate;

    gPageIdx = 0;
}

function getgMaxPrice() {
    return gMaxPrice;
}

function getgMinRate() {
    return gMinRate;
}

function nextPage() {
    gPageIdx++;
}

function prevPage() {
    gPageIdx--;
}

function getgPageIdx() {
    return gPageIdx;
}

function getgPageSize() {
    return gPageSize;
}

function setgModalOpen(){
    if (gModalOpen === true) {
        gModalOpen = false;
    } else {
        gModalOpen = true;
    }
}

function getgModalOpen() {
    return gModalOpen
}

function getgLatestBookRead(){
    return gLatestBookRead
}


function _createBooks() {
    var books = loadFromStorage('booksDB');

    if(!books) {
        
        
        books = [
            _createBook(makeId(),"Source Code",80,makeLoremForAllLang(),0),
            _createBook(makeId(),"Bad Blood",98,makeLoremForAllLang(),0),
            _createBook(makeId(),"Harry Poter",50,makeLoremForAllLang(),0),
            _createBook(makeId(),"Yomano Shel Hnun",110,makeLoremForAllLang(),0),
            _createBook(makeId(),"Climate Disaster",67, makeLoremForAllLang(),0)
        ]
      }
    

    gBooks = books;
    _saveBooksToStorage();
}



function _createBook(id,name,price,descObject,rate) {
    return {
        id: id,
        name: name,
        price: price,
        desc: descObject,
        rate: rate
    }
}

function _saveBooksToStorage() {
    saveBooksToStorage('booksDB',gBooks);
}


