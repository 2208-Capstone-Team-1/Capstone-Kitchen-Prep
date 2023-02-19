import React, { useEffect, useState } from "react";
import { Button, TableCell, TableRow } from "@mui/material";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { setUsers } from "../../store/userSlice";

interface userPropType {
  id: string;
  first_name: string;
  last_name: string;
  password: string;
  email: string;
  phoneNumber: string;
  isAdmin: boolean;
}

interface Props {
  user: userPropType;
}

const AdminSingleUserTable: React.FC<Props> = ({ user }) => {
  const { users } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const [loading, setloading] = useState(false);

  const deleteUser = async () => {
    try {
      const userid = user.id;
      //delete single user
      await axios.delete(`/api/users/${userid}`);
      //refetch all users
      const fetchAllUsers = await axios.get(`/api/users`);
      //set users to store
      dispatch(setUsers(fetchAllUsers.data));
      setloading(true);
    } catch (error) {
      console.error(error);
    }
  };

  const toggleAdmin = async () => {
    try {
      const userid = user.id;
      // make the admin true if false, false if true
      const isAdmin = user.isAdmin === true ? false : true;
      // set variable to object
      const update = { isAdmin };
      //send updated admin info to back end
      await axios.put(`/api/users/${userid}`, update);
      //refetch all users
      const fetchAllUsers = await axios.get(`/api/users`);
      //set new users to store to rerender the page
      dispatch(setUsers(fetchAllUsers.data));
      setloading(true);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <TableRow>
      <TableCell>
        <Button
          onClick={deleteUser}
          color="primary"
          size="small"
          variant="contained"
        >
          Delete
        </Button>
      </TableCell>
      <TableCell>{user.first_name}</TableCell>
      <TableCell>{user.last_name}</TableCell>
      <TableCell>{user.email}</TableCell>
      <TableCell>{user.phoneNumber}</TableCell>
      <TableCell>
        {!user.isAdmin ? "Not Admin" : "Admin"}{" "}
        <Button
          onClick={toggleAdmin}
          color="primary"
          size="small"
          variant="contained"
        >
          Toggle Admin
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default AdminSingleUserTable;
