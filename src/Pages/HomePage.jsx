import React, { useState, useEffect } from "react";
import { ref, get } from "firebase/database";
import { database } from "../firebase-config";
import "./Pages.css";

const HomePage = () => {
  const [activeBin, setActiveBin] = useState("residual_waste");
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
          const bins = binsSnapshot.val();
          setBinDetails(bins);

          // Ensure the default bin is valid
          if (!bins["residual_waste"]) {
            console.warn("Default bin 'residual_waste' not found. Defaulting to the first available bin.");
            setActiveBin(Object.keys(bins)[0]); // Set to the first bin if residual_waste doesn't exist
          }
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

  // Extract bin types from binDetails for the dropdown
  const binTypes = Object.entries(binDetails).map(([id, details]) => ({
    id,
    name: details.type, // Use the "type" field for display
  }));

  const activeBinDetails = binDetails[activeBin];

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
            {/* Dropdown for bin selection */}
            <div className="dropdown">
              <label htmlFor="bin-select">Select Bin Type: </label>
              <select
                id="bin-select"
                value={activeBin}
                onChange={(e) => setActiveBin(e.target.value)}
              >
                {binTypes.map(({ id, name }) => (
                  <option key={id} value={id}>
                    {name}
                  </option>
                ))}
              </select>
            </div>

            <section className="info-section">
              {activeBinDetails ? (
                <>
                  <h2>{activeBinDetails.type}</h2>
                  <p>{activeBinDetails.description}</p>
                  <ul>
                    {activeBinDetails.payAttention?.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                  <h3>Should Go:</h3>
                  <ul>
                    {activeBinDetails.shouldGo?.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>

                  <h3>Shouldn't Go:</h3>
                  <ul>
                    {activeBinDetails.shouldNotGo?.map((item, index) => (
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
