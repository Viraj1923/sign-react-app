import React, { useEffect } from "react";
import { Element } from "react-scroll";
import { Link } from "react-router-dom";

import {
  FaBrain,
  FaMicrophone,
  FaGlobe,
  FaBolt,
  FaPlay,
  FaChartLine
} from "react-icons/fa";

import {
  SiReact,
  SiFastapi,
  SiOpencv,
  SiTensorflow
} from "react-icons/si";

import logo from "../assets/heroLogo.png";

// Team Photos
import member1 from "../assets/team1.png";
import member2 from "../assets/team2.jpg";
import member3 from "../assets/team3.jpg";
import member4 from "../assets/team4.jpg";
import member5 from "../assets/team5.jpg";

import "./Home.css";

import AOS from "aos";
import "aos/dist/aos.css";

const Home = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true
    });
  }, []);

  const features = [
    {
      icon: <FaBolt />,
      title: "Real-Time Detection",
      desc: "Instant sign recognition from webcam feed."
    },
    {
      icon: <FaMicrophone />,
      title: "Speech Output",
      desc: "Natural voice generation from signs."
    },
    {
      icon: <FaGlobe />,
      title: "ASL + ISL Support",
      desc: "Supports multiple sign languages."
    },
    {
      icon: <FaBrain />,
      title: "AI Powered",
      desc: "Deep learning optimized for inference."
    }
  ];

  const stats = [
    { value: "95%+", label: "Model Accuracy" },
    { value: "< 100ms", label: "Inference Speed" },
    { value: "29+", label: "Supported Signs" },
    { value: "2", label: "Sign Languages" }
  ];

  const tech = [
    {
      icon: <SiReact />,
      name: "React + CSS"
    },
    {
      icon: <SiFastapi />,
      name: "FastAPI"
    },
    {
      icon: <SiOpencv />,
      name: "OpenCV + MediaPipe"
    },
    {
      icon: <SiTensorflow />,
      name: "TensorFlow"
    }
  ];

  const team = [
    {
      image: member2,
      name: "Onkar Giri",
      role: "Model Creation & Integration",
      linkedin: "https://www.linkedin.com/in/onkargiri29/"
    },
    {
      image: member1,
      name: "Viraj Mulik",
      role: "Backend, Deployment & Model Integration",
      linkedin: "https://www.linkedin.com/in/viraj-mulik-9b4b8437a/"
    },
    {
      image: member3,
      name: "Viraj Patole",
      role: "Frontend Development",
      linkedin: "https://www.linkedin.com/in/viraj-patole-7b66a0256/"
    },
    {
      image: member4,
      name: "Harshwardhan Killedar",
      role: "Documentation",
      linkedin: "https://www.linkedin.com/in/harshvardhan-killedar-078260257/"
    },
    {
      image: member5,
      name: "Digvijay Pawar",
      role: "Documentation & App Testing",
      linkedin: "https://www.linkedin.com/in/digvijaypawar8/"
    }
  ];

  return (
    <>
      {/* HERO */}
      <Element name="home" className="hero-section">
        <div className="hero-content">

          <div className="hero-top">

            <img
              src={logo}
              alt=""
              className="hero-icon"
            />

            <div className="hero-badge">
              AI • Accessibility • Computer Vision
            </div>

          </div>

          <h1>
            Real-Time Sign Language Recognition
          </h1>

          <p>
            Transform hand gestures into voice and text
            using real-time AI.
          </p>

          <div className="hero-buttons">

            <Link
              to="/detect"
              className="primary-btn"
            >
              Try Live Demo
            </Link>

            <a
              href="#demo"
              className="secondary-btn"
            >
              Watch Demo
            </a>

          </div>
        </div>
      </Element>

      {/* FEATURES */}
      <Element name="features" className="features-section">

        <div className="section-header">
          <h2>Core Features</h2>
        </div>

        <div className="feature-grid">

          {features.map((item, i) => (
            <div className="feature-card" key={i}>

              <div className="feature-icon">
                {item.icon}
              </div>

              <h3>{item.title}</h3>

              <p>{item.desc}</p>

            </div>
          ))}

        </div>

      </Element>

      {/* STATS */}
      <Element name="stats" className="stats-section">

        <div className="section-header">
          <h2>Performance Metrics</h2>
          <p>
            Built for speed, accuracy and accessibility.
          </p>
        </div>

        <div className="stats-grid">

          {stats.map((item, i) => (
            <div className="stat-card" key={i}>
              <h3>{item.value}</h3>
              <p>{item.label}</p>
            </div>
          ))}

        </div>

      </Element >

      {/* TECH */}
      <Element name="technology" className="tech-section" >

        <div className="section-header">
          <h2>Technology Stack</h2>
        </div>

        <div className="tech-grid">

          {tech.map((item, i) => (
            <div className="tech-card" key={i}>

              <div className="tech-logo">
                {item.icon}
              </div>

              <h3>{item.name}</h3>

            </div>
          ))}

        </div>

      </Element >

      {/* TEAM */}
      <Element name="team" className="team-section">

        <div className="section-header">
          <h2>Meet The Team</h2>
        </div>

        <div className="team-grid">

          {team.map((member, i) => (
            <div
              className="team-card"
              key={i}
              onClick={() =>
                window.open(member.linkedin, "_blank")
              }
            >

              <img
                src={member.image}
                alt=""
                className="team-img"
              />

              <h3>{member.name}</h3>

              <p>{member.role}</p>

            </div>
          ))}

        </div>

      </Element >

      {/* CTA */}
      <Element name="demo" className="cta-section">


        <FaPlay className="demo-icon" />

        <h2>
          Ready to Experience FingerTalk?
        </h2>

        <Link
          to="/detect"
          className="primary-btn"
        >
          Start Demo
        </Link>

      </Element >
    </>
  );
};

export default Home;