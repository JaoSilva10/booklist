
// Book Constructor

function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}


//UI Constructor
function UI() {}

UI.prototype.addBookToList = function(book){
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


UI.prototype.showAlert = function(message, className){

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
      }, 3000);

}


// Clear fields
UI.prototype.clearFields = function(){

    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
}


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

            ui.showAlert('Book added', 'sucess');

          //Clear fields
            ui.clearFields();

        }

    e.preventDefault();
});