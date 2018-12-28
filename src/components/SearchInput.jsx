import React, { Component } from "react";
import { FormControl } from "react-bootstrap";

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
          <FormControl
            type="text"
            className="mainInput"
            value={this.state.searchQuery}
            onChange={this.updateSearch}
          />
        </form>
      </div>
    );
  }
}
