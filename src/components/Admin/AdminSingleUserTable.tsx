import React from "react";
import { Link } from "react-router-dom";
import { Button, TableCell, TableRow } from "@mui/material";


interface userPropType {
  id: string;
  first_name: string;
  last_name: string;
  password: string;
  email: string;
  phoneNumber: string;
  isAdmin: boolean;
}

interface Props{
  user: userPropType;
}

const AdminSingleUserTable: React.FC<Props> = ({user}) => {


  //!Need to add user's information to a single table.


  return (
    <TableRow>
      <TableCell>
        <Button color = "primary" size = "small" variant="contained">
          Delete
        </Button>
      </TableCell>
      <TableCell>{user.first_name}</TableCell>
      <TableCell>{user.last_name}</TableCell>
      <TableCell>{user.email}</TableCell>
      <TableCell>{user.phoneNumber}</TableCell>
      <TableCell>{!user.isAdmin ? "Not Admin": "Admin"}</TableCell>
    </TableRow>
  )

}

export default AdminSingleUserTable;