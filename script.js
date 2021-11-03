// Global Constants
const bookCase = document.querySelector('.book-case');
const submitButton = document.querySelector('.input-form > .submit');

// Global Variables
let books = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBook(){
  // some statements

}

function displayBooks(){
  // using of loop to access array easily
  for(const i of books){
    let insertBook = document.createElement('div');
    insertBook.textContent = 
    `Title: ${i.title} \n Author: ${i.author} \n Pages: ${i.pages}`;
    bookCase.appendChild(insertBook);
  }
}





