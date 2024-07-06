const clog   = console.log
const cerr   = console.error
const select = (selector) => document.querySelector(selector)

function spawnTemplate(template_selector, wrapperElement="div", className="", parent=document.body) {
  const templateFragment  = document.importNode(select(template_selector).content, true) // the true is SOOOO important!
  const wrapper           = document.createElement(wrapperElement)
  wrapper.className       = className
  wrapper.appendChild(templateFragment)
  wrapper.addEventListener

  // dbg
  // endbg
  parent.appendChild(wrapper)
  return wrapper
}


class Book {
  static book_list = new Map()
  static library   = null      // spawnTemplate('#template_library', 'div', 'library')

  constructor(title="example title", author="example author") {

    if (Book.book_list . has(title)) {
      cerr(`book ${title} exists already!`)
      return
    }

    this.title    = title
    this.author   = author
    Book.book_list.set(title, this)
  }

  spawnBook() {
    // P.S: don't call this method, only the renderBooks static method can call this
    const bookDiv = spawnTemplate('#template_book_view', 'div', 'book_view', Book.library)
  
    bookDiv . querySelector('.book_delete') . addEventListener('click', e => {
      this.removeBook()
      cerr(`removed book: ${this.title}, is the corresponding div still there ?`)
    })

    // filling the div with data
    bookDiv . querySelector('.book_title') . innerText  = this.title
    bookDiv . querySelector('.book_author') . innerText = this.author
  }

  removeBook() {
    Book.book_list.delete(this.title)
    Book.renderBooks()                // re-render the book list
  }

  static renderBooks() {
    if (Book.library) {
      Book.library.remove()  // removing old one
    }

    Book.library = spawnTemplate('#template_library', 'div', 'library')

    for (let book of Book.book_list.keys()) {
      Book.book_list.get(book).spawnBook()
    }
  }
}

new Book('Catcher', 'salinger') // adding a book example
new Book()

Book.renderBooks()