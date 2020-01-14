import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import BookShelf from './BookShelf';
import * as Constants from './Constants';

class MyReadsPage extends Component {
  static propTypes = {
    shelvedBooks: PropTypes.object.isRequired,
    onSelectorChange: PropTypes.func.isRequired,
  }

  state = {
    currentlyReading: [],
    wantToRead: [],
    read: [],
  }

  static getDerivedStateFromProps(props, state) {
    state = {
      currentlyReading: [],
      wantToRead: [],
      read: [],
    }
    Object.values(props.shelvedBooks).map((book) => (
      state[book.shelf].push(book)
    ));
    return state;
  }

  render() {
    const { currentlyReading, wantToRead, read } = this.state;
    const { onSelectorChange } = this.props;
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <BookShelf 
              shelf={Constants.SHELVES.CURRENTLY_READING} 
              books={currentlyReading}
              onSelectorChange={onSelectorChange}
            />
            <BookShelf 
              shelf={Constants.SHELVES.WANT_TO_READ} 
              books={wantToRead}
              onSelectorChange={onSelectorChange}
            />
            <BookShelf 
              shelf={Constants.SHELVES.READ} 
              books={read}
              onSelectorChange={onSelectorChange}
            />
          </div>
        </div>
        <div className="open-search">
          <Link to='/search'>Add a book</Link>
        </div>
      </div>
    )
  }
}

export default MyReadsPage;