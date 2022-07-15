// DOM
const booksContainer = document.querySelector(".booksContainer");
const addBookModalButton = document.querySelector("#addBookModalButton");
// Write a constructor for making “Book” objects. Your book objects should have the
//  book’s title, author, the number of pages, and whether or not you have read the book.

let myLibrary = [];

function Book(title, author, numPages, readStatus) {
  this.title = title;
  this.author = author;
  this.numPages = numPages;
  this.readStatus = readStatus;
}

Book.prototype.info = function () {
  return `${this.title} by ${this.author}, ${this.numPages} pages, ${this.readStatus}`;
};

function addBookToLibrary(Book) {
  myLibrary.push(Book);
}

const theHobbit = new Book("The Hobbit", "J.R.R. Tolkien", 295, "Read");
const theThousandAutumns = new Book(
  "The Thousand Autumns of Jacob de Zoet",
  "David Mitchell",
  538,
  "Want to Read"
);
const dune = new Book("Dune", "Frank Herbert", 412, "Read");

addBookToLibrary(theHobbit);
// console.log(myLibrary);
addBookToLibrary(theThousandAutumns);
// console.log(myLibrary);
addBookToLibrary(dune);

function displayLibrary() {
  for (const book of myLibrary) {
    // console.log(book.title);
    const bookCard = document.createElement("div");
    bookCard.classList.add("bookCard");
    const bookTitle = document.createElement("h3");
    bookTitle.classList.add("bookTitle");
    bookTitle.textContent = book.title;
    const bookAuthor = document.createElement("p");
    bookAuthor.classList.add("bookAuthor");
    bookAuthor.textContent = book.author;
    const numPages = document.createElement("p");
    numPages.classList.add("numPages");
    numPages.textContent = `${book.numPages} pages`;
    const readStatus = document.createElement("p");
    readStatus.classList.add("readStatus");
    readStatus.textContent = book.readStatus;
    const bookIcon = document.createElement("i");
    bookIcon.classList.add("fa-solid");
    bookIcon.classList.add("fa-book");
    booksContainer.appendChild(bookCard);
    bookCard.appendChild(bookTitle);
    bookCard.appendChild(bookAuthor);
    bookCard.append(numPages);
    bookCard.append(readStatus);
    bookCard.append(bookIcon);
  }
}

console.log(displayLibrary());
// console.log(theHobbit.info());
// console.log(theThousandAutumns.info());
// console.log(theHobbit.numPages);
// console.log(dune.info());
