import { connect } from "react-redux";
import SearchInput from "./SearchInput";

const mapStateToProps = (state, props) => {
  return {
    searchQuery: state.searchQuery
  };
};

const searchInputRedux = connect(mapStateToProps)(SearchInput);

export default searchInputRedux;
