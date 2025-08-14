import "./footer.css"

function Footer() {
    return ( 
      <footer className="footer" id="contact">
        <div className="footer-content">
          <p>© 2025 <strong>FingerTalk</strong>. All rights reserved.</p>
          <p>
            Email: <a href="https://mail.google.com/mail/?view=cm&fs=1&to=team.fingertalk@gmail.com" target="_blank" rel="noopener noreferrer">team.fingertalk@gmail.com</a> |
            Phone: 9767122970
          </p>
          {/* Social Media Links */}
          <div className="social-icons">
            <a href="#" target="_blank" rel="noreferrer" title="LinkedIn">
              <i className="fab fa-linkedin-in"></i>
            </a>
            <a href="https://github.com/Onkargiri29" target="_blank" rel="noreferrer" title="GitHub">
              <i className="fab fa-github"></i>
            </a>
            <a href="#" target="_blank" rel="noreferrer" title="Instagram">
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>
      </footer>
     );
}

export default Footer;