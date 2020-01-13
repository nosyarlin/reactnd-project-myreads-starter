import React from 'react';
import PropTypes from 'prop-types';
import ShelfSelector from './ShelfSelector';

const Book = (props) => {
  const { onSelectorChange, book, shelf } = props;
  return (
    <div className="book">
      <div className="book-top">
        <div 
          className="book-cover"
          style={{backgroundImage: `url("${book.imageLinks.thumbnail}")`}} 
        >
        </div>
        <ShelfSelector
          selected={shelf}
          onSelectorChange={onSelectorChange}
          book={book}
        />
      </div>
      <div className="book-title">{book.title}</div>
      <div className="book-authors">{book.authors.join(', ')}</div>
    </div>
  );
}

Book.propTypes = {
  book: PropTypes.object.isRequired,
  shelf: PropTypes.string.isRequired,
  onSelectorChange: PropTypes.func.isRequired,
};

export default Book;
