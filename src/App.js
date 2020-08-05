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
        console.log(this.state.listOfMovies);
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
          <td>MOVIE NOT FOUND, try again with different title of year</td>
        </tr>
      );
    }
  };

  renderTableHeader = () => {
    if (this.state.listOfMovies.length) {
      let header = Object.keys(this.state.listOfMovies[0]);
      return header.map((key, index) => {
        if (key !== "Poster") {
          return (
            <th key={index}>
              {key.toUpperCase()}
              <button>
                <img
                  style={{ width: 20, height: 20 }}
                  src="/pictures/reorder.png"
                  alt="reorder picture"
                  onClick={() => this.ascendingValues(key)}
                ></img>
              </button>

              <button>
                <img
                  style={{ width: 20, height: 20 }}
                  src="/pictures/sort.png"
                  alt="sort picture"
                  onClick={() => this.descendingValues(key)}
                ></img>
              </button>
            </th>
          );
        }
      });
    } else {
      return;
    }
  };

  descendingValues = (keyValue) => {
    let descendList = [];
    descendList = [...this.state.listOfMovies];
    descendList.sort(this.compareValues(keyValue, "desc"));
    this.setState({ listOfMovies: descendList });
  };

  ascendingValues = (keyValue) => {
    let ascendList = [];
    ascendList = [...this.state.listOfMovies];
    ascendList.sort(this.compareValues(keyValue));
    this.setState({ listOfMovies: ascendList });
  };

  compareValues = (key, order = "asc") => {
    return (a, b) => {
      if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
        // property doesn't exist on either object
        return 0;
      }
      const varA = typeof a[key] === "string" ? a[key].toUpperCase() : a[key];
      const varB = typeof b[key] === "string" ? b[key].toUpperCase() : b[key];

      let comparison = 0;
      if (varA > varB) {
        comparison = 1;
      } else if (varA < varB) {
        comparison = -1;
      }
      return order === "desc" ? comparison * -1 : comparison;
    };
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
