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

const theHobbit = new Book("The Hobbit", "J.R.R. Tolkien", 295, "read");
const theThousandAutumns = new Book(
  "The Thousand Autumns of Jacob de Zoet",
  "David Mitchell",
  538,
  "not read yet"
);

addBookToLibrary(theHobbit);
// console.log(myLibrary);
addBookToLibrary(theThousandAutumns);
// console.log(myLibrary);

function displayLibrary() {
  for (const book of myLibrary) {
    console.log(book.title);
  }
}

console.log(displayLibrary());
// console.log(theHobbit.info());
// console.log(theThousandAutumns.info());
// console.log(theHobbit.numPages);
