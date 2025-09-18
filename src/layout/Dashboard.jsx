import { RiUserSettingsLine } from "react-icons/ri";
import { NavLink, Outlet } from "react-router";
import DashboardSideNav from "../component/common/DashboardSideNav";

const Dashboard = () => {
  const userRole = {role: 'user'};

  // const { data: userRole = {} } = useQuery({
  //   queryKey: ["user-role", emailId?.email],
  //   queryFn: async () => {
  //     const res = await axiosSecure.get(`/users/${emailId.email}/role`);
  //     return res.data;
  //   },
  // });

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        {/* Navbar */}
        <div className="navbar justify-between bg-base-300 w-full lg:hidden">
          <div className="flex items-center justify-center">
            <label
              htmlFor="my-drawer"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost mr-5"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-6 w-6 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
            <h2 className="text-4xl">Doighor</h2>
          </div>
        </div>
        {/* Page content here */}
        <div className="">
          <Outlet></Outlet>
        </div>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu menu-lg gap-3 bg-base-200 min-h-full w-80 p-4">
          {/* Sidebar Logo */}
          <div className="mb-5 flex justify-between items-center">
            <h2 className="text-3xl">Doighor</h2>
          </div>
          {/* Sidebar Navigation */}
          <li>
            <NavLink
              className="dashboard"
              to='/dashboard/profile'
            >
              <RiUserSettingsLine className="mr-2" />
              Manage Profile
            </NavLink>
          </li>
          <DashboardSideNav userRole={userRole} />
          {/* Footer */}
          <footer className="mt-auto mb-2 text-center">
            <div className="divider"></div>
            Logged in as{" "}
            <span className="font-bold">{`${
              (userRole?.role === "user" && "Customer") ||
              (userRole?.role === "admin" && "Admin") ||
              "N/A"
            }`}</span>
          </footer>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
