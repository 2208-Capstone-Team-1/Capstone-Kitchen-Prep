import { useSelector, useDispatch } from "react-redux";
import { resetUser } from "../../store/userSlice";
import { RootState } from "../../store";
import "./home.css";
import { resetChatlog } from "../../store/chatlogSlice";

const Home = () => {
  const { user } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  const logout = () => {
    window.localStorage.removeItem("token");
    dispatch(resetUser());
    dispatch(resetChatlog());
  };

  return (
    <div>
      <div className="home_main">
        <div className="home_image">
          <img
            src="../static/Foodphotos/mainPage_photo3.jpg"
            width="70%"
            height="75%"
          />
        </div>
        <div className="home_copyline">
          <p className="home_ptag">
            Join Chef's Kiss and enjoy curated cuisines at home!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
