/*Initial array that will contain the book objects*/
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

/* Constructor for the books */
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
    /*this associates each book with it's position in the array which will
    be needed when removing the book from the array. */
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
        /*this conditional prevents each book from being displayed
        when it's already being displayed*/
        if (book.displayed) {
            return;
        }
        /* the html elements that are created and displayed after
        submitting book info */
        let containerContainer = document.createElement('div');
        let dropDownContainer = document.createElement('div');
        let readDropDown = document.createElement('select');
        let bookContainer = document.createElement('div');
        let title = document.createElement('div');
        let author = document.createElement('div');
        let pages = document.createElement('div');
        let genre = document.createElement('div');
        let read = document.createElement('div');
        let removeButton = document.createElement('div');
        /* conditionals for the read status and drop down menu*/
        if (book.read === 'yes') {
            readStatus = 'This book has been read.'
            readDropDown.innerHTML = `<optgroup label="Read Status"></optgroup>
                                      <option value="yes" selected>Read</option>
                                      <option value="no">Not read</option>
                                      <option value="partially">Partially read</option>`;
        } else if (book.read === 'no' ) {
            readStatus = 'This book has not been read.'
            readDropDown.innerHTML = `<optgroup label="Read Status"></optgroup>
                                      <option value="yes">Read</option>
                                      <option value="no" selected>Not read</option>
                                      <option value="partially">Partially read</option>`;
        } else {
            readStatus = 'This book has been partially read.'
            readDropDown.innerHTML = `<optgroup label="Read Status"></optgroup>
                                      <option value="yes">Read</option>
                                      <option value="no">Not read</option>
                                      <option value="partially" selected>Partially read</option>`;
        };
        /* adding content based off input */
        title.textContent = `Title: ${book.title}`;
        author.textContent = `Author: ${book.author}`;
        pages.textContent = `Pages: ${book.pages}`;
        genre.textContent = `Genre: ${book.genre}`;
        read.textContent = `${readStatus}`;
        removeButton.textContent = 'Remove book';
        /*adding classes for styling purposes */
        bookContainer.classList.add('book-container');
        removeButton.classList.add('remove-button');
        /*adding all the elements together then onto the page */
        dropDownContainer.appendChild(readDropDown);
        bookContainer.appendChild(title);
        bookContainer.appendChild(author);
        bookContainer.appendChild(pages);
        bookContainer.appendChild(genre);
        bookContainer.appendChild(read);
        containerContainer.appendChild(dropDownContainer);
        containerContainer.appendChild(bookContainer);
        containerContainer.appendChild(removeButton);
        shelf.appendChild(containerContainer);
        /* adds a property to the book that is used to check if it's
        being displayed */
        book.displayed = true;
        /*event listener that updates the book property and display
        to the selected read status*/
        readDropDown.addEventListener('click', () => {
            if (readDropDown.value === 'yes') {
                book.read = 'yes';
                read.textContent = 'This book has been read.'
            } else if (readDropDown.value === 'no') {
                book.read = 'no';
                read.textContent = 'This book has not been read.'
            } else {
                book.read = 'partial';
                read.textContent = 'This book has been partially read.'
            }
        });
        /* event listener that removes the current book card
        from the page and from the myLibrary array*/
        removeButton.addEventListener('click', () => {
            shelf.removeChild(containerContainer);
            removeFromLibrary(book);
        });
    })
}

/*the book form is simply hidden and this button un-hides the form*/
addBook.addEventListener('click', () => {
    bookForm.classList.remove('hidden');
});

submitBook.addEventListener('click', () => {
    /* adds an error class to the form inputs if they are empty or have
    an invalid value. Will only alert and return if the value continues 
    to be invalid. */
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
    }
    /* takes the user's inputs and uses them as arguments for the 
    CreateBook constructor. */
    title = titleInput.value;
    author = authorInput.value;
    pages = pagesInput.value;
    genre = genreInput.value;
    if (yesRadio.checked) {
         read = 'yes';
    } else if (noRadio.checked) {
         read = 'no';
    } else {
         read = 'partial'
    };  
    newBook = new CreateBook(title,author,pages,read,genre);
    /* adds the newly created book to the myLibrary array, displays it
    and it's info on the page in a book card, and then resets the form. */
    addToLibrary(newBook);
    displayBooks();
    reset();
});

/*simple reset for the form */
const reset = () => { 
    titleInput.value = '';
    authorInput.value = '';
    pagesInput.value = '';
    genreInput.value = '';
    yesRadio.checked = true;
};

/* hides, resets and removes the error class from the form */
closeButton.addEventListener('click', () => {
    bookForm.classList.add('hidden');
    reset();
    titleInput.classList.remove('error');
    authorInput.classList.remove('error');
    pagesInput.classList.remove('error');
    genreInput.classList.remove('error');
});