import React from 'react'
import './App.css'
import { Route } from 'react-router-dom';
import SearchPage from './SearchPage';
import MyReadsPage from './MyReadsPage';
import * as BooksAPI from './BooksAPI';
import * as Constants from './Constants';

class BooksApp extends React.Component {
  state = {
    books: {},
  }

  onSelectorChange = (newShelf, bookToMove) => {
    BooksAPI.update(bookToMove, newShelf);
    if (newShelf !== Constants.SHELVES.NONE) {
      bookToMove.shelf = newShelf;
      this.setState((prevState) => {
        prevState.books[bookToMove.id] = bookToMove;
        return prevState;
      });
    } else {
      this.setState((prevState) => {
        delete prevState.books[bookToMove.id];
        return prevState;
      });
    }
  }

  componentDidMount() {
    BooksAPI.getAll()
    .then((books) => {
      const processedBooks = {};
      books.map((book) => (
        processedBooks[book.id] = book
      ))
      this.setState({
        books: processedBooks
      });
    });
  }

  render() {
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <MyReadsPage 
            shelvedBooks={this.state.books}
            onSelectorChange={this.onSelectorChange}
          />
        )}/>
        <Route exact path='/search' render={() => (
          <SearchPage 
            shelvedBooks={this.state.books}
            onSelectorChange={this.onSelectorChange}
          />
        )}/>
      </div>
    )
  }
}

export default BooksApp
