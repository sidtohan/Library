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
    bookCase.appendChild(insertBook);
  }
  bookCase.appendChild(newBook);
}


function togglePopUp(e) {
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


function addListeners() {
  let requiredChild = [...bookCase.children][length - 1];
  let requiredButton = requiredChild.querySelector('.card-read');
  requiredButton.addEventListener('click', (e) => {
    if(e.target.classList.contains('yes')){
      e.target.textContent = "Not Read";
    } else{
      e.target.textContent = "Read";
    }
    e.target.classList.toggle('yes');
    e.target.classList.toggle('no');
  })
}

// fetches values from fields, and also generates
// the required listeners
function useForm(e) {
  const title = form.elements['title'].value;
  const author = form.elements['author'].value;
  const pages = form.elements['pages'].value;
  const read = form.elements['read'].value;
  const newBook = new Book(title, author, pages, read);
  addBook(newBook);
  displayBooks();
  togglePopUp();
  addListeners();
  e.preventDefault();
}

form.addEventListener('submit', useForm);
newBook.addEventListener('click', togglePopUp);
closeButton.addEventListener('click', togglePopUp);
window.addEventListener('click', (e) => {
  if (e.target.classList.contains('pop-up')) {
    togglePopUp();
  }
})
