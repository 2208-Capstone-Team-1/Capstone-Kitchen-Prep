import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../store";

const UserPage = () => {
  const { user } = useSelector((state: RootState) => state.user);

  return (
    <div>
      <div>
        <h1>Account Page</h1>
        <h2>Welcome {user.email}!!</h2>
        <Link to={`/`}>Home</Link>
      </div>
    </div>
  );
};

export default UserPage;
