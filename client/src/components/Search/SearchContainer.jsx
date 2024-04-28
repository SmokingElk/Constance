import React from "react";
import Search from "./Search";
import { connect } from "react-redux";
import { addSearchPack, resetSearchResults, setSearchFetching } from "../../redux/searchReducer";
import axios from "axios";
import { getJWT } from "../../global_logic/userEnter.js";
import withRouter from "../Utils/WithRouter.jsx";

class SearchContainer extends React.Component {
    componentDidMount () {
        this.props.resetSearchResults();

        this.loadNextPack(0);
    }
    
    loadNextPack (packNum = this.props.packsLoaded) {
        if (this.props.demo) return;

        this.props.setSearchFetching(true);

        axios.get("http://localhost:5000/api/v1/search/get_pack", {
            params: {
                jwtToken: getJWT(),
                pack_number: packNum,
            }
        }).then(res => {
            this.props.addSearchPack(res.data.pack_items, res.data.is_end);
        }).catch(error => {
            let status = error.response.status;
            if (status === 401) this.props.router.navigate("/login");
        }).finally(() => {
            this.props.setSearchFetching(false);
        });
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
    isFetching: state.search.isFetching,
    userSex: state.entered.sex,
});

const mapDispatchToProps = {
    resetSearchResults,
    addSearchPack,    
    setSearchFetching,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SearchContainer));