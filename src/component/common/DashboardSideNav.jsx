import { MdOutlineNoteAdd } from "react-icons/md";
import { NavLink } from "react-router";

const DashboardSideNav = ({ userRole }) => {
  if (userRole?.role === "user") {
    return (
      <>
        {/* Sidebar content here */}
        {/* <li>
          <NavLink  className='dashboard' to="create-product">
            <MdOutlineNoteAdd className="mr-2" />
            Add Products
          </NavLink>
        </li> */}
      </>
    );
  }

  if (userRole?.role === "admin") {
    return (
      <>
        <li>
          <NavLink to="admin/add-product">
            <MdOutlineNoteAdd className="mr-2" />
            Add Products
          </NavLink>
        </li>
      </>
    );
  }
};

export default DashboardSideNav;
