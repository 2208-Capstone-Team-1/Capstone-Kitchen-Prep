import "./about.css";

const AboutPage = () => {
  return (
    <div className="about">
      <h2 className="about_h">Welcome to Chef's Kiss</h2>
      <p className="about_p">Chef's Kiss is a kitchen helper application that can help you decide
        meal of the day based on ingredients in your fridge!</p>
      <div className="withAlexa">
        <h2 className="aboutAlexaH2">How to use with Alexa</h2>
        <div className="AboutalexaContainer">
          <div className="AboutAlexbox">
            <img src="../static/instructionIcon-01.jpg" width="220px" />
            <p>Activate by saying "Alexa, open Chef's Kiss</p>
          </div>
          <div className="AboutAlexbox">
            <img src="../static/instructionIcon-02.jpg" width="220px"  />
            <p>Find recipes and start cooking with the Chef</p>
          </div>
          <div className="AboutAlexbox">
            <img src="../static/instructionIcon-05.jpg" width="220px"  />
            <p>You can find real-time chatlog in Alexa-chat tab</p>
          </div>
          <div className="AboutAlexbox">
            <img src="../static/instructionIcon-03.jpg" width="220px"  />
            <p>Enjoy your meal!</p>
          </div>
        </div>
        <h2 className="aboutAlexaH2">How to use as Website</h2>
        <div className="AboutalexaContainer">
          <div className="AboutAlexbox">
            <img src="../static/instructionIcon-04.jpg" width="350px"/>
            <p>You can also use it on this website</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
