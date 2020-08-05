import React from "react";
import SearchBar from "./components/SearchBar";
import axios from "axios";

class App extends React.Component {
  state = {
    listOfMovies: [],
    error: "",
  };

  onSearchSubmit = (title, year) => {
    // console.log(title);
    axios
      .get(
        `http://www.omdbapi.com/?s=${title}&y=${year}&apikey=d9d70785`
        // "http://www.omdbapi.com/?i=tt0485947&plot=full&r=json&apikey=d9d70785"
      )
      .then((resp) => {
        if (resp.data.Search) {
          this.setState({ listOfMovies: [] });
          this.setState({ listOfMovies: resp.data.Search });
          this.setState({ error: "" });
        } else if (resp.data.Error) {
          this.setState({ error: "" });
          this.setState({ error: resp.data.Error });
          this.setState({ listOfMovies: [] });
        }
        // console.log(this.state.listOfMovies);
        // console.log(resp.data.Error);
        console.log(this.state.error);
      });

    // console.log(get_genres(find_by_id("tt0031381")));
  };

  renderTableData = () => {
    // console.log("In renderTableData");
    // console.log(`ovo je lista`);
    // console.log(this.state.listOfMovies);

    if (this.state.listOfMovies.length) {
      return this.state.listOfMovies.map((movie, index) => {
        const { Title, Year, imdbID, Type } = movie;
        return (
          <tr key={imdbID}>
            <td>{Title}</td>
            <td>{Year}</td>
            <td>{imdbID}</td>
            <td>{Type}</td>
          </tr>
        );
      });
    } else if (this.state.error === "Movie not found!") {
      return (
        <tr>
          <td>MOVIE NOT FOUND</td>
        </tr>
      );
    }
  };

  renderTableHeader = () => {
    if (this.state.listOfMovies.length) {
      let header = Object.keys(this.state.listOfMovies[0]);
      return header.map((key, index) => {
        if (key !== "Poster") {
          return <th key={index}>{key.toUpperCase()}</th>;
        }
      });
    } else {
      return;
    }
  };

  render() {
    return (
      <div className="ui container" style={{ marginTop: "10px" }}>
        <SearchBar onSubmit={this.onSearchSubmit} />
        <table>
          <tbody>
            <tr>{this.renderTableHeader()}</tr>
            {this.renderTableData()}
          </tbody>
        </table>
      </div>
    );
  }
}

export default App;
