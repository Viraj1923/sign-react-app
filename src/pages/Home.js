import React, { useEffect } from "react";
// import { FaHandsHelping } from "react-icons/fa";
import { FaInfoCircle } from "react-icons/fa";
// import { FcAbout } from "react-icons/fc";
import { Element } from "react-scroll";
import { Link } from "react-router-dom";
import logo from "../assets/heroLogo.png";

import "./Home.css";
import AOS from "aos";
import "aos/dist/aos.css";
import '@fortawesome/fontawesome-free/css/all.min.css';

const Home = () => {
  // Initialize scroll animation on mount
  useEffect(() => {
    AOS.init({ duration: 1000, once: false });
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <Element name="home" className="hero-section">
        <div className="hero-content" data-aos="fade-up">
          <img src={logo} alt="Logo" className="hero-icon" />
          <h1>Welcome to FingerTalk: Where Gestures Become Words</h1>
          <p>
            Bridging the communication gap for the hearing and speech impaired using real-time AI-based gesture recognition.
            Our mission is to make technology inclusive and empowering for all.
          </p>

          {/* Navigation to Detect Page */}
          <Link to="/detect" className="start-button" data-aos="fade-up" data-aos-delay="300">
            Let’s Start
          </Link>
        </div>
      </Element>

      {/* About Section */}
      <Element name="about" className="about-section">
        <div className="about-content" data-aos="fade-up">
          {/* <FcAbout className="about-icon" data-aos="zoom-in" data-aos-delay="200" /> */}
          <FaInfoCircle className="about-icon" data-aos="zoom-in" data-aos-delay="200" />
          <h2>About Our Project</h2>
          <p>
            FingerTalk is an AI-powered sign language recognition system that captures live hand gestures through a webcam and translates them into real-time text and speech output. The platform supports both American Sign Language (ASL) and Indian Sign Language (ISL), helping bridge communication barriers for speech and hearing-impaired individuals.
          </p>

          {/* Project Features */}
          <div className="features-section" data-aos="fade-up">
            <h3>Features</h3>

            <div className="feature-item">
              <h4>What is Sign Language?</h4>
              <p>
                A visual-manual communication method using gestures, expressions, and body movement, typically used by the deaf and hard of hearing.
              </p>
            </div>

            <div className="feature-item">
              <h4>Project Objective</h4>
              <p>
                To build a real-time recognition system converting sign gestures to text and speech, enhancing accessibility.
              </p>
            </div>

            <div className="feature-item">
              <h4>Technology Stack</h4>
              <p>
                <strong>Frontend:</strong> React.js  
                <strong>Backend:</strong> FastAPI  
                <strong>Languages:</strong> Python, JavaScript  
                <strong>Libraries:</strong> TensorFlow, MediaPipe, OpenCV  
                <strong>Model:</strong> CNN + MobileNet  
                <strong>Deployment:</strong> Vercel + Hugging Face Spaces
              </p>
            </div>

            <div className="feature-item">
              <h4>Applications</h4>
              <p>
                Enables real-time communication assistance in education, healthcare, public services, and inclusive workplaces through gesture-to-text and gesture-to-speech translation.
              </p>
            </div>

            <div className="feature-item">
              <h4>Impact</h4>
              <p>
                Promotes accessibility, digital inclusion, and independent communication for individuals with hearing or speech impairments.
              </p>
            </div>
          </div>
        </div>
      </Element>

      {/* Team Section */}
      <Element name="team" className="team-section">
        <div className="team-content" data-aos="fade-up">
          <h2>Meet Our Team</h2>
          <div className="team-grid">
            <div className="team-member" data-aos="fade-up">
              <img src="/images/onkar_giri.jpg" alt="Onkar Giri" />
              <h4>Onkar Giri</h4>
              <p>Model Creation & Integration</p>
            </div>
            <div className="team-member" data-aos="fade-up" data-aos-delay="100">
              <img src="/images/viraj_mulik.jpg.png" alt="Viraj Mulik" />
              <h4>Viraj Mulik</h4>
              <p>Backend & Model Integration</p>
            </div>
            <div className="team-member" data-aos="fade-up" data-aos-delay="200">
              <img src="/images/viraj_patole.jpg" alt="Viraj Patole" />
              <h4>Viraj Patole</h4>
              <p>Frontend Developer</p>
            </div>
            <div className="team-member" data-aos="fade-up" data-aos-delay="300">
              <img src="/images/harshwardhan_killedar.jpg" alt="Harshvardhan Killedar" />
              <h4>Harshvardhan Killedar</h4>
              <p>Documentation Head</p>
            </div>
            <div className="team-member" data-aos="fade-up" data-aos-delay="300">
              <img src="\images\digvijay_pawar.jpg" alt="Digvijay Pawar" />
              <h4>Digvijay Pawar</h4>
              <p>Documentation </p>
            </div>
          </div>
        </div>
      </Element>

      {/* Footer Section */}
      
    </div>
  );
};

export default Home;
