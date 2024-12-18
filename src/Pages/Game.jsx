import React, { useState } from "react";
import "./Pages.css";

// Array of trash
const items = [
  { name: "🗞️ Paper", type: "paper", id: "paper-1" },
  { name: "🍼 Plastic Bottle", type: "plastic", id: "plastic-1" },
  { name: "🍌 Banana Peel", type: "trash", id: "trash-1" },
  { name: "🥡 Cardboard", type: "paper", id: "paper-2" },
  { name: "🛍️ Plastic Bag", type: "plastic", id: "plastic-2" },
  { name: "🍎 Apple Core", type: "trash", id: "trash-2" },
];

const DropBins = ({ type, setScore, setBinItems, binItems, id, setMessage }) => {
  // Handles when an item is dropped onto the bin
  const drop = (e) => {
    e.preventDefault();

    const itemId = e.dataTransfer.getData("itemId");
    const itemType = e.dataTransfer.getData("itemType");

    // Check if the item matches the bin type
    if (itemType === type) {
      setScore((prevScore) => prevScore + 1); // Change the score
      setBinItems((prevItems) => [...prevItems, itemId]); // Add item to the bin

      // Hide the dragged element
      const draggedElement = document.getElementById(itemId);
      draggedElement.style.display = "none";

      setMessage("Correct!");
    } else {
      setMessage("Oops! Wrong bin. Try again."); // Feedback for incorrect sorting
    }

    e.target.classList.remove("activeDropArea");
  };

  const allowDrop = (e) => e.preventDefault();
  const dragEnter = (e) => e.target.classList.add("activeDropArea");
  const dragLeave = (e) => e.target.classList.remove("activeDropArea");
  const binName = type === "trash" ? "Mixed Trash" : type.charAt(0).toUpperCase() + type.slice(1);

  return (
    <div
      className={`dropBins ${type}-bin`}
      id={id}
      onDrop={drop}
      onDragOver={allowDrop}
      onDragEnter={dragEnter}
      onDragLeave={dragLeave}
      role="region"
      aria-labelledby={`${id}-label`}
    >
      <p id={`${id}-label`}>{binName} Bin</p>
      <ul aria-live="polite" className="dropped-items">
        {binItems.map((itemId) => {
          const item = items.find((item) => item.id === itemId);
          return (
            <li key={item.id} className="dropped-item">
              {item.name}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
const Trash = ({ id, name, type }) => {
  // Handle drag
  const dragStart = (e) => {
    e.dataTransfer.setData("itemId", id);
    e.dataTransfer.setData("itemType", type);

    const dragImage = document.createElement("div");
    dragImage.className = "drag-image";
    dragImage.textContent = name;
    document.body.appendChild(dragImage);
    e.dataTransfer.setDragImage(dragImage, 0, 0);

    e.target.classList.add("dragging");
  };

  // End of the drag 
  const dragEnd = (e) => {
    e.target.classList.remove("dragging");
    const customDragImage = document.querySelector(".drag-image");
    if (customDragImage) {
      customDragImage.remove();
    }
  };

  return (
    <div
      className="trash"
      id={id}
      draggable="true"
      onDragStart={dragStart}
      onDragEnd={dragEnd}
      role="button"
      aria-grabbed="false"
      aria-label={`Draggable item: ${name}`}
    >
      {name}
    </div>
  );
};


const Game = () => {
  const [score, setScore] = useState(0);
  const [paperBinItems, setPaperBinItems] = useState([]);
  const [plasticBinItems, setPlasticBinItems] = useState([]);
  const [trashBinItems, setTrashBinItems] = useState([]);
  const [message, setMessage] = useState("");
  const totalItems = items.length;

  return (
    <main>
      <h1>Recycling Game</h1>
      {score === totalItems ? (
        <div className="congratulations" role="alert" aria-live="assertive">
          <h2>Congratulations! 🎉</h2>
          <p>You sorted all the trash correctly! Come back tomorrow for more challenges.</p>
        </div>
      ) : (
        <>
          <p>Put trash in the correct trash bins.</p>
          <div className="game-items">
            <div className="availableItems" aria-labelledby="available-trash-items">
              {items.map((item) => (
                <Trash
                  key={item.id}
                  id={item.id}
                  name={item.name}
                  type={item.type}
                />
              ))}
            </div>
            <div className="bins" aria-labelledby="trash-bins">
              <DropBins
                type="paper"
                setScore={setScore}
                setBinItems={setPaperBinItems}
                binItems={paperBinItems}
                id="paper-bin"
                setMessage={setMessage}
              />
              <DropBins
                type="plastic"
                setScore={setScore}
                setBinItems={setPlasticBinItems}
                binItems={plasticBinItems}
                id="plastic-bin"
                setMessage={setMessage}
              />
              <DropBins
                type="trash"
                setScore={setScore}
                setBinItems={setTrashBinItems}
                binItems={trashBinItems}
                id="trash-bin"
                setMessage={setMessage}
              />
            </div>
          </div>
          {/* Feedback message */}
          <div className="score" aria-live="polite">
            <p>Score: {score}</p>
          </div>
          <div className="message" role="status" aria-live="polite">
            <p>{message}</p>
          </div>
        </>
      )}
    </main>
  );
};

export default Game;