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
  const [searchPerformed, setSearchPerformed] = useState(false); // Track if search was performed

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

        if (binsSnapshot.exists()) {
          const bins = binsSnapshot.val();
          setBinDetails(bins);

          if (!bins["residual_waste"]) {
            console.warn(
              "Default bin 'residual_waste' not found. Defaulting to the first available bin."
            );
            setActiveBin(Object.keys(bins)[0]);
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

  // Handle search button behavior
  const handleSearch = () => {
    setSearchPerformed(true); // Mark that a search has been performed
  };

  // Reset search state if query is modified
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setSearchPerformed(false); // Reset "Clear" button when the search is modified
  };

  const filteredItems = trashItems.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const binTypes = Object.entries(binDetails).map(([id, details]) => ({
    id,
    name: details.type,
  }));

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
            aria-label="Search for recycling items"
          />
          <button
            onClick={searchPerformed ? () => setSearchQuery("") : handleSearch}
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
                <>
                  <h2>{activeBinDetails.type}</h2>
                  <p>{activeBinDetails.description}</p>
                  {activeBinDetails.payAttention && (
                    <>
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
                </>
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