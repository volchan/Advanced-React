import React from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";

const ADD_TO_CART_MUTATION = gql`
  mutation ADD_TO_CART_MUTATION($id: ID!) {
    addToCart(id: $id) {
      id
      quantity
    }
  }
`;

class AddToCart extends React.Component {
  render() {
    return (
      <Mutation
        mutation={ADD_TO_CART_MUTATION}
        variables={{ id: this.props.id }}
      >
        {(addToCart, { loading }) => {
          return (
            <button onClick={addToCart}>
              Add
              {loading ? "ing" : ""} To Cart 🛒
            </button>
          );
        }}
      </Mutation>
    );
  }
}

export default AddToCart;
