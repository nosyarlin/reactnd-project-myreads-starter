import React from 'react'
import './App.css'
import { Route } from 'react-router-dom';
import SearchPage from './SearchPage';
import MyReadsPage from './MyReadsPage';

class BooksApp extends React.Component {
  render() {
    return (
      <div className="app">
        <Route exact path='/'><MyReadsPage/></Route>
        <Route exact path='/search'><SearchPage/></Route>
      </div>
    )
  }
}

export default BooksApp
