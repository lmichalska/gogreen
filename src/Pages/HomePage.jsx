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
  const [searchPerformed, setSearchPerformed] = useState(false);

  // Fetch data from Firebase
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const itemsRef = ref(database, "trash_items");
        const binsRef = ref(database, "trash_cans");
        const [itemsSnapshot, binsSnapshot] = await Promise.all([
          get(itemsRef),
          get(binsRef),
        ]);

        // Check if trash items exist
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

        // Check if bins exist
        if (binsSnapshot.exists()) {
          const bins = binsSnapshot.val();
          setBinDetails(bins);
          if (!bins["residual_waste"]) {
            console.warn(
              "Default bin 'residual_waste' not found. Defaulting to the first available bin."
            );
            setActiveBin(Object.keys(bins)[8]);
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


  const handleSearch = () => {
    setSearchPerformed(true); // Mark search as performed
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setSearchPerformed(false); // Reset the search button
  };

  const filteredItems = trashItems.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Bin types for the dropdown
  const binTypes = Object.entries(binDetails).map(([id, details]) => ({
    id,
    name: details.type,
  }));

  // Get details for the active bin
  const activeBinDetails = binDetails[activeBin];

  return (
    <main>
      <header className="header">
        <h1>Recycling Guide</h1>
        <div className="search-bar">
          <input
            id="search-input"
            type="text"
            placeholder="Search for items..."
            value={searchQuery}
            onChange={handleSearchChange}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch(); // Search on Enter
              }
            }}
            aria-label="Search for recycling items"
          />
          <button
            onClick={
              searchPerformed ? () => setSearchQuery("") : handleSearch
            }
            aria-label={
              searchPerformed ? "Clear search input" : "Perform search"
            }
          >
            {searchPerformed ? "Clear" : "Search"}
          </button>
        </div>
      </header>
      {loading ? (
        <p role="status" aria-live="polite">
          Loading...
        </p>
      ) : searchQuery && searchPerformed ? (
        <section className="search-results">
          <h2 id="search-results-heading">Search Results</h2>
          {filteredItems.length > 0 ? (
            <ul>
              {filteredItems.map((item) => (
                <li key={item.id}>
                  <strong>{item.name}</strong> belongs in the{" "}
                  <span
                    className={item.bin + "-text"}
                    aria-label={`Bin type: ${item.bin}`}
                  >
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
          <div className="dropdown">
            <label htmlFor="bin-select">Select Bin Type: </label>
            <select
              id="bin-select"
              value={activeBin}
              onChange={(e) => setActiveBin(e.target.value)}
              aria-label="Select a bin type"
            >
              {binTypes.map(({ id, name }) => (
                <option key={id} value={id}>
                  {name}
                </option>
              ))}
            </select>
          </div>

          <section className="info-section" aria-labelledby="bin-info">
            {activeBinDetails ? (
              <div className="bin-content">
                <h2 className="bin-title">{activeBinDetails.type}</h2>
                {activeBinDetails.color && (
                  <div className="bin-color-info">
                    <p>
                      <strong>Color:</strong> {activeBinDetails.color.name}
                    </p>
                    <div
                      className="color-example"
                      style={{
                        backgroundColor: activeBinDetails.color.hex,
                        width: "20px",
                        height: "20px",
                        borderRadius: "10px",
                      }}
                      aria-label={`Color example: ${activeBinDetails.color.name}`}
                    ></div>
                  </div>
                )}
                {activeBinDetails.payAttention && (
                  <>
                    <p className="bin-description">
                      {activeBinDetails.description}
                    </p>
                    <ul>
                      {activeBinDetails.payAttention.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </>
                )}
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
              </div>
            ) : (
              <p>No details available for this bin.</p>
            )}
          </section>
        </>
      )}
    </main>
  );
};

export default HomePage;