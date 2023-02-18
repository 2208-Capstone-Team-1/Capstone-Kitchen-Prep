import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { TableBody, Table, TableRow, TableCell } from "@mui/material";
import { RootState } from "../../store";
import AdminSingleUserTable from "./AdminSingleUserTable";
import { setUsers } from "../../store/userSlice";
import MuiLoader from "../MuiLoader";

interface Props {
  user: { id: string };
}

const AdminUsersList: React.FC<Props> = ({ user }) => {
  interface userType {
    id: string;
    first_name: string;
    last_name: string;
    password: string;
    email: string;
    phoneNumber: string;
    isAdmin: boolean;
  }

  const dispatch = useDispatch();

  const { users } = useSelector((state: RootState) => state.user);
  const [loading, setloading] = useState(false);

  const fetchAllUsers = async () => {
    try {
      const fetchAllUsers = await axios.get(`/api/users`);
      dispatch(setUsers(fetchAllUsers.data));
      setloading(true);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  if (!loading) {
    return (
      <div className="loadingContainer">
        <MuiLoader />
      </div>
    );
  }

  return (
    <Table>
      <TableBody>
        <TableRow>
          <TableCell>Action</TableCell>
          <TableCell>First Name</TableCell>
          <TableCell>Last Name</TableCell>
          <TableCell>Email</TableCell>
          <TableCell>Phone Number</TableCell>
          <TableCell>Admin Status</TableCell>
        </TableRow>

        {users.map((user: userType) => (
          <AdminSingleUserTable user={user} key={user.id} />
        ))}
      </TableBody>
    </Table>
  );
};

export default AdminUsersList;
