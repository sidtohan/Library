// Global Constants
const bookCase = document.querySelector('.book-case');
const form = document.querySelector('.input-form');
const newBook = document.querySelector('.new-book');
const popUpDiv = document.querySelector('.pop-up')

// Global Variables
let books = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBook(newBook){
  books.push(newBook);
}

function displayBooks(){
  // using of loop to access array easily
  bookCase.innerHTML = '';
  // clearing any previous outputs

  for(const i of books){
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
}


function openPopUp(e){
  console.log(e);
  popUpDiv.classList.toggle('hidden');
}

function fetchValues(e){
  const title = form.elements['title'].value;
  const author = form.elements['author'].value;
  const pages = form.elements['pages'].value;
  const read = form.elements['read'].value;
  const newBook = new Book(title,author,pages,read);
  addBook(newBook);
  displayBooks();
  openPopUp();
  e.preventDefault();
}

form.addEventListener('submit', fetchValues);
newBook.addEventListener('click', openPopUp);


