import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PostContext } from "../store/contextAPI";
const NavBar = () => {
  const { setProductsList, getProducts } = useContext(PostContext);
  const auth = localStorage.getItem("users");
  // const userName = JSON.parse(localStorage.getItem("users")).name;
  const navigate = useNavigate();
  const logOut = () => {
    localStorage.clear();
    navigate("/signup");
  };

  // const profile = () => {};
  const handleSearch = async (event) => {
    let key = event.target.value;
    if (key) {
      let result = await fetch(`http://localhost:5000/search/${key}`, {
        headers: {
          authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      });
      result = await result.json();
      setProductsList(result);
      // console.log(result);
    } else {
      getProducts();
    }
  };
  return (
    <header className="p-3 text-bg-dark">
      <img src="./images/logo.jpg" alt="logo" className="logo" />
      {auth ? (
        <div className="container">
          <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
            <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
              <li>
                <Link to="/my-journal" className="nav-link px-2 text-white">
                  My Journals
                </Link>
              </li>
              <li>
                <Link to="/create-journal" className="nav-link px-2 text-white">
                  Add Mood Journal
                </Link>
              </li>
              <li>
                <Link
                  to="/update/:id"
                  className="nav-link px-2 text-white"
                ></Link>
              </li>
            </ul>
            <div className="filter-div">
              <label className="filter" htmlFor="dropdown">
                {" "}
                Filter by mood{" "}
              </label>
              <select id="dropdown" className="filter" onChange={handleSearch}>
                <option value="">Select</option>
                <option value="Happy">Happy</option>
                <option value="Sad">Sad</option>
                <option value="Confused">Confused</option>
                <option value="Demotivated">Demotivated</option>
                <option value="Motivated">Motivated</option>
              </select>
            </div>
            <form
              className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3"
              role="search"
            >
              <input
                type="search"
                className="form-control form-control-dark text-bg-light"
                placeholder="Search..."
                aria-label="Search"
                onChange={handleSearch}
              />
            </form>
            <div className="text-end">
              <Link onClick={logOut} to="/signup">
                <button
                  type="button"
                  className="btn btn-primary btn-outline-light me-2"
                >
                  Logout
                </button>
              </Link>

              {/* <Link onClick={profile} to="/profile">
                <button
                  type="button"
                  className="btn btn-primary btn-outline-light me-2"
                >
                  Profile
                </button>
              </Link> */}
            </div>
          </div>
        </div>
      ) : (
        <div className="container">
          <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-end">
            <Link to="/signup">
              <button type="button" className="btn btn-warning">
                Sign-up
              </button>
            </Link>
            <Link to="/login">
              <button type="button" className="btn btn-warning login">
                Login
              </button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default NavBar;
