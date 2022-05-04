const myLibrary = [];

const shelf = document.querySelector('.shelf');
const addBook = document.querySelector('.add-book');
const bookForm = document.querySelector('.extra-container');
/*Testing to see if more advanced selectors also work in JS.
The answer is yes, the selector below works!*/
const submitBook = document.querySelector('.book-form div:nth-child(6)');
const closeButton = document.querySelector('.close');

const CreateBook = function(title, author, pages, read, genre) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.genre = genre;
};

CreateBook.prototype = {
    /*Add stuff here when needed */
}

const addToLibrary = (book) => {
    myLibrary.push(book);
    book.position = myLibrary.length - 1;
};

const removeFromLibrary = (book) => {
    myLibrary.splice(book.position, 1);
    /*updates each book's position in the array*/
    myLibrary.forEach((book, index) => {
        book.position = index;
    })
}

const displayBooks = () => {
    myLibrary.forEach((book) => {
        let bookContainer = document.createElement('div');
        let title = document.createElement('div');
        let author = document.createElement('div');
        let pages = document.createElement('div');
        let genre = document.createElement('div');
        let read = document.createElement('div');
        if (book.read) {
            readStatus = 'This book has been read.'
        } else {
            readStatus = 'This book has not been read.'
        };
        title.textContent = `Title: ${book.title}`;
        author.textContent = `Author: ${book.author}`
        pages.textContent = `Pages: ${book.pages}`
        genre.textContent = `Genre: ${book.genre}`
        read.textContent = `${readStatus}`
        bookContainer.appendChild(title);
        bookContainer.appendChild(author);
        bookContainer.appendChild(pages);
        bookContainer.appendChild(genre);
        bookContainer.appendChild(read);
        shelf.appendChild(bookContainer); 
    })
}

addBook.addEventListener('click', () => {
    bookForm.classList.remove('hidden');
});

submitBook.addEventListener('click', () => {
   
});

closeButton.addEventListener('click', () => {
    bookForm.classList.add('hidden');
});

/* testing below */
const maus = new CreateBook ('Maus','Art Spiegelman',205,false,'Historical Drama');
const vendetta = new CreateBook ('V For Vendetta','Alan Moore',165, true, 'Alternative History');
const ready = new CreateBook ('Ready Player One','Ernest Clive',308,true,'Youth Adventure');
addToLibrary(maus);
addToLibrary(vendetta);
addToLibrary(ready);
displayBooks();