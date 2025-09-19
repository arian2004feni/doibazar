import { Link } from "react-router";
import Auth from "../Auth/Auth";
import useAuth from "../../hooks/useAuth";

const Navbar = () => {
  const { user } = useAuth();
  const links = (
    <>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/">All Items</Link>
      </li>
      {user?.gmail == "admin@doi.ghor" && (
        <>
          <li>
            <Link>Create Items</Link>
          </li>
        </>
      )}
    </>
  );
  return (
    <>
      <nav className="navbar fixed z-50 bg-base-100 shadow-sm">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {links}
            </ul>
          </div>
          <Link to="/" className="btn btn-ghost text-2xl bangla">
            দইবাজার
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{links}</ul>
        </div>
        <div className="navbar-end">
          <Auth />
        </div>
      </nav>
      <div className="h-16"></div>
    </>
  );
};

export default Navbar;
