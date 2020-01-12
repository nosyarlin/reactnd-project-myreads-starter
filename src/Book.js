import React from 'react';
import PropTypes from 'prop-types';
import ShelveSelector from './ShelveSelector';

const Book = (props) => {
  const { title, author, coverStyle } = props;
  return (
    <div className="book">
      <div className="book-top">
        <div 
          className="book-cover" 
          style={coverStyle}>
        </div>
        <ShelveSelector/>
      </div>
      <div className="book-title">{title}</div>
      <div className="book-authors">{author}</div>
    </div>
  );
}

Book.propTypes = {
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  coverStyle: PropTypes.object.isRequired,
};

export default Book;
