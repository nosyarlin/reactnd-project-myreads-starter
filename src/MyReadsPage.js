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
        this.setState((prevState) => {
          books.map((book) => (
            prevState[book.shelf].push(book)
          ));
          return prevState;
        });        
      });
  }

  onSelectorChange = (prevShelf, newShelf, bookToMove) => {
    BooksAPI.update(bookToMove, newShelf)
      .then(
        this.setState((prevState) => {
          const out = {};
          // Remove from previous shelf
          if (prevShelf !== Constants.SHELVES.NONE) {
            const shelfToRemove = prevState[prevShelf].filter(
              (book) => (book.id !== bookToMove.id)
            );
            out[prevShelf] = shelfToRemove;
          }
          // Add to new shelf
          if (newShelf !== Constants.SHELVES.NONE) {
            const shelfToAdd = prevState[newShelf].concat([bookToMove]);
            out[newShelf] = shelfToAdd;
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