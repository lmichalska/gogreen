import React, { useState } from "react";
import "./Game.css";

const items = [
  { name: "🗞️ Paper", type: "paper", id: "paper-1" },
  { name: "🍼 Plastic Bottle", type: "plastic", id: "plastic-1" },
  { name: "🍌 Banana Peel", type: "trash", id: "trash-1" },
  { name: "🥡 Cardboard", type: "paper", id: "paper-2" },
  { name: "🛍️ Plastic Bag", type: "plastic", id: "plastic-2" },
  { name: "🍎 Apple Core", type: "trash", id: "trash-2" },
];

const DroppableArea = ({ type, setScore, setBinItems, binItems, id, setMessage }) => {
  const drop = (e) => {
    e.preventDefault();
    const itemId = e.dataTransfer.getData("itemId");
    const itemType = e.dataTransfer.getData("itemType");

    if (itemType === type) {
      setScore((prevScore) => prevScore + 1);
      setBinItems((prevItems) => [...prevItems, itemId]);
      const draggedElement = document.getElementById(itemId);
      draggedElement.style.display = "none";
      setMessage("Correct!");
    } else {
      setMessage("Oops! Wrong bin. Try again.");
    }

    e.target.classList.remove("activeDropArea");
  };

  const allowDrop = (e) => e.preventDefault();

  const dragEnter = (e) => e.target.classList.add("activeDropArea");

  const dragLeave = (e) => e.target.classList.remove("activeDropArea");

  const binName = type === "trash" ? "Mixed Trash" : type.charAt(0).toUpperCase() + type.slice(1);

  return (
    <div
      className={`droppableArea ${type}-bin`}
      id={id}
      onDrop={drop}
      onDragOver={allowDrop}
      onDragEnter={dragEnter}
      onDragLeave={dragLeave}
    >
      <p>{binName} Bin</p>
      {binItems.map((itemId) => {
        const item = items.find((item) => item.id === itemId);
        return (
          <div key={item.id} className="dropped-item">
            {item.name}
          </div>
        );
      })}
    </div>
  );
};

const DraggableThing = ({ id, name, type }) => {
  const dragStart = (e) => {
    e.dataTransfer.setData("itemId", id);
    e.dataTransfer.setData("itemType", type);

    // Create and set custom drag image
    const dragImage = document.createElement("div");
    dragImage.className = "custom-drag-image";
    dragImage.textContent = name;
    document.body.appendChild(dragImage);
    e.dataTransfer.setDragImage(dragImage, 0, 0);

    e.target.classList.add("dragging");
  };

  const dragEnd = (e) => {
    e.target.classList.remove("dragging");
    const customDragImage = document.querySelector(".custom-drag-image");
    if (customDragImage) {
      customDragImage.remove();
    }
  };

  return (
    <div
      className="draggableThing"
      id={id}
      draggable="true"
      onDragStart={dragStart}
      onDragEnd={dragEnd}
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
        <div className="congratulations">
          <h2>Congratulations! 🎉</h2>
          <p>You sorted all the trash correctly! Come back tomorrow for more challenges.</p>
        </div>
      ) : (
        <>
          <div className="availableItems">
            {items.map((item) => (
              <DraggableThing
                key={item.id}
                id={item.id}
                name={item.name}
                type={item.type}
              />
            ))}
          </div>

          <div className="bins">
            <DroppableArea
              type="paper"
              setScore={setScore}
              setBinItems={setPaperBinItems}
              binItems={paperBinItems}
              id="paper-bin"
              setMessage={setMessage}
            />
            <DroppableArea
              type="plastic"
              setScore={setScore}
              setBinItems={setPlasticBinItems}
              binItems={plasticBinItems}
              id="plastic-bin"
              setMessage={setMessage}
            />
            <DroppableArea
              type="trash"
              setScore={setScore}
              setBinItems={setTrashBinItems}
              binItems={trashBinItems}
              id="trash-bin"
              setMessage={setMessage}
            />
          </div>

          <div className="score">
            <p>Score: {score}</p>
          </div>
          <div className="message">
            <p>{message}</p>
          </div>
        </>
      )}
    </main>
  );
};

export default Game;
