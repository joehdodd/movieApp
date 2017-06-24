import React, { Component } from 'react';
import MovieListItem from './MovieListItem';

class MovieList extends Component {
  constructor(props) {
    super(props);
  }

  handleClick(i, e) {
    this.props.setActiveMovie(i);
  }

  renderListItems(movies) {
    return movies.map( (movie, index) => {
      return (
        <div onClick={ this.handleClick.bind(this, index) }>
          <MovieListItem key={ index } details={ movie } />
        </div>
      )
    });
  }

  render() {
    return (
      <div>{ this.renderListItems(this.props.movies) }</div>
    );
  }
}

export default MovieList;

class MovieDetails extends Component {
  render() {
    const { details, index } = this.props;
    return (
      <div>
        <p>{this.props.details.image}</p>
        <p>{this.props.details.desc}</p>
      </div>
    )
  }
}

import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
