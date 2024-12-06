import "./Pages.css";
import React from "react";
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  // Navigate to contact page
  const handleExploreNavigate = () => {
    navigate('/contact');
  };

  // Navigate to specific volunteer opportunity details
  const handleLearnMore = (path) => {
    navigate(path);
  };

  return (
    <main>
      {/* Banner Section */}
      <section className="hero" aria-labelledby="hero-heading">
        <div className="hero-content">
          <h1 id="hero-heading">Volunteer in Aarhus</h1>
          <p>
            Discover opportunities to give back, make a difference, and connect with your community.
          </p>
          <button 
            onClick={handleExploreNavigate} 
            className="btn-primary" 
            aria-label="click to see volunteer work in Aarhus"
          >
            Explore Opportunities
          </button>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about">
        <h2>About Us</h2>
        <p>
          We connect passionate volunteers with meaningful projects in Aarhus.
          Our mission is to make volunteering accessible, impactful, and
          inclusive for everyone.
        </p>
      </section>

      {/* Opportunities Section */}
      <section id="opportunities" className="opportunities">
        <h2>Volunteer Opportunities</h2>
        <ul>
          <li>
            <h3>Community Garden</h3>
            <p>
              Help maintain Aarhus' urban green spaces and grow fresh produce for the community.
            </p>
            <button onClick={() => handleLearnMore('/details/garden')} className="btn-secondary">
              Learn More
            </button>
          </li>
          <li>
            <h3>Language Tutoring</h3>
            <p>
              Support newcomers to Aarhus by helping them learn Danish or English.
            </p>
            <button onClick={() => handleLearnMore('/details/tutoring')} className="btn-secondary">
              Learn More
            </button>
          </li>
          <li>
            <h3>Event Volunteering</h3>
            <p>
              Be part of exciting community events and festivals in Aarhus.
            </p>
            <button onClick={() => handleLearnMore('/details/events')} className="btn-secondary">
              Learn More
            </button>
          </li>
        </ul>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact">
        <h2>Get in Touch</h2>
        <p>Have questions? We're here to help!</p>
        <button onClick={() => handleExploreNavigate()} className="btn-primary">
          Contact Us
        </button>
      </section>
    </main>
  );
};

export default HomePage;
