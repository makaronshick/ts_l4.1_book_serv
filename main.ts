enum Gender {
    male = "male",
    female = "female",
}

interface IAuthor {
    authorId: number;
    name: string;
    gender: string;
}

interface IBook {
    bookId: number;
    authorId: number;
    title: string;
    genre: string;
    numberOfPages: number;
}

interface IBookService {
    books: IBook[];
    authors: IAuthor[];
    getBooks(): IBook[];                                    // - отримання всіх доступних книг
    getBookById(bookId: number): IBook | undefined;         // - отримання книги за ідентифікатором
    getAuthors(): IAuthor[];                                // - отримання всіх авторів
    getAuthorById(authorId: number): IAuthor | undefined;   // - отримання автора за ідентифікатором
    getBooksByAuthor(author: number | string): IBook[];     // - отримання книг за ідентифікатором автора або за його ім'ям
    getAuthorByBookId(bookId: number): IAuthor | undefined; // - отримання автора за ідентифікатором книги
    search(query: string): IBook[] | undefined;             // - глобальний пошук за назвою книги, жанром, автором
}

class Author implements IAuthor {
    authorId: number = Date.now();
    name: string;
    gender: string;

    constructor(name: string, gender: string) {
        this.name = name;
        this.gender = gender;
    }
}

class Book implements IBook {
    bookId: number = Date.now();
    authorId: number = Date.now() + 777;
    title: string;
    genre: string;
    numberOfPages: number;

    constructor(authorId: number, title: string, genre: string, numberOfPages: number) {
        this.authorId = authorId;
        this.title = title;
        this.genre = genre;
        this.numberOfPages = numberOfPages;
    }
}

class BookService implements IBookService {
    books: IBook[] = [
        { bookId: 1735150365917, authorId: 1735150365888, title: "1984", genre: "Fantasy", numberOfPages: 245 },
        { bookId: 1735150365918, authorId: 1735150365777, title: "Roadside Picnic", genre: "Fantasy", numberOfPages: 377 },
        { bookId: 1735150365919, authorId: 1735150365555, title: "It", genre: "Horror", numberOfPages: 650 },
    ];
    authors: IAuthor[] = [
        { authorId: 1735150365888, name: "George Orwell", gender: Gender.male },
        { authorId: 1735150365777, name: "Arkady and Boris Strugatsky", gender: Gender.male },
        { authorId: 1735150365555, name: "Stephen King", gender: Gender.male },
    ];

    getBooks(): IBook[] {
        return this.books;
    }

    getBookById(bookId: number): IBook | undefined {
        return this.books.find(book => book.bookId === bookId);
    }

    getAuthors(): IAuthor[] {
        return this.authors;
    }

    getAuthorById(authorId: number): IAuthor | undefined {
        return this.authors.find(author => author.authorId === authorId);
    }

    getBooksByAuthor(author: number | string): IBook[] {
        if (typeof author === "number") {
            return this.books.filter(book => book.authorId === author);
        }

        const foundAuthor = this.authors.find(a => a.name.toLowerCase() === author.toLowerCase());
        return foundAuthor ? this.books.filter(book => book.authorId === foundAuthor.authorId) : [];
    }

    getAuthorByBookId(bookId: number): IAuthor | undefined {
        const book = this.getBookById(bookId);
        return book ? this.getAuthorById(book.authorId) : undefined;
    }

    search(query: string): IBook[] | undefined {
        const lowerQuery = query.toLowerCase();
        const result = this.books.filter(book =>
            book.title.toLowerCase().includes(lowerQuery) ||
            book.genre.toLowerCase().includes(lowerQuery) ||
            this.authors.some(author =>
                author.authorId === book.authorId && author.name.toLowerCase().includes(lowerQuery)
            )
        );

        return result.length > 0 ? result : undefined;
    }
}

const bookService = new BookService();

console.log('All books => ', bookService.getBooks());
console.log('Book with id 1735150365919 => ', bookService.getBookById(1735150365919));
console.log('All authors => ', bookService.getAuthors());
console.log('Author with id 1735150365888 => ', bookService.getAuthorById(1735150365888));
console.log('Books by author with name Stephen King => ', bookService.getBooksByAuthor("Stephen King"));
console.log('Books with author with id 1735150365555 => ', bookService.getBooksByAuthor(1735150365555));
console.log('Author with book with id 1735150365919 => ', bookService.getAuthorByBookId(1735150365919));
console.log('Books with genre Fantasy => ', bookService.search("Fantasy"));
console.log('Books with title 1984 => ', bookService.search("1984"));
console.log('Books with Ololo (undefined expected) => ', bookService.search("Ololo"));
