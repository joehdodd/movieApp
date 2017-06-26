import React, {Component} from 'react';
import {HashRouter as Router, Route, Link} from 'react-router-dom';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.addMovie = this.addMovie.bind(this);
    this.removeMovie = this.removeMovie.bind(this);
    this.state = {
      movies: []
    };
  }

  componentWillMount() {
    const localStorageRef = localStorage.getItem(`movie`);
    if (localStorageRef) {
      this.setState({movies: JSON.parse(localStorageRef)});
    }
  }

  componentWillUpdate(nextProps, nextState) {
    localStorage.setItem(`movie`, JSON.stringify(nextState.movies));
  }

  addMovie(movie) {
    let movies = this.state.movies;
    movies.push(movie);
    this.setState({movies});
  }

  removeMovie(movie) {
    let movies = this.state.movies;
    delete movies[movie];
    this.setState({movies});
  }

  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" render={() => (
              <MovieIndex addMovie={this.addMovie} removeMovie={this.removeMovie} movies={this.state.movies}/>)}/>
          <Route path={`/movie/:movieId`} render={({...props}) => (
              <MovieDetails {...props} movies={this.state.movies}/>)}/>
        </div>
      </Router>
    )
  }
}

class MovieIndex extends Component {
  render() {
    const areMovies = this.props.movies;
    return (
      <div className="container">
          <div className="wrapper">
            <h3 className="heading">Add A Movie</h3>
            <hr></hr>
            <AddMovie addMovie={this.props.addMovie}/>
          </div>
          <div className="wrapper">
            <h3 className="heading">Your Movies</h3>
            <hr></hr>
            {areMovies.length === 0 ? (
              <p className="add-movie">Add a movie!</p>
            ) : (
             <MovieList movies={this.props.movies} removeMovie={this.props.removeMovie}/>
            )}
          </div>
      </div>
    )
  }
}

class AddMovie extends Component {
  addMovie(event) {
    event.preventDefault();
    const movie = {
      title: this.title.value,
      year: this.year.value,
      image: this.image.value,
      desc: this.desc.value
    };
    this.props.addMovie(movie);
    this.movieForm.reset();
  }
  render() {
    return (
      <div className="container">
        <div className="form">
          <form ref={(input) => this.movieForm = input} onSubmit={(e) => this.addMovie(e)}>
            <input ref={(input) => this.title = input} className="Input" type="text" placeholder="Title" required/>
            <input ref={(input) => this.year = input} className="Input" type="text" placeholder="Year" required/>
            <textarea ref={(input) => this.desc = input} className="Input" type="text" placeholder="Description" required></textarea>
            <input ref={(input) => this.image = input} className="Input" type="text" placeholder="Poster Image URL" required/>
            <button type="submit">Add</button>
          </form>
        </div>
      </div>
    )
  }
}

class MovieList extends Component {
  render() {
    return (
      <div className="container">
        {this.props.movies.map((movie, id) => <MovieListItem key={id} id={id} details={movie} removeMovie={this.props.removeMovie}/>)}
      </div>
    );
  }
}

class MovieListItem extends Component {
  render() {
    const {details} = this.props;
    let id = this.props.id;
    return (
      <Router>
        <div className="flex">
            <div className="photo">
              <img src={details.image} alt={details.title}/>
              <div className="photo-overlay">
                <Link to={`movie/${id}`}>
                  <h4 className="detail-heading_overlay">Details</h4>
                </Link>
                <h4 className="remove" onClick={() => this.props.removeMovie(id)}>Remove</h4>
              </div>
            </div>
        </div>
      </Router>
    )
  }
}

class MovieDetails extends Component {
  render() {
    let id = this.props.match.params.movieId;
    let movie = this.props.movies;
    return (
      <div className="container">
        <div className="wrapper">
          <div className="container">
            <h3 className="heading">Movie Details</h3>
          </div>
          <hr></hr>
          <div className="container">
            <div className="flex">
              <img src={movie[id].image} alt={movie[id].title}/>
            </div>
            <div className="flex">
              <h4 className="detail-heading">Title</h4>
              <p className="detail-text">{movie[id].title}</p>
              <h4 className="detail-heading">Year</h4>
              <p className="detail-text">{movie[id].year}</p>
              <h4 className="detail-heading">Description</h4>
              <p className="detail-text">{movie[id].desc}</p>
              <Router>
                <Link to='/'>
                  <button className="btn-back" type="submit">Home</button>
                </Link>
              </Router>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App;
