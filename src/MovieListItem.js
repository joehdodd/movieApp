import React, { Component } from 'react';

class MovieListItem extends Component {
  render() {
    const { details } = this.props;
    return (
      <div>
        <p>{details.title}</p>
        <p>{details.year}</p>
        <hr />
      </div>
    )
  }
}

export default MovieListItem;
