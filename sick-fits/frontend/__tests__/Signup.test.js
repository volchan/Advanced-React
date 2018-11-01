import { mount } from "enzyme";
import toJSON from "enzyme-to-json";
import wait from "waait";
import { MockedProvider } from "react-apollo/test-utils";
import { ApolloConsumer } from "react-apollo";

import Signup, { SIGNUP_MUTATION } from "../components/Signup";
import { CURRENT_USER_QUERY } from "../components/User";
import { fakeUser } from "../lib/testUtils";

const me = fakeUser();
const mocks = [
  {
    request: {
      query: SIGNUP_MUTATION,
      variables: {
        email: me.email,
        firstName: me.firstName,
        lastName: me.lastName,
        password: "password"
      }
    },
    result: {
      data: {
        signup: {
          ...me
        }
      }
    }
  },
  {
    request: {
      query: CURRENT_USER_QUERY
    },
    result: { data: { me } }
  }
];

const type = (wrapper, name, value) => {
  wrapper.find(`input[name="${name}"]`).simulate("change", {
    target: { name, value }
  });
};

describe("<Signup />", () => {
  it("renders ans matches snapshot", () => {
    const wrapper = mount(
      <MockedProvider>
        <Signup />
      </MockedProvider>
    );

    const form = wrapper.find('form[data-test="form"]');
    expect(toJSON(form)).toMatchSnapshot();
  });

  it("calls the mutation properly", async () => {
    let apolloClient;
    const wrapper = mount(
      <MockedProvider mocks={mocks}>
        <ApolloConsumer>
          {client => {
            apolloClient = client;
            return <Signup />;
          }}
        </ApolloConsumer>
      </MockedProvider>
    );

    await wait();
    type(wrapper, "firstName", me.firstName);
    type(wrapper, "lastName", me.lastName);
    type(wrapper, "email", me.email);
    type(wrapper, "password", "password");
    wrapper.update();
    wrapper.find('form[data-test="form"]').simulate("submit");

    await wait();
    const user = await apolloClient.query({ query: CURRENT_USER_QUERY });
    expect(user.data.me).toMatchObject(me);
  });
});
