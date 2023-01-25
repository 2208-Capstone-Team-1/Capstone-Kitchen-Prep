import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import React, {useEffect, useState} from "react";
import { TableBody, Table, TableHead, TableRow, TableCell } from "@mui/material";
import { RootState } from "../../store";
import AdminSingleUserTable from "./AdminSingleUserTable";
import { setUsers } from "../../store/userSlice";

interface Props {
  user: { id: string;}
}

const  AdminUsersList: React.FC<Props> = ({user}) => {

  interface userType {
    id: string;
    email: string;
    isAdmin: boolean;
  }

  const dispatch = useDispatch();

  const { users } = useSelector((state: RootState) => state.user);
  const [loading, setloading] = useState(false);


  const fetchAllUsers = async () => {
    try{
      const fetchAllUsers = await axios.get(`/api/users`);
      dispatch(setUsers(fetchAllUsers.data));
      setloading(true)
      console.log(fetchAllUsers.data);
    } catch (err) {
      //
    }
  }

useEffect(() => {
  fetchAllUsers();
}, []);

if(!loading){ return( <div>ERROR!</div>)}

// <UsersTable
              //   StyledTableCell={StyledTableCell}
              //   StyledTableRow={StyledTableRow}
              //   key={user.id}
              //   user={user}
              // />
  return(
    <Table>
      <TableHead>

        <TableRow>
        </TableRow>
      </TableHead>
      <TableBody>
        {users.map((user: userType) => (
          <TableRow>{user.email}</TableRow>
          // <AdminSingleUserTable/>
        ))}
      </TableBody>
    </Table>

  )
}

export default AdminUsersList;