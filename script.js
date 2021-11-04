// Global Constants
const bookCase = document.querySelector('.book-case');
const form = document.querySelector('.input-form');
const newBook = document.querySelector('.new-book');
const popUpDiv = document.querySelector('.pop-up');
const closeButton = document.querySelector('.close-form');
const display = document.querySelector('.display');
const heading = document.querySelector('header');

// Global Variables
let books = [];
let length = 0;
let showing = false;

// logic for gettting books from localStorage
function fetchBooksLocal() {
  while (true) {
    let book = localStorage.getItem(`${length}`);
    if (book === null) {
      break;
    }
    books.push(JSON.parse(book));
    length += 1;
  }
  displayBooks();
}

// constructor for the book object
function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBook(newBook) {
  books.push(newBook);
  length += 1;
}

function displayBooks() {
  // using of loop to access array easily
  bookCase.innerHTML = '';
  // clearing any previous outputs

  let counter = 0;
  for (const i of books) {
    let insertBook = document.createElement('div');
    insertBook.classList.add('book-card')

    let cardTitle = document.createElement('div');
    cardTitle.classList.add('card-title');
    cardTitle.textContent = i.title;
    insertBook.appendChild(cardTitle)

    let cardAuthor = document.createElement('div');
    cardAuthor.classList.add('card-author');
    cardAuthor.textContent = i.author;
    insertBook.appendChild(cardAuthor)

    let cardPages = document.createElement('div');
    cardPages.classList.add('card-pages');
    cardPages.textContent = i.pages;
    insertBook.appendChild(cardPages);

    let cardRead = document.createElement('button');
    cardRead.classList.add('card-read');
    cardRead.classList.add(i.read);
    if (i.read === 'yes') {
      cardRead.textContent = "Read";
    } else {
      cardRead.textContent = "Not Read";
    }
    insertBook.appendChild(cardRead);

    let deleteCard = document.createElement('button');
    deleteCard.classList.add('delete-card');
    deleteCard.textContent = "Delete";
    insertBook.appendChild(deleteCard);

    insertBook.setAttribute('data-index', counter++);

    addListenersDisplay(insertBook);
    bookCase.appendChild(insertBook);
  }
  bookCase.appendChild(newBook);
}

// function for toggling the pop up form div
function togglePopUp(e) {
  popUpDiv.classList.toggle('hidden');
  if (showing === false) {
    display.setAttribute('style', "filter: blur(10px)");
    heading.setAttribute('style', "filter: blur(10px)");
    showing = true;
  } else {
    display.removeAttribute('style');
    heading.removeAttribute('style');
    showing = false;
  }

}

// function for updating local storage whenever a change is made
function updateLocalStorage() {
  localStorage.clear();
  for (let i = 0; i < length; i++) {
    localStorage.setItem(i, JSON.stringify(books[i]));
  }
}

// function to add the listeners -> card read button and 
// delete book card button
function addListenersDisplay(insertBook) {
  const cardRead = insertBook.querySelector('.card-read');
  const deleteCard = insertBook.querySelector('.delete-card');
  cardRead.addEventListener('click', (e) => {  
    const index = Number(insertBook.getAttribute('data-index'));
    if (e.target.classList.contains('yes')) {
      e.target.textContent = "Not Read";
      books[index].read = "no";
    } else {
      e.target.textContent = "Read";
      books[index].read = "yes";
    }
    updateLocalStorage();
    e.target.classList.toggle('yes');
    e.target.classList.toggle('no');
  })

  deleteCard.addEventListener('click', e => {
    books.splice(insertBook.getAttribute("data-index"),1);
    length -= 1;
    bookCase.removeChild(insertBook);
    updateLocalStorage();
  });
}

// fetches values from fields, and also generates
// the required listeners
function useForm(e) {
  const title = form.elements['title'].value;
  const author = form.elements['author'].value;
  const pages = form.elements['pages'].value;
  const read = form.elements['read'].value;
  const insertBook = new Book(title, author, pages, read);
  addBook(insertBook);
  displayBooks();
  togglePopUp();
  updateLocalStorage();
  e.preventDefault();
}

// INITIALIZERS
form.addEventListener('submit', useForm);
newBook.addEventListener('click', togglePopUp);
closeButton.addEventListener('click', togglePopUp);
window.addEventListener('click', (e) => {
  if (e.target.classList.contains('pop-up')) {
    togglePopUp();
  }
})
fetchBooksLocal();

