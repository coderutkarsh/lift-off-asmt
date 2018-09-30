import React, { Component } from 'react';
import Movies_list from '../containers/movies_list'
import MovieDetails from '../containers/MovieDetails'
export default class App extends Component {
  render() {
    return (
        <div>
      <div><Movies_list /></div>
      <div><MovieDetails/></div>
        </div>
          );
  }
}
