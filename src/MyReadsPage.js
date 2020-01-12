import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import BookShelve from './BookShelve';

class MyReadsPage extends Component {
  render() {
    const { booksCurrentlyReading, booksWantToRead, booksRead } = this.props;
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <BookShelve readingState="Currently Reading" books={booksCurrentlyReading}/>
            <BookShelve readingState="Want to Read" books={booksWantToRead}/>
            <BookShelve readingState="Read" books={booksRead}/>
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