import "./Footer.css"
import {
  FaLinkedinIn,
  FaGithub,
  FaInstagram
} from "react-icons/fa";

function Footer() {
  return (
    <footer className="footer" id="contact">
      <div className="footer-content">
        <p>© 2026 <strong>FingerTalk</strong>. All rights reserved.</p>
        <p>
          Email: <a href="https://mail.google.com/mail/?view=cm&fs=1&to=team.fingertalk@gmail.com" target="_blank" rel="noopener noreferrer">team.fingertalk@gmail.com</a> |
          Phone: 9767122970
        </p>
        {/* Social Media Links */}
        <div className="social-icons">

          <a href="/" target="_blank" rel="noreferrer">
            <FaLinkedinIn />
          </a>

          <a
            href="https://github.com/Viraj1923/FingerTalk-Sign-Language-Recognition"
            target="_blank"
            rel="noreferrer"
          >
            <FaGithub />
          </a>

          <a href="/" target="_blank" rel="noreferrer">
            <FaInstagram />
          </a>

        </div>
      </div>
    </footer>
  );
}

export default Footer;
