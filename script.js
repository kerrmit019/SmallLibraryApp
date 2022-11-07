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
  addNewBook(
    newBookTitle.value !== "" ? newBookTitle.value : "Title Unknown",
    newBookAuthor.value !== "" ? newBookAuthor.value : "Author Unknown",
    newBookNumPages.value !== "" ? newBookNumPages.value : "Unknown number of",
    newBookReadStatus.checked ? newBookReadStatus.value : "Want to Read"
  );
  e.preventDefault();
  addBookForm.reset();
});

// open modal on click of button
newBookButton.addEventListener("click", function () {
  console.log("Modal");
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

function Book(title, author, numPages, readStatus) {
  this.title = title;
  this.author = author;
  this.numPages = numPages;
  this.readStatus = readStatus;
}

Book.prototype.info = function () {
  return `${this.title} by ${this.author}, ${this.numPages} pages, ${this.readStatus}`;
};

Book.prototype.toggleReadStatus = function () {
  if (this.readStatus === "Read") {
    return (this.readStatus = "Want to Read");
  }

  return (this.readStatus = "Read");
};

function addNewBook(title, author, numPages, readStatus) {
  let newBook = new Book(title, author, numPages, readStatus);
  addBookToLibrary(newBook);
  displayLibrary();
}

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

// addBookToLibrary(theHobbit);
// console.log(myLibrary);
addBookToLibrary(theThousandAutumns);
// console.log(myLibrary);
addBookToLibrary(dune);
addBookToLibrary(theHobbit);

// displayLibrary();

// TODO Change displayLibrary() to just display library bookcards not create them
// TODO refactor aspects of displayLibrary() to create bookcard

// TODO remove deleteBook eventlistener from displayLibrary() and place outside

function displayLibrary() {
  // TODO this function is way too long needs a refactor later

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

  for (const book of myLibrary) {
    // console.log(book.title);
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
    booksContainer.appendChild(bookCard);
    bookCard.appendChild(bookDetails);
    bookDetails.appendChild(bookTitle);
    bookDetails.appendChild(bookAuthor);
    bookDetails.append(numPages);
    bookCard.append(readStatusButton);

    // bookCard.append(bookIcon);
    bookCard.append(deleteBookIcon);
    // add data-attribute so can delete later (Actually didn't use in my solution
    // but may use in a refactor)
    bookCard.setAttribute("data-index-number", myLibrary.indexOf(book));

    // add toggle readStatus functionality to button
    // TODO tidy this in refactor
    const toggleReadStatusButton = bookCard.querySelector(".readStatus");
    // console.log(toggleReadStatusButton);
    toggleReadStatusButton.addEventListener("click", function (e) {
      book.toggleReadStatus();
      // console.log(book.readStatus);
      // upodate button text
      readStatusButton.textContent = book.readStatus;
      readStatusButton.classList.toggle("wantToRead");
    });

    // TODO Move this outside of here
    // set up delete button event listener
    const deleteBookButton = bookCard.querySelector(".fa-trash-can");
    // Eventlistener delete book from library button
    deleteBookButton.addEventListener("click", function () {
      console.log(bookCard.dataset["indexNumber"]);
      removeBookFromLibrary(bookCard.dataset["indexNumber"]);
    });
  }
}

function removeBookFromLibrary(bookIndex) {
  console.log({ bookIndex });
  console.log("Book removed");
  if (bookIndex > 0) {
    myLibrary.splice(bookIndex, bookIndex);
  } else {
    myLibrary.splice(0, 1);
  }
  displayLibrary();
}
