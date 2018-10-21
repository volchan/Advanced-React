import Link from "next/link";

import NavStyles from "./styles/NavStyles";
import User from "./User";

String.prototype.capitalize = function () {
  return this.charAt(0).toUpperCase() + this.slice(1);
}

const Nav = () => (
  <NavStyles>
    <User>
      {({data: { me }}) => {
        if (me) return <p>{me.firstName.capitalize()} {me.lastName.toUpperCase()}</p>
        return null;
      }}
    </User>
    <Link href="/items"><a>Shop</a></Link>
    <Link href="/sell"><a>Sell</a></Link>
    <Link href="/signup"><a>Signup</a></Link>
    <Link href="/orders"><a>Orders</a></Link>
    <Link href="/me"><a>Account</a></Link>
  </NavStyles>
);

export default Nav;
