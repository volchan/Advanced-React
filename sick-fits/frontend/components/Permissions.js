import { Query } from "react-apollo";
import gql from "graphql-tag";
import PropTypes from "prop-types";

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
                    return <UserPermissions user={user} key={user.id} />;
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

class UserPermissions extends React.Component {
  static propTypes = {
    user: PropTypes.shape({
      firstName: PropTypes.string,
      lastName: PropTypes.string,
      email: PropTypes.string,
      id: PropTypes.string,
      permissions: PropTypes.array
    }).isRequired
  };

  state = {
    permissions: this.props.user.permissions
  };

  handlePermissionChange = e => {
    const checkbox = e.target;
    //take a copy of the current permissions
    let updatedPermissions = [...this.state.permissions];
    // figure out if we need to add or remove this permission
    if (checkbox.checked) {
      updatedPermissions.push(checkbox.value);
    } else {
      updatedPermissions = updatedPermissions.filter(permission => {
        return permission !== checkbox.value;
      });
    }

    this.setState({ permissions: updatedPermissions });
  };

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
            <td key={permission}>
              <label htmlFor={`${user.id}-permission-${permission}`}>
                <input
                  type="checkbox"
                  checked={this.state.permissions.includes(permission)}
                  value={permission}
                  onChange={this.handlePermissionChange}
                  name=""
                  id=""
                />
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
