import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as Constants from './Constants';

class ShelfSelector extends Component {
  static propTypes = {
    selected: PropTypes.string.isRequired,
    onSelectorChange: PropTypes.func.isRequired,
    book: PropTypes.object.isRequired,
  }

  state = {
    selected: this.props.selected,
  }

  onSelectorChange = (prevSelected, newSelected, book) => {
    this.setState({ selected: newSelected });
    this.props.onSelectorChange(prevSelected, newSelected, book);
  }

  render() {
    const { book } = this.props;
    const { selected } = this.state;
    return (
      <div className="book-shelf-changer">
        <select 
          onChange={(event) => {
            this.onSelectorChange(selected, event.target.value, book);
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
}

export default ShelfSelector;