import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import BookShelf from './BookShelf';
import * as Constants from './Constants';
import * as BooksAPI from './BooksAPI'

class MyReadsPage extends Component {
  state = {
    currentlyReading: [],
    wantToRead: [],
    read: [],
  }

  componentDidMount() {
    BooksAPI.getAll()
      .then((books) => {
        const currentlyReading = books.filter(
          (book) => book.shelf === 'currentlyReading');
        const wantToRead = books.filter(
          (book) => book.shelf === 'wantToRead');
        const read = books.filter(
          (book) => book.shelf === 'read');
        this.setState({
          currentlyReading: currentlyReading,
          wantToRead: wantToRead,
          read: read,
        });        
      });
  }

  onSelectorChange = (prevShelf, newShelf, bookToMove) => {
    // Define key mappings
    const shelfKeys = {};
    shelfKeys[Constants.SHELVES.CURRENT_READING] = 'currentlyReading';
    shelfKeys[Constants.SHELVES.WANT_TO_READ] = 'wantToRead';
    shelfKeys[Constants.SHELVES.READ] = 'read';
    shelfKeys[Constants.SHELVES.NONE] = 'none';

    BooksAPI.update(bookToMove, shelfKeys[newShelf])
      .then(
        this.setState((prevState) => {
          const out = {};
          // Remove from previous shelf
          if (prevShelf !== Constants.SHELVES.NONE) {
            const prevShelfKey = shelfKeys[prevShelf];
            const shelfToRemove = prevState[prevShelfKey].filter(
              (book) => (book.id !== bookToMove.id)
            );
            out[prevShelfKey] = shelfToRemove;
          }
          // Add to new shelf
          if (newShelf !== Constants.SHELVES.NONE) {
            const newShelfKey = shelfKeys[newShelf];
            const shelfToAdd = prevState[newShelfKey].concat([bookToMove]);
            out[newShelfKey] = shelfToAdd;
          }
          return out;
        })
      );
  }

  render() {
    const { currentlyReading, wantToRead, read } = this.state;
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
              onSelectorChange={this.onSelectorChange}
            />
            <BookShelf 
              shelf={Constants.SHELVES.WANT_TO_READ} 
              books={wantToRead}
              onSelectorChange={this.onSelectorChange}
            />
            <BookShelf 
              shelf={Constants.SHELVES.READ} 
              books={read}
              onSelectorChange={this.onSelectorChange}
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