import fetch from "isomorphic-fetch";
import React from "react";
import { AsyncTypeahead } from "react-bootstrap-typeahead";
import { ShopsSearchedfromDB } from "../AllApi";
import { Toolbar } from "../MainPage/MainPage";
import "./style.css";
// import $ from "jquery";
//import "../../../node_modules/react-bootstrap-typeahead/css/Typeahead.css"
//import { render } from 'react-dom';
// import { ControlledCarousel } from '../Carousel/ControlledCarousel'

const PER_PAGE = 50;
const SEARCH_URI = `${ShopsSearchedfromDB}`;

let test;
var Lat = localStorage.getItem("lat", Lat);
var Long = localStorage.getItem("lng", Long);
//console.log("Test "+Lat);

function makeAndHandleRequest(query, page = 1) {
  localStorage.getItem("Cate");
  //alert(query);
  // return fetch(`${SEARCH_URI}?q=${query}+in:login&page=${page}&per_page=50`)
  // console.log('hello')
  // console.log(`${SEARCH_URI}?SearchValue=${query}&Lat=${Lat}&Long=${Long}&CountryCode=${92}`)
  return (
    fetch(
      `${SEARCH_URI}?SearchValue=${query}&Lat=${Lat}&Long=${Long}&CountryCode=${92}`
    )
      // &Lat=24.8059173&Long=67.0268045&CountryCode=92
      .then((resp) => resp.json())
      .then((Response) => {
        var apiResponce = JSON.parse(Response.Result.Response);

        if (apiResponce[0].Code == "05") {
          localStorage.setItem("querry", query);
          // console.log(apiResponce);
          let opt = {
            avatar_url: apiResponce.Message,
            //avatar_url: j.Message,
            id: apiResponce.Code,
            login: apiResponce.Message,
          };

          //alert(opt);
          return { opt };
        } else {
          var myObject = JSON.parse(Response.Result.Data);
          var SearchList = myObject.SearchedMFoodz[0];

          let options = [];
          let optionNew = Object.keys(SearchList).map(function(key, index) {
            // console.log([key]);
            let optNew = SearchList[key].map((i) => {
              options.push({
                login: i.Name,
                avatar_url: "",
                id: [key],
                title: [key],
                // login: i.Name,
              });
            });
          });

          // console.log('hello2')
          // console.log(options)

          /* eslint-disable-line camelcase */
          // let options = myObject.SearchResult.map(i => ({
          //   avatar_url: i.pic,
          //   id: i.id,
          //   login: i.name
          // }));
          //let options = optionNew[0];
          //return { options, total_count };

          // console.log(options);
          return { options };
        }
      })
  );
}

class AsyncPaginationExample extends React.Component {
  state = {
    isLoading: false,
    options: [],
    opt: [],
    query: "",
    name: "React-bootstrap key enter event",
    serch: "",
    Search: 0,
  };

  _cache = {};
  renderSearch(Value, Header) {
    this.setState({ Search: 1 });
  }

  render() {
    return (
      <AsyncTypeahead
        {...this.state}
        id="async-pagination-example"
        className="foodSearch"
        clearButton
        labelKey="login"
        maxResults={PER_PAGE - 1}
        minLength={2}
        value={this.state.serch}
        onKeyDown={this._handleKeyDown}
        onInputChange={this._handleInputChange}
        onPaginate={this._handlePagination}
        onSearch={this._handleSearch}
        paginate
        placeholder="Search for Restaurants and Dishes"
        renderMenuItemChildren={(option) => (
          <div onClick={() => Toolbar(option)} key={option.id}>
            {/* <img
               alt={option.id}
              src={option.avatar_url}
              style={{
                height: "24px",
                marginRight: "10px",
                width: "24px",
              }}
            /> */}

            <span>{option.login}</span>
          </div>
        )}
        useCache={false}
      />
    );
  }

  _handleKeyDown = (e) => {
    if (e.key === "Enter") {
      // alert();
      var tt = e.target.value;
      var gg = e.target.labelKey;

      // console.log('tt');
      // console.log(gg);
      localStorage.setItem("querry", tt);
      // window.location.href = "/dataNotFound";
    }
  };

  _handleInputChange = (query) => {
    // alert(query);
    this.setState({ query });
  };

  _handlePagination = (e, shownResults) => {
    const { query } = this.state;
    const cachedQuery = this._cache[query];

    // Don't make another request if:
    // - the cached results exceed the shown results
    // - we've already fetched all possible results
    if (
      cachedQuery.options.length > shownResults ||
      cachedQuery.options.length === cachedQuery.total_count
    ) {
      return;
    }

    this.setState({ isLoading: true });

    const page = cachedQuery.page + 1;

    makeAndHandleRequest(query, page).then((resp) => {
      const options = cachedQuery.options.concat(resp.options);
      //alert(options);
      this._cache[query] = { ...cachedQuery, options, page };
      this.setState({
        isLoading: false,
        options,
      });
    });
  };

  _handleSearch = (query) => {
    if (this._cache[query]) {
      this.setState({ options: this._cache[query].options });
      // console.log(this.state.options);
      //alert(query);
      return;
    }

    this.setState({ isLoading: true });

    makeAndHandleRequest(query).then((resp) => {
      this._cache[query] = { ...resp, page: 1 };
      //console.log(this._cache);
      this.setState({
        isLoading: false,
        options: resp.options,
      });
    });
  };

  _handleClick = (query) => {
    // console.log('helo');
    //console.log(query.value);
    //console.log(JSON.parse(query));
  };
}

//render(<AsyncPaginationExample />, document.getElementById('root'));
export default AsyncPaginationExample;
