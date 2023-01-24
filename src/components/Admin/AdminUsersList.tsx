import { useDispatch, useSelector } from "react-redux";
import AdminSingleUserTable from "./AdminSingleUserTable";



const AllUsers = () => {

  const dispatch = useDispatch();
  // const { users } = useSelector
  const { users } = useSelector((state) => state.user);

  const fetchAllUsers = async () => {
    try{
      const fetchAllUsers = await axios.get("/api/users");
      // dispatch(setUsers(fetchAllUsers.data));
      // !need to add setUsers and allUsers initial state to the store in userSlice.ts


    }

  }

  return(

    <AdminSingleUserTable />
  )
}

export default AllUsers;