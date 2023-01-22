import { profile } from "console";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../../store";
import "./user.css";

const UserPage = () => {

  const { user } = useSelector((state: RootState) => state.user);
  const profileArray = ["../static/profilePhoto/profile1.jpg", "../static/profilePhoto/profile2.jpg", "../static/profilePhoto/profile3.jpg","../static/profilePhoto/profile4.jpg", "../static/profilePhoto/profile5.jpg"]
  const randomNum = Math.floor(Math.random() * (profileArray.length - 1) + 0)

  return (
    <div className="user_body">
      <div className="user_secondBody">
        <h1 className="user_h1">Ready to get cooking?</h1>
        <div className="image_wrapper">
          <div className="image_box">
            <img className="user_image" alt="userImage" src={profileArray[randomNum]} />
          </div>
        </div>
        <h2 className="user_h2">Welcome {user.first_name} {user.last_name}</h2>
        <Link to="/user/userEdit">
          <button className="user_editButton">Edit Profile</button>
        </Link>
        <h2 className="user_h2">Saved Recipes</h2>
        <div className="savedRecipes">place holder</div>
      </div>
    </div>
  );
};

export default UserPage;
