import React, { Component } from "react";
import StripeCheckout from "react-stripe-checkout";
import { Mutation } from "react-apollo";
import Router from "next/router";
import NProgress from "nprogress";
import PropTypes from "prop-types";
import gql from "graphql-tag";

import calcTotalPrice from "../lib/calcTotalPrice";
import Error from "./ErrorMessage";
import User, { CURRENT_USER_QUERY } from "./User";

const totalItems = cart => {
  return cart.reduce((tally, cartItem) => tally + cartItem.quantity, 0);
};

const CREATE_ORDER_MUTATION = gql`
  mutation CREATE_ORDER_MUTATION($token: String!) {
    createOrder(token: $token) {
      id
      charge
      total
      items {
        id
        title
      }
    }
  }
`;

class TakeMyMoney extends Component {
  onToken = async (res, createOrder) => {
    NProgress.start()
    const order = await createOrder({
      variables: {
        token: res.id
      }
    }).catch(err => {
      alert(err.message);
    });
    Router.push({
      pathname: "/order",
      query: { id: order.data.createOrder.id }
    });
  };

  render() {
    return (
      <User>
        {({ data: { me }, loading }) => {
          if (loading) return null;
          const itemsCount = totalItems(me.cart);
          return (
            <Mutation
              mutation={CREATE_ORDER_MUTATION}
              refetchQueries={[{ query: CURRENT_USER_QUERY }]}
            >
              {createOrder => {
                return (
                  <StripeCheckout
                    amount={calcTotalPrice(me.cart)}
                    currency="EUR"
                    name="Sick Fits!"
                    description={`Order of ${itemsCount} item${
                      itemsCount > 1 ? "s" : ""
                    }.`}
                    image={me.cart.length && me.cart[0].item && me.cart[0].item.image}
                    stripeKey="pk_test_t178iCV0kIwX7Gm5MzbUGSEv"
                    email={me.email}
                    token={res => this.onToken(res, createOrder)}
                  >
                    {this.props.children}
                  </StripeCheckout>
                );
              }}
            </Mutation>
          );
        }}
      </User>
    );
  }
}

export default TakeMyMoney;
export { CREATE_ORDER_MUTATION };
