var gTrans = {
    title: {
        en: 'Welcome To My Bookshop',
        es: 'Welcame To Ma Bookeshope',
        he: 'ברוך הבא לחנות הספרים שלי'
    },

    filter: {
        en: 'Filter',
        es: 'Filtero',
        he: 'סנן'
    },

    'min-rate': {
        en: 'Min Rate',
        es: 'Minemo Rato',
        he: 'דירוג מינימלי'
    },

    'max-price': {
        en: 'Max Price',
        es: 'Maxo Prico',
        he: 'מחיר מקסימלי'
    },

    'apply-filter': {
        en: 'Apply filter',
        es: 'Applayo filtaro',
        he: 'הפעל סינון'
    },

    'table-id':{
        en: 'id',
        es: 'id',
        he: 'מזהה'
    },

    'table-Title':{
        en: 'title',
        es: 'titelo',
        he: 'שם הספר'
    },

    'table-Price': {
        en: 'price',
        es: 'prico',
        he: 'מחיר'
    },

    'table-Actions': {
        en: 'actions',
        es: 'actionso',
        he: 'פעולות'
    },

    read: {
        en: 'read',
        es: 'reado',
        he: 'תיאור'
    },

    update: {
        en: 'update',
        es: 'updato',
        he: 'עדכן'
    },

    delete: {
        en: 'delete',
        es: 'deleto',
        he: 'מחק'
    },

    prev: {
        en: 'prev',
        es: 'prevo',
        he: 'קודם'
    },

    next:{
        en: 'next',
        es: 'nexto',
        he: 'הבא'
    },

    'new-book': {
        en: 'create new book',
        es: 'creato new book',
        he: 'צרף ספר חדש'
    },

    'book-desc': {
        en: 'The Book Decription',
        es: 'booke decrepion',
        he: 'תיאור הספר'
    },

    'close-modal': {
        en: 'Close',
        es: 'Closee',
        he:  'סגור'
    },

    'price': {
        en: 'Price',
        es: 'Prico',
        he: 'מחיר'
    }
}

var gCurrentLang = 'en';

var gLangsForFormat = {
    he: 'he-IL',
    en: 'en-US',
    es: 'es-ES'
}

var gLangsForFormatSymbol = {
    he: 'ILS',
    en: 'USD',
    es: 'EUR'
    
}

function getgCurrentLang() {
    return gCurrentLang;
}

function getTrans(transKey) {
    const key = gTrans[transKey];
    if (!key) {
        return 'UNKNNOWN'
    }
    let translateVal = key[gCurrentLang]

    return translateVal

}

function doTrans() {
    const els = document.querySelectorAll('[data-trans]');
    els.forEach(el => {
        const translateKey = el.dataset.trans;
        const translateVal = getTrans(translateKey);
        el.innerText  = translateVal
    })
}

function setLang(lang) {
    gCurrentLang = lang;
}

function formatCurrency(val, lang) {
    const langFormat = gLangsForFormat[lang];
    const newLangFormat = Intl.NumberFormat(langFormat,{style: 'currency', currency: gLangsForFormatSymbol[gCurrentLang]}).format(val)
    return newLangFormat;
}





