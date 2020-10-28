document.getElementById('submit-button').addEventListener('click', function() {
    const genre = document.getElementById('genre-input').value;
    fetchBook(genre);
})

function appendBookToDom(title, author, cover) {
    const titleH1 = document.createElement('h3')
    titleH1.textContent = title
    document.querySelector('#display-book').append(titleH1)
  
    const coverImg = document.createElement('img')
    coverImg.src = cover
    coverImg.alt = title
    document.querySelector('#display-book').append(coverImg)
  
    const authorDiv = document.createElement('div')
    authorDiv.textContent = `By: ${author}`
    document.querySelector('#display-book').append(authorDiv)
  }

function fetchBook(genre) {
    fetch(`http://openlibrary.org/subjects/${genre}.json`)
    .then((res) => res.json())
    .then((json) => {
        const randomBook = getRandomBook(json.works)
        const title = randomBook.title
        const author = getAuthor(randomBook);
        const cover = `http://covers.openlibrary.org/b/ID/${randomBook.cover_id}-L.jpg`
        

        console.log(title);
        console.log(author);
        console.log(cover);

        appendBookToDom(title, author, cover);
    })
}

function getRandomBook(books) {
    const randomIndex = Math.floor(Math.random() * books.length)
    return books[randomIndex]
}

function getAuthor(book) {
    return book.authors[0].name
}