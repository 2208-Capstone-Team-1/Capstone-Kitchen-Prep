import { useSelector } from "react-redux";
import AdminUsersList from "./AdminUsersList";
import { RootState } from "../../store";

const AdminPage = () => {
  const { user } = useSelector((state: RootState) => state.user);

  return (
    <div>
      <p>ADMIN</p>
      <AdminUsersList user={user} />
    </div>
  );
};

export default AdminPage;
