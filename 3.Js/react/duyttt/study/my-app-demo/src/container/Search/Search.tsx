import React, {Component} from 'react';
import './Search.scss'

interface Props {
    searchText: string,
    searchCountAdd: number,
    resultCount: number;
}

interface State {
    searchText: string,
    searchCountAdd: number,
    resultCount: number;
}

/**
 *
 * Example demo state component
 */
class Search extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            searchText: "",
            searchCountAdd: 0,
            resultCount: 0
        }
    }

    changeSearchText = (event: { target: { value: any; }; }): void => {
        let search = event.target.value;
        this.setState((prevState, props) => {
            return {
                searchText: search
            };
        });
    };

    doSearch = (): void => {
        this.setState((prevState, props) => {
            let count = this.state.searchText.length;
            return {
                searchCountAdd: prevState.searchCountAdd + 1,
                resultCount: count
            };
        });
    };

    render() {
        const {searchText, searchCountAdd, resultCount} = this.state;
        return (
            <div>
                <h3 className="title-search">Demo example using state</h3>
                <div className='search-box'>
                    <input
                        type="text"
                        value={searchText}
                        onChange={
                            (event) => this.changeSearchText(event)
                        }
                    />
                    <button onClick={() => this.doSearch()}>Search</button>
                    <li>Search Text {searchText}</li>
                    <li>Search Count: {searchCountAdd}</li>
                    <li>Result Count: {resultCount}</li>
                </div>
            </div>
        );
    }
}

export default Search;
