import React, { useState, useEffect } from "react";
import { ref, get } from "firebase/database";
import { database } from "../firebase-config"; // Import your Firebase database config
import "./Pages.css";

const HomePage = () => {
  const [activeTab, setActiveTab] = useState("paper");
  const [searchQuery, setSearchQuery] = useState("");
  const [trashItems, setTrashItems] = useState([]);
  const [binDetails, setBinDetails] = useState({});
  const [loading, setLoading] = useState(true);  // New state for loading

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);  // Set loading to true when starting the fetch

      try {
        // Fetching trash items from Firebase
        const itemsSnapshot = await get(ref(database, "trash_items"));
        const binsSnapshot = await get(ref(database, "trash_cans"));

        // Log the data to see if it's being fetched correctly
        console.log("Items Snapshot:", itemsSnapshot.val());
        console.log("Bins Snapshot:", binsSnapshot.val());

        if (itemsSnapshot.exists()) {
          setTrashItems(
            Object.entries(itemsSnapshot.val()).map(([key, value]) => ({
              ...value,
              id: key,
            }))
          );
        } else {
          console.log("No trash items found");
          setTrashItems([]);  // Handle case when no items are found
        }

        if (binsSnapshot.exists()) {
          setBinDetails(binsSnapshot.val());
        } else {
          console.log("No trash cans data found");
          setBinDetails({});  // Handle case when no bins are found
        }
      } catch (error) {
        console.error("Error fetching data from Firebase:", error);
      } finally {
        setLoading(false);  // Set loading to false when done
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
        ) : (
          <>
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
                  {Object.keys(binDetails).length > 0 &&
                    Object.keys(binDetails).map((binType) => (
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
                  {binDetails[activeTab] && (
                    <>
                      <h2>{binDetails[activeTab].title}</h2>
                      <p>{binDetails[activeTab].description}</p>
                      <h3>Tips:</h3>
                      <ul>
                        {binDetails[activeTab].tips?.map((tip, index) => (
                          <li key={index}>{tip}</li>
                        ))}
                      </ul>
                    </>
                  )}
                </section>
              </>
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default HomePage;