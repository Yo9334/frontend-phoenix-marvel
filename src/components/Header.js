import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/img/logo_marvel.png";

const Header = ({
  handleSearchByTitle,
  handleSearchByName,
  userToken,
  handleToken,
}) => {
  const location = useLocation();
  const navigate = useNavigate();

  console.log("header -> location : ", location);

  return (
    <header className="container">
      <div className="header-wrapper">
        <Link to="/">
          <div className="logo">
            <img src={logo} alt="Marvel" className="logo" />
          </div>
        </Link>

        {location.pathname === "/characters" ? (
          <div className="input-search">
            <input
              type="text"
              placeholder="Batman ..."
              onChange={handleSearchByName}
            />
          </div>
        ) : location.pathname === "/" ? (
          <div className="input-search">
            <input
              type="text"
              placeholder="100th Anniversary Special (2014) #1 ..."
              onChange={handleSearchByTitle}
            />
          </div>
        ) : (
          <div className="input-search"></div>
        )}

        <div>
          <button
            className="input-navigate"
            onClick={() => {
              navigate("/");
            }}
          >
            Comics
          </button>
          <button
            className="input-navigate"
            onClick={() => {
              navigate("/characters");
            }}
          >
            Characters
          </button>
        </div>

        <div>
          {userToken ? (
            <>
              <button
                className="input-navigate"
                onClick={() => {
                  navigate("/favorite");
                }}
              >
                Favorites
              </button>

              <button
                className="input-user"
                onClick={() => {
                  handleToken(null);
                }}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                className="input-user"
                onClick={() => {
                  navigate("/login");
                }}
              >
                Login
              </button>
              <button
                className="input-user"
                onClick={() => {
                  navigate("/signup");
                }}
              >
                Signup
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
