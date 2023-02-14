import GitHubIcon from '@mui/icons-material/GitHub';
import { Link } from '@mui/material';

const Footer = () => {

  return (
    <footer>
      <div className="footer">
        <ul>
          <li>Brought to you by: </li>

          <Link href="https://github.com/antongeny" target="_blank">
            <li>
              Anton
            </li>
          </Link>
          <Link href="https://github.com/emccormick16" target="_blank">
            <li>
              Ed
            </li>
          </Link>
          <Link href="https://github.com/marchingkoala" target="_blank">
            <li>
              Carmin
            </li>
          </Link>
          <Link href="https://github.com/lena-A-Al" target="_blank">
            <li>
              Lena
            </li>
          </Link>
          <Link href="https://github.com/linglin1638078" target="_blank">
            <li>
              Lily
            </li>
          </Link>
          <Link href="https://github.com/2208-Capstone-Team-1/Capstone-Kitchen-Prep" target="_blank">
            <GitHubIcon/>Our Main Repo
          </Link>
        </ul>
        <ul>*Please click on a team member to see their github profile </ul>
      </div>
    </footer>
  );
};

export default Footer;
