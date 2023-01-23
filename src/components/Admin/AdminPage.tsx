import React from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import AllUsers from "./AdminUsersList";

/** Admin page shows a list of users. An Admin can edit a user's profile information.
*  🔗 http://localhost:3000/admin
*/

//! Need to add axios posts to edit user information.


const AdminPage = () => {

  //Custom Hooks
  // const dispatch = useDispatch();

  //Selectors
  // const {allUsers} = useSelector((state) => state.allUsers);

  return(
    <div>
      <p>ADMIN</p>
      <AllUsers/>
    </div>
  )
}

export default AdminPage;