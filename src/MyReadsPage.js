import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import BookShelf from './BookShelf';
import * as Constants from './Constants';

class MyReadsPage extends Component {
  render() {
    const { onSelectorChange, currentlyReading, wantToRead, read } = this.props;
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <BookShelf 
              shelf={Constants.SHELVES.CURRENT_READING} 
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