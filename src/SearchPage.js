import React from 'react';
import { Link } from 'react-router-dom';
import BookGrid from './BookGrid';
import * as BooksAPI from './BooksAPI';
import * as Constants from './Constants';

class SearchPage extends React.Component {
  state = {
    books: []
  }

  onSearch = (event) => {
    BooksAPI.search(event.target.value)
      .then((books) => this.setState({
        books: Array.isArray(books) ? books : [],
      }));
  }

  onSelectorChange = (prevShelf, newShelf, bookToMove) => {
    // Define key mappings
    const shelfKeys = {};
    shelfKeys[Constants.SHELVES.CURRENT_READING] = 'currentlyReading';
    shelfKeys[Constants.SHELVES.WANT_TO_READ] = 'wantToRead';
    shelfKeys[Constants.SHELVES.READ] = 'read';
    shelfKeys[Constants.SHELVES.NONE] = 'none';

    BooksAPI.update(bookToMove, shelfKeys[newShelf]);
  }

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to='/'>Close</Link>
          <div className="search-books-input-wrapper">
            <input 
              type="text"
              placeholder="Search by title or author"
              onChange={this.onSearch}
            />
          </div>
        </div>
        <div className="search-books-results">
          <BookGrid
            books={this.state.books}
            shelf={Constants.SHELVES.NONE}
            onSelectorChange={this.onSelectorChange}
          />
        </div>
      </div>
    );
  }
}

export default SearchPage;
