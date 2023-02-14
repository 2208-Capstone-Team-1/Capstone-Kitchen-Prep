import { useSelector, useDispatch } from "react-redux";
import { resetUser } from "../../store/userSlice";
import { RootState } from "../../store";
import "./home.css";
import Chat from "../Firebase/Chat";

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
        <div className="home_copyline">
          <p className="home_alexa">
            Click the microphone below to get started with Alexa!
          </p>
        </div>
        <div className="home_mic">
          <button style={{ borderRadius: "50%", padding: "10px" }}>
            <img
              id="microphone"
              src="/static/microphone.png"
              alt="microphone"
              width="100"
              height="100"
            ></img>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
