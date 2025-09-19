import GoogleLogin from "./GoogleLogin";
import Swal from "sweetalert2";
import useAuth from "../hooks/useAuth";
import { updateProfile } from "firebase/auth";

export default function AuthModal() {
  const { signInUser, closeModal, isOpen, createUser, setAuthLoading, isLogin, setIsLogin } =
    useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    if (isLogin) {
      const email = form.email.value;
      const password = form.password.value;
      signInUser(email, password)
        .then(() => {
          setAuthLoading(false);
          closeModal();
          Swal.fire({
            icon: "success",
            title: "Login Successful ✅",
            text: "Welcome back!",
            confirmButtonText: "Continue",
          });
        })
        .catch(() => {
          setAuthLoading(false);
          Swal.fire({
            icon: "error",
            title: "Login Failed",
            confirmButtonText: "OK",
          });
        });
    } else {
      const name = form.name.value;
      const email = form.email.value;
      const password = form.password.value;
      createUser(email, password)
        .then((res) => {
          const user = res.user;
          // console.log(res.user);
          updateProfile(user, {
            displayName: name,
            photoURL:
              "https://i.ibb.co.com/JX3zV4J/pngtree-vector-avatar-icon-png-image-889567-removebg-preview.png",
          })
            .then(() => {
              setAuthLoading(false);
              closeModal();
              Swal.fire({
                icon: "success",
                title: "Registration Successful 🎉",
                text: "Welcome aboard!",
                confirmButtonText: "Continue",
              });
            })
            .catch(() => {
              setAuthLoading(false);
              closeModal();
              Swal.fire({
                icon: "error",
                title: "Profile Update Failed",
                confirmButtonText: "OK",
              });
            });
        })
        .catch(() => {
          setAuthLoading(false);
          closeModal();
          Swal.fire({
            icon: "error",
            title: "Registration Failed",
            confirmButtonText: "OK",
          });
        });
    }
  };

  return (
    <div>
      {isOpen && (
        <dialog className="modal modal-open">
          <div className="modal-box relative max-w-sm">
            {/* Close button */}
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={closeModal}
            >
              ✕
            </button>

            <h3 className="font-bold text-lg text-center mb-4">
              {isLogin ? "Login" : "Register"}
            </h3>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-3">
              {!isLogin && (
                <label className="floating-label mb-4">
                  <span>Name</span>
                  {/* <input type="text" placeholder="Name" name='name' className="input max-w-md w-full " /> */}
                  <label className="input w-full validator px-0">
                    <input
                      name="name"
                      className="pl-3"
                      type="text"
                      required
                      placeholder="Name"
                      minLength="3"
                      maxLength="30"
                      title="Only letters, numbers or dash"
                    />
                  </label>
                  <p className="validator-hint hidden">
                    Required: Must be 3 to 30 characters
                  </p>
                </label>
              )}
              <label className="floating-label mb-4">
                <span>Email</span>
                {/* <input type="email" placeholder="Your Email" className="input max-w-md w-full sm:input-lg" /> */}
                <label className="input w-full px-0">
                  <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    className="pl-3"
                    required
                  />
                </label>
                <div className="validator-hint hidden">
                  Enter valid email address
                </div>
              </label>
              <label className="floating-label">
                <span>Password</span>
                {/* <input type="password" placeholder="Password" className="input w-full sm:input-lg" /> */}
                <label className="input w-full">
                  <input
                    name="password"
                    type="password"
                    required
                    placeholder="Password"
                    minLength="6"
                    pattern=".{6,}"
                    title="Must be at least 6 characters"
                  />
                  {/* <MdOutlineRemoveRedEye className='cursor-pointer size-6 ' /> */}
                </label>
              </label>

              <button
                type="submit"
                className="btn w-full bg-orange-500 hover:bg-orange-600 text-white"
              >
                {isLogin ? "Login" : "Register"}
              </button>
            </form>
            <div className="divider">or</div>
            <GoogleLogin />

            {/* Toggle link */}
            <p className="text-sm text-center mt-3">
              {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
              <button
                className="text-orange-600 hover:underline"
                onClick={() => setIsLogin(!isLogin)}
              >
                {isLogin ? "Register here" : "Login here"}
              </button>
            </p>
          </div>

          {/* Click outside to close */}
          <form method="dialog" className="modal-backdrop" onClick={closeModal}>
            <button>close</button>
          </form>
        </dialog>
      )}
    </div>
  );
}
