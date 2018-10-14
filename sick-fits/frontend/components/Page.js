import React, { Component } from "react";
import styled from "styled-components";

import Header from "./Header";
import Meta from "./Meta";

const MyButton = styled.button`
  background: #00a1ff;
  padding: 5px;
  font-size: 1.5rem;
  color: white;
  border: 2px solid rgba(255, 255, 255, .25);
  /* font-size: ${props => (props.huge ? "100px" : "50px")}; */
  border-radius: 4px;
`;

export default class Page extends Component {
  render() {
    return <div>
      <Meta />
      <Header />
      <MyButton >
        Click Me
      </MyButton>
      {this.props.children}
    </div>;
  }
}
