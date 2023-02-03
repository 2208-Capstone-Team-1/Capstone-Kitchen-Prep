import { useSelector, useDispatch } from "react-redux";
import { resetUser } from "../../store/userSlice";
import { RootState } from "../../store";
import "./home.css";

const Home = () => {
  const { user } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  const logout = () => {
    window.localStorage.removeItem("token");
    dispatch(resetUser());
  };

  return (
    <div>
      <div className="home_main">
        <div className="home_image">
          <img src="../static/Foodphotos/mainPage_photo3.jpg" width="80%" />
        </div>
        <div className="home_copyline">
          <p className="home_ptag">
            Join Chef's Kiss and enjoy curated cuisines at home!
          </p>
        </div>
        <div className="home_mic">
          <p>PLACE HOLDER FOR MIC</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
