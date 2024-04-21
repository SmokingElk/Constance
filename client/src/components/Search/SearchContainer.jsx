import React from "react";
import Search from "./Search";
import { connect } from "react-redux";
import { addSearchPack, resetSearchResults } from "../../redux/searchReducer";

class SearchContainer extends React.Component {
    componentDidMount () {
        this.props.resetSearchResults();

        if (this.props.demo) return;
    }
    
    loadNextPack () {
        if (this.props.demo) return;
    }

    render () {
        return <Search {...this.props} loadNextPack={this.loadNextPack.bind(this)}/>;
    }
}

const mapStateToProps = state => ({
    demo: state.search.demo,
    isEnded: state.search.isEnded,
    packsLoaded: state.search.packsLoaded,
    foundedUsersData: state.search.foundedUsersData,
});

const mapDispatchToProps = {
    resetSearchResults,
    addSearchPack,    
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchContainer);