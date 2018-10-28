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

class TakeMyMoney extends Component {
  onToken = res => {
    
  }
  
  render() {
    return (
      <User>
        {({ data: { me } }) => {
          const itemsCount = totalItems(me.cart);
          return (
            <StripeCheckout
              amount={calcTotalPrice(me.cart)}
              currency="EUR"
              name="Sick Fits!"
              description={`Order of ${itemsCount} item${
                itemsCount > 1 ? "s" : ""
              }.`}
              image={me.cart[0].item && me.cart[0].item.image}
              stripeKey="pk_test_t178iCV0kIwX7Gm5MzbUGSEv"
              email={me.email}
              token={res => this.onToken(res)}
            >
              {this.props.children}
            </StripeCheckout>
          );
        }}
      </User>
    );
  }
}

export default TakeMyMoney;
