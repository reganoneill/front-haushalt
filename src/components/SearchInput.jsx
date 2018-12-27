import React, { Component } from "react";

export default class SearchInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchQuery: ""
    };

    this.updateSearch = this.updateSearch.bind(this);
  }

  updateSearch(e) {
    console.log("the event--->", e);
    console.log("event target", e.target);
    this.setState({ searchQuery: e.target.value });
  }

  componentDidMount() {
    console.log("search input has mounted");
  }

  render() {
    return (
      <div>
        <form>
          <input
            type="text"
            value={this.state.searchQuery}
            onChange={this.updateSearch}
          />
        </form>
      </div>
    );
  }
}
