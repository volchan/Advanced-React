import React, { Component } from "react";
import Downshift from "downshift";
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
    return (
      <SearchStyles>
        <div>
          <ApolloConsumer>
            {client => {
              return (
                <input
                  type="search"
                  onChange={e => {
                    e.persist();
                    this.onChange(e, client);
                  }}
                />
              );
            }}
          </ApolloConsumer>
          <DropDown>
            {this.state.items.map(item => (
              <DropDownItem key={item.id}>
                <img width="50" src={item.image} alt={item.title} />
                {item.title}
              </DropDownItem>
            ))}
          </DropDown>
        </div>
      </SearchStyles>
    );
  }
}

export default AutoComplete;
