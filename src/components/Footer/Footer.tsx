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
              <h3>Brought to you by:</h3>
              <ul>
                <li><Link href="https://github.com/antongeny" target="_blank">Anton</Link></li>               
                <li><Link href="https://github.com/emccormick16" target="_blank">Ed</Link></li>
                <li><Link href="https://github.com/marchingkoala" target="_blank">Carmine</Link></li>
                <li><Link href="https://github.com/lena-A-Al" target="_blank">Lena</Link></li>
                <li><Link href="https://github.com/linglin1638078" target="_blank">Lily</Link></li>
                <li><Link href="https://github.com/2208-Capstone-Team-1/Capstone-Kitchen-Prep" target="_blank">
                  <GitHubIcon/>Our Main Repo
                  </Link></li>
              </ul>
            </div>
            <div className="technologies">
              <h3>Technologies:</h3>
              <ul>
                <li>Alexa Developer Console</li>
                <li>Javascript</li>
                <li>React</li>
                <li>Firebase</li>
                <li>Typescript</li>
                <li>Webpack</li>
                <li>Sequelize</li>
                <li>MUI</li>
             </ul>
            </div>
          </div>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
