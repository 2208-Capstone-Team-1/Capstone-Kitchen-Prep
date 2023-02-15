import GitHubIcon from '@mui/icons-material/GitHub';
import { Link } from '@mui/material';
import "./footer.css"

const Footer = () => {

  return (
    <footer>
      <div className="footer">
        <ul>
          <div className= "footer_groups">
            <div className= "names">
              <h3>Brought to you by: </h3>
              <Link href="https://github.com/antongeny" target="_blank">
                <li>Anton</li>
              </Link>
              <Link href="https://github.com/emccormick16" target="_blank">
                <li>Ed</li>
              </Link>
              <Link href="https://github.com/marchingkoala" target="_blank">
                <li>Carmin</li>
              </Link>
              <Link href="https://github.com/lena-A-Al" target="_blank">
                <li>Lena</li>
              </Link>
              <Link href="https://github.com/linglin1638078" target="_blank">
                <li>Lily</li>
              </Link>
              <Link href="https://github.com/2208-Capstone-Team-1/Capstone-Kitchen-Prep" target="_blank">
                <GitHubIcon/>Our Main Repo
              </Link>
            </div>
            <div className="technologies">
              <h3>Alexa Developer Console</h3>
              <li>Javascript</li>
              <li>React</li>
              <li>Typescript</li>
              <li>Webpack</li>
              <li>Sequelize</li>
              <li>MUI</li>
            </div>
          </div>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
