import Nav from "./Nav";

const Header = () => {
  return (
    <div>
        <div className="bar">
            <a href="">Sick Fits</a>
            <Nav />
        </div>
        <div className="sub-bar">
            <p>Search</p>
            <p>Cart</p>
        </div>
    </div>
  )
}

export default Header;
