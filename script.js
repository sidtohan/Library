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
let showing = false;

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBook(newBook) {
  books.push(newBook);
}

function displayBooks() {
  // using of loop to access array easily
  bookCase.innerHTML = '';
  // clearing any previous outputs

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

    bookCase.appendChild(insertBook);
  }
  bookCase.appendChild(newBook);
}


function openPopUp(e) {
  popUpDiv.classList.toggle('hidden');
  form.classList.toggle('hidden');
  if (showing === false) {
    showing = true;
    display.setAttribute('style', "filter: blur(10px)");
    heading.setAttribute('style', "filter: blur(10px)")
  } else {
    display.removeAttribute('style');
    heading.removeAttribute('style');
    showing = false;
  }

}

function fetchValues(e) {
  const title = form.elements['title'].value;
  const author = form.elements['author'].value;
  const pages = form.elements['pages'].value;
  const read = form.elements['read'].value;
  const newBook = new Book(title, author, pages, read);
  addBook(newBook);
  displayBooks();
  openPopUp();
  e.preventDefault();
}

form.addEventListener('submit', fetchValues);
newBook.addEventListener('click', openPopUp);
closeButton.addEventListener('click', openPopUp);
window.addEventListener('click', (e) => {
  if(e.target.classList.contains('pop-up')){
    openPopUp();
  }
})
