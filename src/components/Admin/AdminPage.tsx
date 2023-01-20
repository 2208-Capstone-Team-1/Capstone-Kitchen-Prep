import React from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import SingleUserTable from "./AdminSingleUserTable";

/** Admin page shows a list of users
*
*/

//!use this to show the component or link to page
/*{user.isAdmin && (
    <Link className="link-item" to="/allUsers">
  All Active Users
  </Link>
)} */


const AllUsersTable = () => {

  //Custom Hooks
  // const dispatch = useDispatch();

  //Selectors
  // const {allUsers} = useSelector((state) => state.allUsers);

  return(
    <p>ADMIN</p>
    // <SingleUserTable/>
  )
}