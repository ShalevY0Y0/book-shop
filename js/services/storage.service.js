function loadFromStorage(key){
    const val = localStorage.getItem(key);
    return JSON.parse(val);
}

function saveBooksToStorage(key,val) {
    localStorage.setItem(key, JSON.stringify(val));
}