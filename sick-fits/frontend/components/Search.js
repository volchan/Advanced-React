import React, { Component } from "react";
import Downshift, { resetIdCounter } from "downshift";
import Router from "next/router";
import { ApolloConsumer } from "react-apollo";
import gql from "graphql-tag";
import debounce from "lodash.debounce";

import { DropDown, DropDownItem, SearchStyles } from "./styles/DropDown";

const SEARCH_ITEM_QUERY = gql`
  query SEARCH_ITEM_QUERY($searchTerm: String!) {
    items(
      where: {
        OR: [
          { title_contains: $searchTerm }
          { description_contains: $searchTerm }
        ]
      }
    ) {
      id
      image
      title
    }
  }
`;

const routeToItem = item => {
  Router.push({
    pathname: "/item",
    query: {
      id: item.id
    }
  });
};

class AutoComplete extends Component {
  state = {
    items: [],
    loading: false
  };

  onChange = debounce(async (e, client) => {
    // Turn loading ON
    this.setState({ loading: true });
    // Manually query Apollo client
    const res = await client.query({
      query: SEARCH_ITEM_QUERY,
      variables: { searchTerm: e.target.value }
    });
    // Populate state with new items array, and switch loading to false
    this.setState({
      items: res.data.items,
      loading: false
    });
  }, 350);

  render() {
    resetIdCounter();
    return (
      <SearchStyles>
        <Downshift
          onChange={routeToItem}
          itemToString={item => (item === null ? "" : item.title)}
        >
          {({
            getInputProps,
            getItemProps,
            isOpen,
            inputValue,
            highlightedIndex
          }) => {
            return (
              <div>
                <ApolloConsumer>
                  {client => {
                    return (
                      <input
                        {...getInputProps({
                          type: "search",
                          placeholder: "Search for an Item",
                          id: "search",
                          className: this.state.loading ? "loading" : "",
                          onChange: e => {
                            e.persist();
                            this.onChange(e, client);
                          }
                        })}
                      />
                    );
                  }}
                </ApolloConsumer>
                {isOpen && (
                  <DropDown>
                    {this.state.items.map((item, index) => (
                      <DropDownItem
                        {...getItemProps({ item })}
                        key={item.id}
                        highlighted={index === highlightedIndex}
                      >
                        <img width="50" src={item.image} alt={item.title} />
                        {item.title}
                      </DropDownItem>
                    ))}
                    {!this.state.items.length && !this.state.loading && (
                      <DropDownItem>Nothing found for {inputValue}</DropDownItem>
                    )}
                  </DropDown>
                )}
              </div>
            );
          }}
        </Downshift>
      </SearchStyles>
    );
  }
}

export default AutoComplete;
