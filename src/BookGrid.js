import React from 'react';
import PropTypes from 'prop-types';
import Book from './Book';

const BookGrid = (props) => {
  const { books, shelf, onSelectorChange } = props;
  return (
    <ol className="books-grid">
      {books.map((book) => (
        <li key={book.id}>
          <Book 
            book={book}
            shelf={shelf}
            onSelectorChange={onSelectorChange}
          />
        </li>
      ))}
    </ol>
  )
}

BookGrid.propTypes = {
  books: PropTypes.array.isRequired,
  shelf: PropTypes.string.isRequired,
  onSelectorChange: PropTypes.func.isRequired,
}

export default BookGrid;
