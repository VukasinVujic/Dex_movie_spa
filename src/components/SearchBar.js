import React from "react";

class SearchBar extends React.Component {
  state = {
    title: "",
    year: "",
  };

  onFormSubmit = (event) => {
    event.preventDefault();
    console.log(this.state.title);
    this.props.onSubmit(this.state.title, this.state.year); // when you call method onFormSubmit in child it will
    // call the method in parent and pass the value from child to parent
  };

  render() {
    return (
      <div className="ui segment">
        <form onSubmit={this.onFormSubmit} className="ui form">
          <div className="field">
            <label htmlFor="">Enter title by which you want to search</label>
            <input
              type="text"
              value={this.state.title}
              onChange={(e) => this.setState({ title: e.target.value })}
              required
            />
            <label htmlFor="">Enter year by which you want to search</label>
            <input
              type="text"
              value={this.state.year}
              onChange={(e) => this.setState({ year: e.target.value })}
            />
          </div>
          <input type="submit" value="submit" />
        </form>
      </div>
    );
  }
}

export default SearchBar;
