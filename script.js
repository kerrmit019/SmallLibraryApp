// DOM
const booksContainer = document.querySelector(".booksContainer");
const newBookButton = document.querySelector("#newBookButton");
const newBookModal = document.querySelector("#newBookModal");
const noBooksPrompt = document.querySelector(".noBooks");

// DOM  MODAL FORM
const addBookForm = document.querySelector("#addBookForm");
const newBookTitle = document.querySelector("#newBookTitle");
const newBookAuthor = document.querySelector("#newBookAuthor");
const newBookNumPages = document.querySelector("#newBookNumPages");
const newBookReadStatus = document.querySelector("#newBookReadStatus");
const addBookModalButton = document.querySelector("#addBookModalButton");
const closeModalButton = document.querySelector(".modalClose");

// Write a constructor for making “Book” objects. Your book objects should have the
//  book’s title, author, the number of pages, and whether or not you have read the book.

//  EVENT LISTENERS
// Eventlistener for form add new book
addBookForm.addEventListener("submit", function (e) {
  console.log("Book Added");
  addNewBooktoLibrary(
    newBookTitle.value !== "" ? newBookTitle.value : "Title Unknown",
    newBookAuthor.value !== "" ? newBookAuthor.value : "Author Unknown",
    newBookNumPages.value !== "" ? newBookNumPages.value : "Unknown number of",
    newBookReadStatus.checked ? newBookReadStatus.value : "Want to Read"
  );
  displayLibrary();

  e.preventDefault();
  addBookForm.reset();
});

// open modal on click of button
newBookButton.addEventListener("click", function () {
  // console.log("Modal");
  newBookModal.style.display = "block";
});

// close the modal
closeModalButton.addEventListener("click", function () {
  newBookModal.style.display = "none";
});

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == newBookModal) {
    newBookModal.style.display = "none";
  }
};

// Set up Library  array and Book constructor

let myLibrary = [];
let bookCardIndex = 0;

function Book(title, author, numPages, readStatus) {
  this.title = title;
  this.author = author;
  this.numPages = numPages;
  this.readStatus = readStatus;
}

// Book.prototype.info = function () {
//   return `${this.title} by ${this.author}, ${this.numPages} pages, ${this.readStatus}`;
// };

Book.prototype.toggleReadStatus = function () {
  if (this.readStatus === "Read") {
    return (this.readStatus = "Want to Read");
  }

  return (this.readStatus = "Read");
};

function addNewBooktoLibrary(title, author, numPages, readStatus) {
  let newBook = new Book(title, author, numPages, readStatus);
  myLibrary.push(createBookCard(newBook));
}

function createBookCard(book) {
  const bookCard = document.createElement("div");
  bookCard.classList.add("bookCard");
  const bookDetails = document.createElement("div");
  bookDetails.classList.add("bookDetails");
  const bookTitle = document.createElement("h3");
  bookTitle.classList.add("bookTitle");
  bookTitle.textContent = book.title;
  const bookAuthor = document.createElement("p");
  bookAuthor.classList.add("bookAuthor");
  bookAuthor.textContent = `by  ${book.author}`;
  const numPages = document.createElement("p");
  numPages.classList.add("numPages");
  numPages.textContent = `${book.numPages} pages`;
  const readStatusButton = document.createElement("button");
  readStatusButton.classList.add("readStatus");
  readStatusButton.textContent = book.readStatus;

  // so can assign different colours to buttons read/want to read
  if (book.readStatus === "Want to Read") {
    readStatusButton.classList.add("wantToRead");
  }

  // const bookIcon = document.createElement("i");
  // bookIcon.classList.add("fa-solid");
  // bookIcon.classList.add("fa-book");
  const deleteBookIcon = document.createElement("i");
  deleteBookIcon.classList.add("fa-solid");
  deleteBookIcon.classList.add("fa-trash-can");
  // booksContainer.appendChild(bookCard);
  bookCard.appendChild(bookDetails);
  bookDetails.appendChild(bookTitle);
  bookDetails.appendChild(bookAuthor);
  bookDetails.append(numPages);
  bookCard.append(readStatusButton);

  // bookCard.append(bookIcon);
  bookCard.append(deleteBookIcon);
  bookCard.setAttribute("data-index-number", bookCardIndex);
  bookCardIndex++;

  // add toggle readStatus functionality to button
  const toggleReadStatusButton = bookCard.querySelector(".readStatus");
  // console.log(toggleReadStatusButton);
  toggleReadStatusButton.addEventListener("click", function (e) {
    book.toggleReadStatus();
    // console.log(book.readStatus);
    // upodate button text
    readStatusButton.textContent = book.readStatus;
    readStatusButton.classList.toggle("wantToRead");
  });

  // set up delete button event listener
  const deleteBookButton = bookCard.querySelector(".fa-trash-can");
  // Eventlistener delete book from library button
  deleteBookButton.addEventListener("click", function () {
    console.log(bookCard.dataset["indexNumber"]);
    removeBookFromLibrary(bookCard.dataset["indexNumber"]);
  });

  return bookCard;
}

// addNewBooktoLibrary("The Hobbit", "J.R.R. Tolkien", 295, "Read");
// addNewBooktoLibrary(
//   "The Thousand Autumns of Jacob de Zoet",
//   "David Mitchell",
//   538,
//   "Want to Read"
// );
// addNewBooktoLibrary("Dune", "Frank Herbert", 412, "Read");

function displayLibrary() {
  //   clear BooksContainer of bookCards if any
  const bookCards = document.querySelectorAll(".bookCard");

  bookCards.forEach((bookCard) => {
    booksContainer.removeChild(bookCard);
  });

  // if library empty then display place holder
  if (myLibrary.length !== 0) {
    noBooksPrompt.style.display = "none";
  } else {
    noBooksPrompt.style.display = "block";
  }
  //   display library
  // console.log(myLibrary);

  for (const book of myLibrary) {
    booksContainer.append(book);
  }
}

function removeBookFromLibrary(bookIndex) {
  console.log({ bookIndex });
  console.log("Book removed");
  // const searchIndex = carList.findIndex((car) => car.model=="X5");
  const bookToDeleteIndex = myLibrary.findIndex(
    (book) => book.dataset.indexNumber === bookIndex
  );

  if (bookToDeleteIndex > 0) {
    myLibrary.splice(bookToDeleteIndex, bookToDeleteIndex);
  } else {
    myLibrary.splice(0, 1);
  }

  displayLibrary();
}
