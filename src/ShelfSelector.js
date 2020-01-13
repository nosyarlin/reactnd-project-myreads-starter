import React from 'react';
import PropTypes from 'prop-types';
import * as Constants from './Constants';

const ShelfSelector = (props) => {
  const { selected, onSelectorChange, book } = props;
  return (
    <div className="book-shelf-changer">
      <select 
        onChange={(event) => {
          onSelectorChange(selected, event.target.value, book);
        }}
        value={selected}
      >
        <option value="move" disabled>Move to...</option>
        {Object.keys(Constants.SHELVES_TO_HEADINGS).map((shelf) => (
          <option key={shelf} value={shelf}>
            {Constants.SHELVES_TO_HEADINGS[shelf]}
          </option>
        ))}
      </select>
    </div>
  )
}

ShelfSelector.propTypes = {
  selected: PropTypes.string.isRequired,
  onSelectorChange: PropTypes.func.isRequired,
  book: PropTypes.object.isRequired,
}

export default ShelfSelector;