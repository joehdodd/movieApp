import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link} from 'react-router-dom';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.addMovie = this.addMovie.bind(this);
    this.state = {
      movies : [

      ]
    };
  }

  componentWillMount() {
    const localStorageRef = localStorage.getItem(`movie`);
    if(localStorageRef) {
      this.setState({
        movies: JSON.parse(localStorageRef)
      });
    }
  }

  componentWillUpdate(nextProps, nextState) {
    localStorage.setItem(`movie`, JSON.stringify(nextState.movies));
  }

  addMovie(movie) {
    let movies = this.state.movies;
    movies.push(movie);
    this.setState({ movies });
  }

  render() {
    return (
      <div className="wrapper">
        <div className="container">
          <div>
            <h3 className="heading">Favorite Movies</h3>
          </div>
        </div>
        <Router>
          <div>
            <Route path="/" exact render={() => (
              <MovieIndex addMovie={this.addMovie} movies={this.state.movies}/>
            )}/>
          <Route path={`/movie/`} render={() => (
              <MovieDetails movies={ this.state.movies }/>
            )}/>
          </div>
        </Router>
      </div>
    )
  }
}

class MovieIndex extends Component {
  render() {
    return (
      <div>
        <AddMovie addMovie={this.props.addMovie}/>
        <MovieList movies={this.props.movies}/>
      </div>
    )
  }
}

class AddMovie extends Component {
  addMovie(event) {
    event.preventDefault();
    const movie = {
      title : this.title.value,
      year  : this.year.value,
      image : this.image.value,
      desc  : this.desc.value
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
            <input ref={(input) => this.image = input} className="Input" type="text" placeholder="Poster URL" required/>
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
        { this.props.movies.map( (movie, id) => <MovieListItem key={id} id={id} details={ movie }/> )}
      </div>
    );
  }
}

class MovieListItem extends Component {
  constructor(props) {
    super(props);
    this.toggleClass = this.toggleClass.bind(this);
    this.state = {
      active: false
    };
  }
  toggleClass() {
    const currentState = this.state.active;
    this.setState({ active: !currentState });
  }
  render() {
    const { details } = this.props;
    let id = this.props.id;
    return (
      <Router>
          <div className="flex">
            <Link to={`movie/${id}`}>
              <div className="photo">
                <img src={details.image} alt={details.title}/>
                <div className="photo-overlay">
                  <h4 className="detail-heading">Title</h4>
                  <p className="detail-text">{details.title}</p>
                  <h4 className="detail-heading">Year</h4>
                  <p className="detail-text">{details.year}</p>
                  <h4 className="detail-heading">Description</h4>
                  <p className="detail-text">{details.desc}</p>
                </div>
              </div>
            </Link>
          </div>
      </Router>
    )
  }
}

class MovieDetails extends Component {
  render() {
    let movie = this.props.movies;
    let id = this.props.id;
    return (
      <div>
        <div>
          <p>{id}</p>
          <p>{movie[0].title}</p>
          <p>{movie[0].desc}</p>
        </div>
        <Router>
          <Link to=''>
            <button type="submit">Home</button>
          </Link>
        </Router>
      </div>
    )
  }
}

export default App;
