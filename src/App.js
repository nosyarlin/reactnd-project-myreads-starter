import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import { Route } from 'react-router-dom';
import SearchPage from './SearchPage';
import MyReadsPage from './MyReadsPage';
import * as Constants from './Constants';

class BooksApp extends React.Component {
  state = {
    booksCurrentlyReading: [
      {
        author: 'Harper Lee',
        title: 'To Kill a Mockingbird',
        coverStyle: { width: 128, height: 193, backgroundImage: 'url("http://books.google.com/books/content?id=PGR2AwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73-GnPVEyb7MOCxDzOYF1PTQRuf6nCss9LMNOSWBpxBrz8Pm2_mFtWMMg_Y1dx92HT7cUoQBeSWjs3oEztBVhUeDFQX6-tWlWz1-feexS0mlJPjotcwFqAg6hBYDXuK_bkyHD-y&source=gbs_api")' },
      },
      {
        author: 'Orson Scott Card',
        title: 'Ender\'s Game',
        coverStyle: { width: 128, height: 188, backgroundImage: 'url("http://books.google.com/books/content?id=yDtCuFHXbAYC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72RRiTR6U5OUg3IY_LpHTL2NztVWAuZYNFE8dUuC0VlYabeyegLzpAnDPeWxE6RHi0C2ehrR9Gv20LH2dtjpbcUcs8YnH5VCCAH0Y2ICaKOTvrZTCObQbsfp4UbDqQyGISCZfGN&source=gbs_api")' },
      },
    ],
    booksWantToRead: [
      {
        author: 'David McCullough',
        title: '1776',
        coverStyle: { width: 128, height: 193, backgroundImage: 'url("http://books.google.com/books/content?id=uu1mC6zWNTwC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73pGHfBNSsJG9Y8kRBpmLUft9O4BfItHioHolWNKOdLavw-SLcXADy3CPAfJ0_qMb18RmCa7Ds1cTdpM3dxAGJs8zfCfm8c6ggBIjzKT7XR5FIB53HHOhnsT7a0Cc-PpneWq9zX&source=gbs_api")' },
      },
      {
        author: 'J.K. Rowling',
        title: 'Harry Potter and the Sorcerer\'s Stone',
        coverStyle: { width: 128, height: 192, backgroundImage: 'url("http://books.google.com/books/content?id=wrOQLV6xB-wC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72G3gA5A-Ka8XjOZGDFLAoUeMQBqZ9y-LCspZ2dzJTugcOcJ4C7FP0tDA8s1h9f480ISXuvYhA_ZpdvRArUL-mZyD4WW7CHyEqHYq9D3kGnrZCNiqxSRhry8TiFDCMWP61ujflB&source=gbs_api")' },
      },
    ],
    booksRead: [
      {
        author: 'J.R.R. Tolkien',
        title: 'The Hobbit',
        coverStyle: { width: 128, height: 192, backgroundImage: 'url("http://books.google.com/books/content?id=pD6arNyKyi8C&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE70Rw0CCwNZh0SsYpQTkMbvz23npqWeUoJvVbi_gXla2m2ie_ReMWPl0xoU8Quy9fk0Zhb3szmwe8cTe4k7DAbfQ45FEzr9T7Lk0XhVpEPBvwUAztOBJ6Y0QPZylo4VbB7K5iRSk&source=gbs_api")' },
      },
      {
        author: 'Seuss',
        title: 'Oh, the Places You\'ll Go!',
        coverStyle: { width: 128, height: 174, backgroundImage: 'url("http://books.google.com/books/content?id=1q_xAwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE712CA0cBYP8VKbEcIVEuFJRdX1k30rjLM29Y-dw_qU1urEZ2cQ42La3Jkw6KmzMmXIoLTr50SWTpw6VOGq1leINsnTdLc_S5a5sn9Hao2t5YT7Ax1RqtQDiPNHIyXP46Rrw3aL8&source=gbs_api")' },
      },
      {
        author: 'Mark Twain',
        title: 'The Adventures of Tom Sawyer',
        coverStyle: { width: 128, height: 192, backgroundImage: 'url("http://books.google.com/books/content?id=32haAAAAMAAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72yckZ5f5bDFVIf7BGPbjA0KYYtlQ__nWB-hI_YZmZ-fScYwFy4O_fWOcPwf-pgv3pPQNJP_sT5J_xOUciD8WaKmevh1rUR-1jk7g1aCD_KeJaOpjVu0cm_11BBIUXdxbFkVMdi&source=gbs_api")' },
      }
    ],
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
