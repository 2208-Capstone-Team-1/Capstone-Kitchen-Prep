import "./about.css";

const AboutPage = () => {
  return (
    <div className="about">
      <p className="about_p">Chef's Kiss is a kitchen helper application that can help you decide what to make based on the ingredients in your fridge!</p>
      <div className="withAlexa">
        <h2 className="aboutAlexaH2">How to use with Alexa</h2>
        <div className="AboutalexaContainer">
          <div className="AboutAlexbox">
            <link rel="preload" href="../static/instructionIcon-01.jpg" as="image"/>
            <img src="../static/instructionIcon-01.jpg" width="220px" alt="image of a woman sitting with her phone" />
            <p className="instruction_p">Activate by saying "Alexa, open Chef's Kiss"</p>
          </div>
          <div className="AboutAlexbox">
            <link rel="preload" href="../static/instructionIcon-02.jpg" as="image"/>
            <img src="../static/instructionIcon-02.jpg" width="220px" alt="image of two people cooking together" />
            <p className="instruction_p">Find recipes and start cooking with the Chef</p>
          </div>
          <div className="AboutAlexbox">
            <link rel="preload" href="../static/instructionIcon-05.jpg" as="image"/>
            <img src="../static/instructionIcon-05.jpg" width="220px"  alt="image of a woman standing beside a huge smartphone"/>
            <p className="instruction_p">You can find real-time chatlog in Alexa-chat tab</p>
          </div>
          <div className="AboutAlexbox">
            <link rel="preload" href="../static/instructionIcon-03.jpg" as="image" />
            <img src="../static/instructionIcon-03.jpg" width="220px" alt="image of a woman with a plate of sliced apples" />
            <p className="instruction_p">Enjoy your meal!</p>
          </div>
        </div>
        <h2 className="aboutAlexaH2">How to use as Website</h2>
        <div className="AboutalexaContainer">
          <div className="AboutAlexbox">
            <link rel="preload" href="../static/instructionIcon-5.jpg" as="image" />
            <img src="../static/instructionIcon-5.jpg" width="220px" alt="a woman with a laptop"/>
            <p className="instruction_p">You can enjoy the website on its own</p>
          </div>
          <div className="AboutAlexbox">
            <link rel="preload" href="../static/instructionIcon-06.jpg" as="image" />
          <img src="../static/instructionIcon-06.jpg" width="220px" alt="a woman with charts"/>
          <p className="instruction_p">View and Edit your account profile</p>
          </div>
          <div className="AboutAlexbox">
            <link rel="preload" href="../static/instructionIcon-07.jpg" as="image" />
            <img src="../static/instructionIcon-07.jpg" width="220px" alt="woman with flying notes in the air"/>
            <p className="instruction_p">Enjoy random recipe of the day!</p>
          </div>
            <div className="AboutAlexbox">
              <link rel="preload" href="../static/instructionIcon-08.jpg" as="image" />
            <img src="../static/instructionIcon-08.jpg" width="220px" alt="two people sitting on floating windows"/>
            <p className="instruction_p">Chat with fellow users and share recipes</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
