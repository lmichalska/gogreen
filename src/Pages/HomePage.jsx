import React, { useState, useEffect } from "react";
import { ref, get } from "firebase/database";
import { database } from "../firebase-config";
import "./Pages.css";

const HomePage = () => {
  const [activeTab, setActiveTab] = useState("paper");
  const [searchQuery, setSearchQuery] = useState("");
  const [trashItems, setTrashItems] = useState([]);
  const [binDetails, setBinDetails] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // References to database nodes
        const itemsRef = ref(database, "trash_items");
        const binsRef = ref(database, "trash_cans");

        // Fetching data from Firebase
        const [itemsSnapshot, binsSnapshot] = await Promise.all([
          get(itemsRef),
          get(binsRef),
        ]);

        // Processing trash items
        if (itemsSnapshot.exists()) {
          const items = itemsSnapshot.val();
          setTrashItems(
            Object.entries(items).map(([key, value]) => ({
              ...value,
              id: key,
            }))
          );
        } else {
          console.warn("No trash items found");
          setTrashItems([]);
        }

        // Processing trash bin details
        if (binsSnapshot.exists()) {
          setBinDetails(binsSnapshot.val());
        } else {
          console.warn("No trash bin details found");
          setBinDetails({});
        }
      } catch (error) {
        console.error("Error fetching data from Firebase:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filtering items based on the search query
  const filteredItems = trashItems.filter((item) =>
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
        {loading ? (
          <p>Loading...</p>
        ) : searchQuery ? (
          <section className="search-results">
            <h2>Search Results</h2>
            {filteredItems.length > 0 ? (
              <ul>
                {filteredItems.map((item) => (
                  <li key={item.id}>
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
              {Object.keys(binDetails).map((binType) => (
                <button
                  key={binType}
                  aria-label={`Information about ${binType} trash`}
                  className={activeTab === binType ? "active" : ""}
                  onClick={() => setActiveTab(binType)}
                >
                  {binType.charAt(0).toUpperCase() + binType.slice(1)}
                </button>
              ))}
            </div>

            <section className="info-section">
              {binDetails[activeTab] ? (
                <>
                  <h2>{binDetails[activeTab].type}</h2>
                  <p>{binDetails[activeTab].description}</p>

                  <h3>Should Go:</h3>
                  <ul>
                    {binDetails[activeTab].shouldGo?.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>

                  <h3>Shouldn't Go:</h3>
                  <ul>
                    {binDetails[activeTab].shouldNotGo?.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>

                  <h3>Pay Attention To:</h3>
                  <ul>
                    {binDetails[activeTab].payAttention?.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </>
              ) : (
                <p>No details available for this bin.</p>
              )}
            </section>
          </>
        )}
      </main>
    </div>
  );
};

export default HomePage;