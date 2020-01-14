import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import BookGrid from './BookGrid';
import * as BooksAPI from './BooksAPI';
import * as Constants from './Constants';

class SearchPage extends React.Component {
  static propTypes = {
    shelvedBooks: PropTypes.object.isRequired,
    onSelectorChange: PropTypes.func.isRequired,
  }

  state = {
    results: [],
  }

  onSearch = (event) => {
    const { shelvedBooks } = this.props;
    BooksAPI.search(event.target.value)
    .then((results) => {
      if (Array.isArray(results)) {
        const processedResults = results.map((result) => {
          result.shelf = result.id in shelvedBooks 
          ? shelvedBooks[result.id].shelf 
          : Constants.SHELVES.NONE;
          return result;
        })
        this.setState({ results: processedResults });
      } else {
        this.setState({ results: [] });
      }
    });
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
            books={this.state.results}
            onSelectorChange={this.props.onSelectorChange}
          />
        </div>
      </div>
    );
  }
}

export default SearchPage;
