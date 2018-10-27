import { Query } from "react-apollo";
import gql from "graphql-tag";

import Error from "./ErrorMessage";
import Table from "./styles/Table";
import SickButton from "./styles/SickButton";

const possiblePermissions = [
  "ADMIN",
  "USER",
  "ITEMCREATE",
  "ITEMUPDATE",
  "ITEMDELETE",
  "PERMISSIONUPDATE"
];

const ALL_USERS_QUERY = gql`
  query ALL_USERS_QUERY {
    users {
      id
      firstName
      lastName
      email
      permissions
    }
  }
`;

const Permissions = props => {
  return (
    <Query query={ALL_USERS_QUERY}>
      {({ data, loading, error }) => {
        return (
          <div>
            <Error error={error} />
            <div>
              <h2>Manage Permissions</h2>
              <Table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    {possiblePermissions.map(permission => {
                      return <th key={permission}>{permission}</th>;
                    })}
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {data.users.map(user => {
                    return <User user={user} key={user.id} />;
                  })}
                </tbody>
              </Table>
            </div>
          </div>
        );
      }}
    </Query>
  );
};

class User extends React.Component {
  render() {
    const user = this.props.user;
    return (
      <tr>
        <td>
          {user.firstName.capitalize()} {user.lastName.toUpperCase()}
        </td>
        <td>{user.email}</td>
        {possiblePermissions.map(permission => {
          return (
            <td key={`${user.id}-permission-${permission}`}>
              <label htmlFor={`${user.id}-permission-${permission}`}>
                <input type="checkbox" name="" id="" />
              </label>
            </td>
          );
        })}
        <td>
          <SickButton>Update</SickButton>
        </td>
      </tr>
    );
  }
}

export default Permissions;
