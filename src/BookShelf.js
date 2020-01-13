import React from 'react';
import PropTypes from 'prop-types';
import Book from './Book';

const BookShelf = (props) => {
  const { onSelectorChange, shelf, books } = props;
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{shelf}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {books.map((book) => (
            <li key={book.title}>
              <Book 
                book={book}
                shelf={shelf}
                onSelectorChange={onSelectorChange}
              />
            </li>
          ))}
        </ol>
      </div>
    </div>
  )
}

BookShelf.propTypes = {
  shelf: PropTypes.string.isRequired,
  books: PropTypes.array.isRequired,
  onSelectorChange: PropTypes.func.isRequired,
};

export default BookShelf;