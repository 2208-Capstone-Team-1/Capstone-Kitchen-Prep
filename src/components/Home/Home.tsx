import "./home.css";

const Home = () => {
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
