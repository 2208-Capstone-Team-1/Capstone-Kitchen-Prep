import { useContext, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import axios from "axios";
import { setUser, resetUser } from "../store/userSlice";
import { RootState } from "../store";
import RoutesComponent from "./routes/RoutesComponent";
import SocketContext from "./contexts/SocketContext";
import "./main.css";

export interface IApplicationProps {}

const App: React.FunctionComponent<IApplicationProps> = (props) => {
  const { user } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const { socket, uid, users } = useContext(SocketContext).SocketState;

  const loginWithToken = async () => {
    const token = window.localStorage.getItem("token");
    if (token) {
      const response = await axios.get("/api/auth", {
        headers: {
          authorization: token,
        },
      });

      dispatch(setUser(response.data));
    }
  };

  const logout = () => {
    window.localStorage.removeItem("token");
    dispatch(resetUser());
  };

  useEffect(() => {
    loginWithToken();
  }, []);

  return (
    <div>
      <div className="body">
        <div className="main_topbar">
          <p className="main_ptag">place holder</p>
          <p className="main_ptag">
            {!user.id ? (
              <Link to="/login">
                <Button variant="contained">Login</Button>
              </Link>
            ) : (
              user.id && (
                <Button variant="contained" onClick={logout}>
                  Logout
                </Button>
              )
            )}
          </p>
        </div>
        <div className="main_logoPlace">
          <img
            id="logo"
            src="/static/ChefsKissLogo.png"
            alt="chef's kiss logo"
            width="120"
            height="150"
          ></img>
          <a className="mainLogoTxt" href="/">
            <span></span>Chef's Kiss
          </a>

          <img
            id="logo"
            src="/static/ChefsKissLogo.png"
            alt="chef's kiss logo"
            width="120"
            height="150"
          ></img>
        </div>
        <div>
          <nav className="navbar">
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/randomRecipe">Recipe of the Day </Link>
            {/*only logged-in user can view below tabs */}
            {user.id && (
              <>
                <Link to="/user">Account</Link>
                <Link to="/savedRecipe">Saved Recipes</Link>
                <Link to="/userFridge">Fridge</Link>
              </>
            )}
            {user.isAdmin && <Link to="/admin">Admin</Link>}
          </nav>
          <RoutesComponent />
        </div>
      </div>
      <div>
        <h2>Socket IO Information:</h2>
        <p>
          Your user ID: <strong>{uid}</strong>
          <br />
          Users online: <strong>{users.length}</strong>
          <br />
          Socket ID: <strong>{socket?.id}</strong>
          <br />
        </p>
      </div>
    </div>
  );
};

export default App;
