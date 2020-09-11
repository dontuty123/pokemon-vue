import React, {Component} from 'react';
import './Search.scss'

/**
 *
 * Example demo state component
 */
class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchText: "",
            searchCount: 0,
            resultCount: 0
        }
    }

    changeSearchText(event) {
        let search = event.target.value;
        this.setState((prevState, props) => {
            return {
                searchText: search
            };
        });
    }

    doSearch() {
        this.setState((prevState, props) => {
            let count = this.state.searchText.length;
            return {
                searchCount: prevState.searchCount + 1,
                resultCount: count
            };
        });
    }

    render() {
        return (
            <div>
                <h3 className="title-search">Demo example using state</h3>
                <div className='search-box'>
                    <input
                        type="text"
                        value={this.state.searchText}
                        onChange={this.changeSearchText.bind(this)}
                    />
                    <button onClick={this.doSearch.bind(this)}>Search</button>
                    <li>Search Text {this.state.searchText}</li>
                    <li>Search Count: {this.state.searchCount}</li>
                    <li>Result Count: {this.state.resultCount}</li>
                </div>
            </div>
        );
    }
}

export default Search;
