import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import React, {useEffect} from "react";
import { TableBody, TableRow, TableCell } from "@mui/material";
import { RootState } from "../../store";
// import AdminSingleUserTable from "./AdminSingleUserTable";
import { setUsers } from "../../store/userSlice";



const AllUsers: React.FC = () => {

  const dispatch = useDispatch();

  const { users } = useSelector((state: RootState) => state.user);

  const fetchAllUsers = async () => {
    try{
      const fetchAllUsers = await axios.get("/api/users");
      dispatch(setUsers(fetchAllUsers.data));
    } catch (err) {
      //
    }
  }

useEffect(() => {
  fetchAllUsers;
}, []);

  return(
    <TableBody>
      <TableRow key={user.id}>
          {users.length
            ? users.map((user) => (
              <TableCell>{user.email}</TableCell>


              // <UsersTable
              //   StyledTableCell={StyledTableCell}
              //   StyledTableRow={StyledTableRow}
              //   key={user.id}
              //   user={user}
              // />
          )): ""}
        </TableRow>
    </TableBody>
  )
}

export default AllUsers;