class allBooks {
  constructor(id, title, author) {
    this.id = id;
    this.title = title;
    this.author = author;
  }

  static getBooks() {
    return JSON.parse(localStorage.getItem('books'))
      ? JSON.parse(localStorage.getItem('books'))
      : [];
  }

  static getBook() {
    const books = allBooks.getBooks();
    const booksCount = books.length;
    const lastBook = booksCount - 1;
    const AddedBook = books[lastBook]?.id
      ? books[lastBook].id
      : 0;
    return AddedBook + 1;
  }

  static displayBooks() {
    const booksStore = document.querySelector('.books-list');
    const bookData = allBooks.getBooks();
    if (bookData.length) {
      const listOfBooks = bookData
        .map(
          (book) => `<div id="book_id" class="book">
        <div class="title-and-author">
        <div class="book-title">${book.title} by</div>
        <div class="book-author">${book.author}</div>
        </div>
        <br />
        <div class="remove_book-btn__container">
        <button onclick="allBooks.removeBook(${book.id});" class="remove_book-btn">Remove</button>
        </div>
        </div><hr>`,
        )
        .join('');
      booksStore.innerHTML = listOfBooks;
    } else {
      booksStore.innerHTML = ' <span class="text-center"><i> Please Add a Book</i></span>';
    }
  }

    static localStorage(a, b) {
      localStorage.setItem(a, JSON.stringify(b));
      allBooks.displayBooks();
    }
  
    static addBook(bookItem) {
      const bookData = allBooks.getBooks();
      bookData.push(bookItem);
      allBooks.localStorage('books', bookData);
    }
  
    static removeBook(id) {
      const bookData = allBooks.getBooks();
      const filteredBooks = bookData.filter((item) => item.id !== id);
  
      allBooks.localStorage('books', filteredBooks);
    }
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    allBooks.displayBooks();
  });
  
  document.getElementById('add-book-form').addEventListener('submit', (e) => {
    e.preventDefault();
  
    const bookId = allBooks.getBook();
    const bookObject = new allBooks(
      bookId,
      document.getElementById('title').value,
      document.getElementById('author').value,
    );
    allBooks.addBook(bookObject);
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
  });
  
  const navItems = document.getElementsByClassName('nav-item');
  for (let i = 0; i < navItems.length; i += 1) {
    navItems[i].addEventListener('click', function () {
      const current = document.getElementsByClassName('active');
      current[0].className = current[0]?.className?.replace(' active', '');
      this.className += ' active';
    });
  }
  
  function toggleSection(domId) {
    if (domId === 'books-list') {
      document.getElementById('add-books').style.display = 'none';
      document.getElementById('contact').style.display = 'none';
      document.getElementById('books-list').style.display = 'block';
    }
  
    if (domId === 'add-books') {
      document.getElementById('books-list').style.display = 'none';
      document.getElementById('contact').style.display = 'none';
      document.getElementById('add-books').style.display = 'flex';
    }
  
    if (domId === 'contact') {
      document.getElementById('books-list').style.display = 'none';
      document.getElementById('add-books').style.display = 'none';
      document.getElementById('contact').style.display = 'block';
    }
  }
  