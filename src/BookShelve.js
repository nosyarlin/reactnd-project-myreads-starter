import React from 'react';
import PropTypes from 'prop-types';
import Book from './Book';

const BookShelve = (props) => {
  const { readingState, books } = props;
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{readingState}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {books.map((book) => (
            <li key={book.title}>
              <Book 
                title={book.title} 
                author={book.author} 
                coverStyle={book.coverStyle}
              />
            </li>
          ))}
        </ol>
      </div>
    </div>
  )
}

BookShelve.propTypes = {
  readingState: PropTypes.string.isRequired,
  books: PropTypes.array.isRequired,
};

export default BookShelve;