var Gender;
(function (Gender) {
    Gender["male"] = "male";
    Gender["female"] = "female";
})(Gender || (Gender = {}));
var Author = /** @class */ (function () {
    function Author(name, gender) {
        this.authorId = Date.now();
        this.name = name;
        this.gender = gender;
    }
    return Author;
}());
var Book = /** @class */ (function () {
    function Book(authorId, title, genre, numberOfPages) {
        this.bookId = Date.now();
        this.authorId = Date.now() + 777;
        this.authorId = authorId;
        this.title = title;
        this.genre = genre;
        this.numberOfPages = numberOfPages;
    }
    return Book;
}());
var BookService = /** @class */ (function () {
    function BookService() {
        this.books = [
            { bookId: 1735150365917, authorId: 1735150365888, title: "1984", genre: "Fantasy", numberOfPages: 245 },
            { bookId: 1735150365918, authorId: 1735150365777, title: "Roadside Picnic", genre: "Fantasy", numberOfPages: 377 },
            { bookId: 1735150365919, authorId: 1735150365555, title: "It", genre: "Horror", numberOfPages: 650 },
        ];
        this.authors = [
            { authorId: 1735150365888, name: "George Orwell", gender: Gender.male },
            { authorId: 1735150365777, name: "Arkady and Boris Strugatsky", gender: Gender.male },
            { authorId: 1735150365555, name: "Stephen King", gender: Gender.male },
        ];
    }
    BookService.prototype.getBooks = function () {
        return this.books;
    };
    BookService.prototype.getBookById = function (bookId) {
        return this.books.find(function (book) { return book.bookId === bookId; });
    };
    BookService.prototype.getAuthors = function () {
        return this.authors;
    };
    BookService.prototype.getAuthorById = function (authorId) {
        return this.authors.find(function (author) { return author.authorId === authorId; });
    };
    BookService.prototype.getBooksByAuthor = function (author) {
        if (typeof author === "number") {
            return this.books.filter(function (book) { return book.authorId === author; });
        }
        var foundAuthor = this.authors.find(function (a) { return a.name.toLowerCase() === author.toLowerCase(); });
        return foundAuthor ? this.books.filter(function (book) { return book.authorId === foundAuthor.authorId; }) : [];
    };
    BookService.prototype.getAuthorByBookId = function (bookId) {
        var book = this.getBookById(bookId);
        return book ? this.getAuthorById(book.authorId) : undefined;
    };
    BookService.prototype.search = function (query) {
        var _this = this;
        var lowerQuery = query.toLowerCase();
        var result = this.books.filter(function (book) {
            return book.title.toLowerCase().includes(lowerQuery) ||
                book.genre.toLowerCase().includes(lowerQuery) ||
                _this.authors.some(function (author) {
                    return author.authorId === book.authorId && author.name.toLowerCase().includes(lowerQuery);
                });
        });
        return result.length > 0 ? result : undefined;
    };
    return BookService;
}());
var bookService = new BookService();
console.log('All books => ', bookService.getBooks());
console.log('Book with id 1735150365917 => ', bookService.getBookById(1735150365919));
console.log('All authors => ', bookService.getAuthors());
console.log('Author with id 1735150365888 => ', bookService.getAuthorById(1735150365888));
console.log('Books by author with name Stephen King => ', bookService.getBooksByAuthor("Stephen King"));
console.log('Books with author with id 1735150365555 => ', bookService.getBooksByAuthor(1735150365555));
console.log('Author with book with id 1735150365919 => ', bookService.getAuthorByBookId(1735150365919));
console.log('Books with genre Horror => ', bookService.search("Fantasy"));
console.log('Books with title 1984 => ', bookService.search("1984"));
console.log('Books with Ololo (undefined expected) => ', bookService.search("Ololo"));
