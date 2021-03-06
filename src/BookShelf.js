import React from 'react';
import PropTypes from 'prop-types';
import BookGrid from './BookGrid';
import * as Constants from './Constants';

const BookShelf = (props) => {
  const { onSelectorChange, shelf, books } = props;
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">
        {Constants.SHELVES_TO_HEADINGS[shelf]}
      </h2>
      <div className="bookshelf-books">
        <BookGrid
          books={books}
          onSelectorChange={onSelectorChange}
        />
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