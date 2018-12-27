import React, { Component } from "react";
import PropTypes from "prop-types";

import _ from "lodash";

export default class ListHolder extends Component {
  render() {
    let renderListItems = _.map(this.props.primaryData, (item, idx) => {
      return (
        <li key={idx} className="listItem">
          {item}
        </li>
      );
    });
    return (
      // <div className="listContainer">
      // 	<h3>{this.props.listName}</h3>
      // 	<div className="listInnerContainer">
      // 		<ul>{renderListItems}</ul>
      // 	</div>
      // </div>
      <h1>test</h1>
    );
  }
}

ListHolder.PropTypes = {
  listName: PropTypes.string,
  primaryData: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
};
