import "./Pages.css";
import React, { useState, useEffect } from "react";

const HomePage = () => {
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <main>
      {/* Banner Section */}
            {/* Theme Toggle Button */}
            <button onClick={toggleTheme} className="theme-toggle">
        Switch to {theme === "light" ? "Dark" : "Light"} Mode
      </button>
      <section className="hero" aria-labelledby="hero-heading">
        <div className="hero-content">
          <h1 id="hero-heading">Volunteer in Aarhus</h1>
          <p>
            Discover opportunities to give back, make a difference, and connect with your community.
          </p>
          <a href="#opportunities" className="btn-primary">
            Explore Opportunities
          </a>
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
            <a href="/details/garden" className="btn-secondary">
              Learn More
            </a>
          </li>
          <li>
            <h3>Language Tutoring</h3>
            <p>
              Support newcomers to Aarhus by helping them learn Danish or English.
            </p>
            <a href="/details/tutoring" className="btn-secondary">
              Learn More
            </a>
          </li>
          <li>
            <h3>Event Volunteering</h3>
            <p>
              Be part of exciting community events and festivals in Aarhus.
            </p>
            <a href="/details/events" className="btn-secondary">
              Learn More
            </a>
          </li>
        </ul>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact">
        <h2>Get in Touch</h2>
        <p>Have questions? We're here to help!</p>
        <a href="/contact" className="btn-primary">
          Contact Us
        </a>
      </section>
    </main>
  );
};

export default HomePage;
