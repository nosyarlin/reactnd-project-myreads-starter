import React from 'react';
import * as Constants from './Constants';

const ShelveSelector = (props) => {
  return (
    <div className="book-shelf-changer">
      <select>
        <option value="move" disabled>Move to...</option>
        {Object.keys(Constants.SHELVES).map((key) => {
          const shelf = Constants.SHELVES[key];
          return shelf === props.selected
          ? <option value={key} selected>{shelf}</option>
          : <option value={key}>{shelf}</option>
        })}
      </select>
    </div>
  )
}

export default ShelveSelector;
