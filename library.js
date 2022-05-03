const myLibrary = [];

const shelf = document.querySelector('.shelf');

const createBook = function(title, author, pages, read, genre) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.genre = genre;
};

createBook.prototype = {
    /*Add stuff here when needed */
}

const addToLibrary = (book) => {
    myLibrary.push(book);
    book.position = myLibrary.length - 1;
};

const removeFromLibrary = (book) => {
    myLibrary.splice(book.position,1);
    myLibrary.forEach((book, index) => {
        book.position = index;
    })
}

const displayBooks = () => {
    let read = '';
    myLibrary.forEach((e) => {
        let div = document.createElement('div');
        if (e.read) {
             read = 'This book has been read.'
        } else {
             read = 'This book has not been read.'
        };
        div.textContent = 
        `Title: ${e.title}.
        Author: ${e.author}.
        Pages: ${e.pages}.
        Genre: ${e.genre}.
        ${read}`;
        shelf.appendChild(div); 
    })
}

/* testing below */
const maus = new createBook ('Maus','Art Spiegelman',205,false,'Historical Drama');
const vendetta = new createBook ('V For Vendetta','Alan Moore',165, true, 'Alternative History');
const ready = new createBook ('Ready Player One','Ernest Clive',308,true,'Youth Adventure');
addToLibrary(maus);
addToLibrary(vendetta);
addToLibrary(ready);
displayBooks();