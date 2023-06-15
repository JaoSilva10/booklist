

class Book{
  constructor(title, author, isbn){
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}


class UI{

  addBookToList(book) {

    const list = document.getElementById('book-list');

      //Create a tr element
      const row = document.createElement('tr');
      //Insert cols
      row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="delete">X</a></td>
      `;

      list.appendChild(row);

  }

  showAlert(message, className) {

        // Create div
      const div = document.createElement('div');

      // Add classes
      div.className = `alert ${className}`;

      // Add text
      div.appendChild(document.createTextNode(message));

      //Get parent
      const container = document.querySelector('.container'),
            form = document.getElementById('book-form');

            // Insert alert
            container.insertBefore(div, form);

            // Timeout after 3 seconds
          setTimeout(function(){
            document.querySelector('.alert').remove();
          }, 1500);


  }

  deleteBook(target) {
    if(target.className === 'delete') {
      target.parentElement.parentElement.remove();
    }
  }

  clearFields() {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
  }

}


// Local storage class

class Store {


  static getBooks() {

    let books;
    if( localStorage.getItem('books') === null) {
       books = [];
    } else {
        books = JSON.parse(localStorage.getItem('books'));
    }

    return books; 
  }


  static displayBooks() {

    const books = Store.getBooks();

    books.forEach(function(book){

      const ui = new UI();

      ui.addBookToList(book);
  
    });

  }


  static addBook(book) {

    const books = Store.getBooks();


    books.push(book);

    // possivel erro aqui
    localStorage.setItem('books', JSON.stringify(books));


  }

  static removeBook(isbn) {
      
    const books = Store.getBooks();

    books.forEach(function(book, index){

      if(book.isbn === isbn) {
        books.splice(index, 1);
      }
  
    });

    localStorage.setItem('books', JSON.stringify(books));


  }
}


// DOM Load event

document.addEventListener('DOMContentLoaded', Store.displayBooks);



// Event listener for add book
document.getElementById('book-form').addEventListener('submit', 
function(e){

  //get form values
  const title = document.getElementById('title').value,
        author = document.getElementById('author').value,
        isbn = document.getElementById('isbn').value;

        // Instantiate a book
        const book = new Book(title, author, isbn);

        // Instantiate UI
        const ui = new UI();


        //Validate
        if(title === '' || author === '' || isbn === '') {

          ui.showAlert('Please fill in all fields', 'error');

        } else {
          // Add book to list
            ui.addBookToList(book);

            // Add to local storage
            Store.addBook(book);

            ui.showAlert('Book added', 'sucess');

          //Clear fields
            ui.clearFields();

        }

e.preventDefault();

});


// Event listener for delete
document.getElementById('book-list').addEventListener('click', function(e){

  // Instantiate UI
  const ui = new UI();

  ui.deleteBook(e.target);

  // Remove from local storage

  Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

  ui.showAlert('book deleted', 'error');


  e.preventDefault();
});