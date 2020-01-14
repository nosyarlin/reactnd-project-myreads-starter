import React from 'react';
import PropTypes from 'prop-types';
import Book from './Book';

const BookGrid = (props) => {
  const { books, onSelectorChange } = props;
  return (
    <ol className="books-grid">
      {books.map((book) => (
        <li key={book.id}>
          <Book 
            book={book}
            onSelectorChange={onSelectorChange}
          />
        </li>
      ))}
    </ol>
  )
}

BookGrid.propTypes = {
  books: PropTypes.array.isRequired,
  onSelectorChange: PropTypes.func.isRequired,
}

export default BookGrid;
