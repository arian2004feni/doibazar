import { BiUserCircle } from "react-icons/bi";
import {
  MdAddCircleOutline,
  MdOutlineNoteAdd,
  MdTravelExplore,
} from "react-icons/md";
import {
  RiCalendarEventFill,
  RiGroupLine,
  RiRoadMapLine,
} from "react-icons/ri";
import { VscCommentDiscussion } from "react-icons/vsc";
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
          <NavLink  className='dashboard' to="create-product">
            <MdOutlineNoteAdd className="mr-2" />
            Add Products
          </NavLink>
        </li>
      </>
    );
  }
};

export default DashboardSideNav;