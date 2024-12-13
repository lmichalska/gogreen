import React, { useState } from "react";
import "./Pages.css";

const HomePage = () => {
  const [activeTab, setActiveTab] = useState("paper");
  const [searchQuery, setSearchQuery] = useState("");

  const binDetails = {
    paper: {
      title: "Paper Recycling",
      description: "Recycle newspapers, magazines, cardboard, and office paper. Avoid soiled paper like greasy pizza boxes or wet paper products.",
      tips: [
        "Flatten cardboard boxes to save space.",
        "Remove staples or tape if possible.",
        "Do not recycle wet or heavily soiled paper.",
      ],
    },
    plastic: {
      title: "Plastic Recycling",
      description: "Recycle plastic bottles, containers, and bags. Avoid styrofoam, plastic wrap, or items with food residue.",
      tips: [
        "Rinse out bottles and containers.",
        "Check for the recycling number on plastics.",
        "Avoid single-use plastics where possible.",
      ],
    },
    trash: {
      title: "Mixed Trash",
      description: "Place non-recyclable items like food scraps, soiled paper, and non-recyclable plastics in this bin.",
      tips: [
        "Compost food scraps instead of throwing them away, if possible.",
        "Keep mixed trash bags sealed to prevent odors.",
        "Do not put recyclables in the trash bin.",
      ],
    },
  };

  const items = [
    { name: "Newspaper", bin: "paper" },
    { name: "Plastic Bottle", bin: "plastic" },
    { name: "Cardboard", bin: "paper" },
    { name: "Styrofoam", bin: "trash" },
    { name: "Apple Core", bin: "trash" },
    { name: "Plastic Bag", bin: "plastic" },
    { name: "Greasy Pizza Box", bin: "trash" },
  ];

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="home-page">
      <header className="header">
        <h1>Recycling Guide</h1>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search for items..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button onClick={() => setSearchQuery("")}>Clear</button>
        </div>
      </header>

      <main>
        {searchQuery ? (
          <section className="search-results">
            <h2>Search Results</h2>
            {filteredItems.length > 0 ? (
              <ul>
                {filteredItems.map((item, index) => (
                  <li key={index}>
                    <strong>{item.name}</strong> belongs in the{" "}
                    <span className={item.bin + "-text"}>
                      {item.bin.toUpperCase()} bin
                    </span>
                    .
                  </li>
                ))}
              </ul>
            ) : (
              <p>No matching items found.</p>
            )}
          </section>
        ) : (
          <>
            <div className="tabs">
              <button
              aria-label="information about paper trash"
                className={activeTab === "paper" ? "active" : ""}
                onClick={() => setActiveTab("paper")}
              >
                Paper
              </button>
              <button aria-label="information about plastic trash"
                className={activeTab === "plastic" ? "active" : ""}
                onClick={() => setActiveTab("plastic")}
              >
                Plastic
              </button>
              <button aria-label="information about mixed trash"
                className={activeTab === "trash" ? "active" : ""}
                onClick={() => setActiveTab("trash")}
              >
                Mixed Trash
              </button>
            </div>

            <section className="info-section">
              <h2>{binDetails[activeTab].title}</h2>
              <p>{binDetails[activeTab].description}</p>
              <h3>Tips:</h3>
              <ul>
                {binDetails[activeTab].tips.map((tip, index) => (
                  <li key={index}>{tip}</li>
                ))}
              </ul>
            </section>
          </>
        )}
      </main>
    </div>
  );
};

export default HomePage;
