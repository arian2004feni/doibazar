import { Link } from "react-router";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";

const Auth = () => {
  const { user, signOutUser, openModal, setAuthLoading } = useAuth();
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
            setAuthLoading(false)
            Swal.fire({
              icon: "success",
              title: "Logged out successfully!",
              showConfirmButton: false,
              timer: 1000,
            });
          })
          .catch(() => {
            setAuthLoading(false)
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
      <div className="flex md:m-0 justify-center items-center gap-2">
        <Link to="dashboard/profile" className="w-11 max-sm:w-9 border rounded-full overflow-hidden">
          <img
            src={user?.photoURL || "/random.png"}
            alt={user?.displayName || "User Avatar"}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src =
                "https://i.ibb.co/JX3zV4J/pngtree-vector-avatar-icon-png-image-889567-removebg-preview.png";
            }}
          />
        </Link>
        <button
          onClick={handleLogOut}
          className="btn h-9 text-[12px] bg-orange-500 hover:bg-orange-600"
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
