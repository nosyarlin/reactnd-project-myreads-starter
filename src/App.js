import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import { Route } from 'react-router-dom';
import SearchPage from './SearchPage';
import MyReadsPage from './MyReadsPage';
import * as Constants from './Constants';

class BooksApp extends React.Component {
  state = {
    booksCurrentlyReading: [],
    booksWantToRead: [],
    booksRead: [],
  }

  componentDidMount() {
    BooksAPI.getAll()
      .then((books) => {
        const booksCurrentlyReading = books.filter(
          (book) => book.shelf === 'currentlyReading');
        const booksWantToRead = books.filter(
          (book) => book.shelf === 'wantToRead');
        const booksRead = books.filter(
          (book) => book.shelf === 'read');
        this.setState({
          booksCurrentlyReading: booksCurrentlyReading,
          booksWantToRead: booksWantToRead,
          booksRead: booksRead,
        });
        console.log(booksRead);
      });
  }

  onSelectorChange = (prevShelf, newShelf, bookToMove) => {
    const shelfKeys = {};
    // Define key mappings
    shelfKeys[Constants.SHELVES.CURRENT_READING] = 'booksCurrentlyReading';
    shelfKeys[Constants.SHELVES.WANT_TO_READ] = 'booksWantToRead';
    shelfKeys[Constants.SHELVES.READ] = 'booksRead';

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
    });
  }

  render() {
    const { booksCurrentlyReading, booksWantToRead, booksRead } = this.state;
    return (
      <div className="app">
        <Route exact path='/' render={() => (
            <MyReadsPage
              onSelectorChange={this.onSelectorChange}
              booksCurrentlyReading={booksCurrentlyReading}
              booksWantToRead={booksWantToRead}
              booksRead={booksRead}
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
