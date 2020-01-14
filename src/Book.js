import React from 'react';
import PropTypes from 'prop-types';
import ShelfSelector from './ShelfSelector';

const Book = (props) => {
  const { onSelectorChange, book } = props;
  const coverURL = book.imageLinks ? book.imageLinks.thumbnail : '';
  const authors = book.authors ? book.authors.join(', ') : '';
  return (
    <div className="book">
      <div className="book-top">
        <div 
          className="book-cover"
          style={{backgroundImage: `url("${coverURL}")`}} 
        >
        </div>
        <ShelfSelector
          selected={book.shelf}
          onSelectorChange={onSelectorChange}
          book={book}
        />
      </div>
      <div className="book-title">{book.title}</div>
      <div className="book-authors">{authors}</div>
    </div>
  );
}

Book.propTypes = {
  book: PropTypes.object.isRequired,
  onSelectorChange: PropTypes.func.isRequired,
};

export default Book;
