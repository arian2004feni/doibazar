import { Link } from "react-router";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";

const Auth = () => {
  const { user, signOutUser, openModal } = useAuth();
  const handleLogOut = () => {
    Swal.fire({
      title: "Do you really want to log out?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, log out!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        signOutUser()
          .then(() => {
            Swal.fire({
              icon: "success",
              title: "Logged out successfully!",
              showConfirmButton: false,
              timer: 1000,
            });
          })
          .catch((error) => {
            console.error("Error signing out:", error);
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Something went wrong!",
            });
          });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire({
          icon: "info",
          title: "Cancelled",
          text: "You are still logged in.",
          timer: 1000,
          showConfirmButton: false,
        });
      }
    });
  };

  if (user) {
    return (
      <div className="flex mt-4 md:m-0 justify-center items-center">
        <div className="ml-2 dropdown dropdown-end">
          <div
            tabIndex={0}
            className="relative avatar cursor-pointer avatar-online"
          >
            <div className="w-11 border rounded-full">
              <img
                src={user?.photoURL || "/random.png"}
                alt={user?.displayName || "User Avatar"}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    "https://i.ibb.co/JX3zV4J/pngtree-vector-avatar-icon-png-image-889567-removebg-preview.png";
                }}
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu dropdown-content bg-base-200 text-black dark:text-white rounded-box z-1 mt-4 w-52 p-2 shadow-sm "
          >
            <span className="absolute bg-base-200 size-6 right-3 -top-1 rotate-45"></span>
            <li className="menu-title">
              {user?.displayName} - {user?.email}{" "}
            </li>
            <li>
              <Link to={`/dashboard/${user?.email}/profile`}>Dashboard</Link>
            </li>
            <li>
              <Link>Offer Announcements</Link>
            </li>
          </ul>
        </div>
        <button
          onClick={handleLogOut}
          className='btn bg-orange-500 hover:bg-orange-600'
        >
          Logout
        </button>
      </div>
    );
  }

  return (
    <button
        className="btn bg-orange-500 hover:bg-orange-600 text-white"
        onClick={openModal}
      >
        Login / Register
      </button> 
  );
};

export default Auth;
