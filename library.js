const myLibrary = [];

/*sections of the DOM*/
const shelf = document.querySelector('.shelf');
const bookForm = document.querySelector('.extra-container');

/*buttons on the page*/
const addBook = document.querySelector('.add-book');
/*Testing to see if more advanced selectors also work in JS.
The answer is yes, the selector below works!*/
const submitBook = document.querySelector('.book-form div:nth-child(6)');
const closeButton = document.querySelector('.close');

/*the user inputs on the page*/
const titleInput = document.querySelector('#title');
const authorInput = document.querySelector('#author');
const pagesInput = document.querySelector('#pages');
const genreInput = document.querySelector('#genre');
const yesRadio = document.querySelector('#yes');
const noRadio = document.querySelector('#no');
const partialRadio = document.querySelector('#partially');


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
        if (book.displayed) {
            return;
        }
        let containerContainer = document.createElement('div');
        let bookContainer = document.createElement('div');
        let title = document.createElement('div');
        let author = document.createElement('div');
        let pages = document.createElement('div');
        let genre = document.createElement('div');
        let read = document.createElement('div');
        let removeButton = document.createElement('div');
        if (book.read === 'yes') {
            readStatus = 'This book has been read.'
        } else if (book.read === 'no' ) {
            readStatus = 'This book has not been read.'
        } else {
            readStatus = 'This book has been partially read.'
        };
        title.textContent = `Title: ${book.title}`;
        author.textContent = `Author: ${book.author}`;
        pages.textContent = `Pages: ${book.pages}`;
        genre.textContent = `Genre: ${book.genre}`;
        read.textContent = `${readStatus}`;
        removeButton.textContent = 'Remove book';
        bookContainer.classList.add('book-container');
        removeButton.classList.add('remove-button');
        bookContainer.appendChild(title);
        bookContainer.appendChild(author);
        bookContainer.appendChild(pages);
        bookContainer.appendChild(genre);
        bookContainer.appendChild(read);
        containerContainer.appendChild(bookContainer);
        containerContainer.appendChild(removeButton);
        shelf.appendChild(containerContainer);
        book.displayed = true; 
        removeButton.addEventListener('click', () => {
            shelf.removeChild(containerContainer);
            removeFromLibrary(book);
        });
    })
}

addBook.addEventListener('click', () => {
    bookForm.classList.remove('hidden');
});

submitBook.addEventListener('click', () => {
    if (!titleInput.value) {
        titleInput.classList.add('error');
    } else {
        titleInput.classList.remove('error');
    } if (!authorInput.value) {
        authorInput.classList.add('error');
    } else {
        authorInput.classList.remove('error');
    } if (!pagesInput.value) {
        pagesInput.classList.add('error');
    } else {
        pagesInput.classList.remove('error');
    } if (!genreInput.value) {
        genreInput.classList.add('error');
    } else {
        genreInput.classList.remove('error');
    } if (titleInput.className.includes('error') && !titleInput.value  ||
        authorInput.className.includes('error')  && !authorInput.value ||
        pagesInput.className.includes('error')   && !pagesInput.value ||
        genreInput.className.includes('error')   && !genreInput.value) {
          alert('Missing info');
          return;
    }title = titleInput.value;
     author = authorInput.value;
     pages = pagesInput.value;
     genre = genreInput.value;
    if (yesRadio.checked) {
         read = 'yes';
    } else if (noRadio.checked) {
         read = 'no';
    } else {
         read = 'partial'
    };  newBook = new CreateBook(title,author,pages,read,genre);
    addToLibrary(newBook);
    displayBooks();
    reset();
});

const reset = () => { 
    titleInput.value = '';
    authorInput.value = '';
    pagesInput.value = '';
    genreInput.value = '';
    yesRadio.checked = true;
};

closeButton.addEventListener('click', () => {
    bookForm.classList.add('hidden');
    reset();
    titleInput.classList.remove('error');
    authorInput.classList.remove('error');
    pagesInput.classList.remove('error');
    genreInput.classList.remove('error');
});