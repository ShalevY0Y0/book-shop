function makeId(length = 5 ){
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var txt = '';
    for(var i = 0; i < length; i ++){
        txt += possible.charAt(Math.floor(Math.random()*possible.length))
    }
    return txt
}

function makeLoremEn() {
    const words = ['The sky', 'above', 'the port', 'was', 'the color of television', 'tuned', 'to', 'a dead channel', '.', 'All', 'this happened', 'more or less', '.', 'I', 'had', 'the story', 'bit by bit', 'from various people', 'and', 'as generally', 'happens', 'in such cases', 'each time', 'it', 'was', 'a different story', '.', 'It', 'was', 'a pleasure', 'to', 'burn']
    var txt = '';
    for(var i = 0; i < words.length*2; i++) {
        txt += ' ' + words[(Math.floor(Math.random()*words.length))];
    }
    return txt
}

function makeLoremHe() {
    const words = ['השמיים', 'מעל', 'הנמל', 'היו', 'בצבע של טלוויזיה', 'מכוונת', 'ל', 'ערוץ מת', '.', 'כל', 'זה קרה', 'פחות או יותר', '.', 'אני', 'קיבלתי', 'את הסיפור', 'חתיכה אחר חתיכה', 'מאנשים שונים', 'ו', 'כפי שבדרך כלל', 'קורה', 'במקרים כאלה', 'בכל פעם', 'זה', 'היה', 'סיפור שונה', '.', 'זה', 'היה', 'תענוג', 'ל', 'שרוף']
    var txt = '';
    for(var i = 0; i < words.length*2; i++) {
        txt += ' ' + words[(Math.floor(Math.random()*words.length))];
    }
    return txt
}

function makeLoremEs() {
    const words = ['El cielo', 'sobre', 'el puerto', 'era', 'del color de un televisor', 'sintonizado', 'a', 'un canal muerto', '.', 'Todo', 'esto sucedió', 'más o menos', '.', 'Yo', 'tuve', 'la historia', 'poco a poco', 'de varias personas', 'y', 'como generalmente', 'ocurre', 'en tales casos', 'cada vez', 'era', 'una historia diferente', '.', 'Fue', 'un placer', 'quemar']
    var txt = '';
    for(var i = 0; i < words.length*2; i++) {
        txt += ' ' + words[(Math.floor(Math.random()*words.length))];
    }
    return txt

}

function makeLoremForAllLang () {
    const descObject = {
        en: makeLoremEn(),
        he: makeLoremHe(),
        es: makeLoremEs()
    }
    return descObject
}