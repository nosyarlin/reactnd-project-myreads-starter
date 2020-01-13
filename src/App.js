import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import { Route } from 'react-router-dom';
import SearchPage from './SearchPage';
import MyReadsPage from './MyReadsPage';
import * as Constants from './Constants';

class BooksApp extends React.Component {
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
    const shelfKeys = {};
    // Define key mappings
    shelfKeys[Constants.SHELVES.CURRENT_READING] = 'currentlyReading';
    shelfKeys[Constants.SHELVES.WANT_TO_READ] = 'wantToRead';
    shelfKeys[Constants.SHELVES.READ] = 'read';

    BooksAPI.update(bookToMove, shelfKeys[newShelf])
      .then(
        this.setState((prevState) => {
          const out = {};
          // Remove from previous shelf
          if (prevShelf !== Constants.SHELVES.NONE) {
            const prevShelfKey = shelfKeys[prevShelf];
            const shelfToRemove = prevState[prevShelfKey].filter(
              (book) => (book.title !== bookToMove.title)
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
      <div className="app">
        <Route exact path='/' render={() => (
            <MyReadsPage
              onSelectorChange={this.onSelectorChange}
              currentlyReading={currentlyReading}
              wantToRead={wantToRead}
              read={read}
            />
          )}
        />
        <Route exact path='/search' render={() => (
            <SearchPage onToggleSearch={this.toggleSearchPage}/> 
          )}
        />
      </div>
    )
  }
}

export default BooksApp
