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
        <li>
          <NavLink  className='dashboard' to="add-package">
            <MdOutlineNoteAdd className="mr-2" />
            Add Package
          </NavLink>
        </li>
        <li>
          <NavLink  className='dashboard' to="add-stories">
            <MdAddCircleOutline className="mr-2" />
            Add Products
          </NavLink>
        </li>
        <li>
          <NavLink  className='dashboard' to="my-bookings">
            <RiCalendarEventFill className="mr-2" />
            Order Details
          </NavLink>
        </li>
        <li>
          <NavLink  className='dashboard' to="manage-stories">
            <VscCommentDiscussion className="mr-2" />
            Manage Stories
          </NavLink>
        </li>
        <li>
          <NavLink  className='dashboard' to="manage-stories">
            <VscCommentDiscussion className="mr-2" />
            Manage Stories
          </NavLink>
        </li>
      </>
    );
  }

  // if (userRole?.role === "admin") {
  //   return (
  //     <>
  //       <li>
  //         <NavLink  className='dashboard' to="add-package">
  //           <MdOutlineNoteAdd className="mr-2" />
  //           Add Package
  //         </NavLink>
  //       </li>
  //       <li>
  //         <NavLink  className='dashboard' to="manage-users">
  //           <RiGroupLine className="mr-2" />
  //           Manage Users
  //         </NavLink>
  //       </li>
  //       <li>
  //         <NavLink  className='dashboard' to="manage-candidates">
  //           <BiUserCircle className="mr-2" />
  //           Manage Candidates
  //         </NavLink>
  //       </li>
  //     </>
  //   );
  // }
};

export default DashboardSideNav;