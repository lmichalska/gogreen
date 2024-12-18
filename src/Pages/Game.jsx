const Trash = ({ id, name, type }) => {
  const dragStart = (e) => {
    if (e.type === "touchstart") {
      const touch = e.touches[0];
      const element = e.target;

      element.dataset.startX = touch.clientX;
      element.dataset.startY = touch.clientY;

      element.classList.add("dragging");

      const moveElement = (event) => {
        const touchMove = event.touches[0];
        element.style.position = "absolute";
        element.style.zIndex = "1000";
        element.style.pointerEvents = "none"; // Prevent interference
        element.style.left = `${touchMove.clientX - 50}px`;
        element.style.top = `${touchMove.clientY - 50}px`;
      };

      document.addEventListener("touchmove", moveElement);
      element.dataset.touchMoveListener = moveElement;
    } else {
      e.dataTransfer.setData("itemId", id);
      e.dataTransfer.setData("itemType", type);
    }
  };

  const dragEnd = (e) => {
    if (e.type === "touchend") {
      const touch = e.changedTouches[0];
      const element = e.target;

      element.style.position = "";
      element.style.zIndex = "";
      element.style.left = "";
      element.style.top = "";
      element.classList.remove("dragging");

      const moveListener = element.dataset.touchMoveListener;
      if (moveListener) {
        document.removeEventListener("touchmove", moveListener);
        delete element.dataset.touchMoveListener;
      }

      // Detect drop target
      const dropTarget = document.elementFromPoint(touch.clientX, touch.clientY);
      if (dropTarget && dropTarget.classList.contains("dropBins")) {
        // Add the item directly to the state through a custom event
        dropTarget.dispatchEvent(
          new CustomEvent("customDrop", {
            detail: { itemId: id, itemType: type },
            bubbles: true,
          })
        );
      }
    }
  };

  return (
    <div
      className="trash"
      id={id}
      draggable="true"
      onDragStart={dragStart}
      onDragEnd={dragEnd}
      onTouchStart={dragStart}
      onTouchEnd={dragEnd}
      role="button"
      aria-grabbed="false"
      aria-label={`Draggable item: ${name}`}
    >
      {name}
    </div>
  );
};
const DropBins = ({ type, setScore, setBinItems, binItems, id, setMessage }) => {
  const handleDrop = (itemId, itemType) => {
    if (itemType === type) {
      setScore((prevScore) => prevScore + 1); // Update the score
      setBinItems((prevItems) => [...prevItems, itemId]); // Update the bin's item list
      setMessage("Correct!"); // Provide feedback

      // Hide the dragged element
      const draggedElement = document.getElementById(itemId);
      if (draggedElement) {
        draggedElement.style.display = "none";
      }
    } else {
      setMessage("Oops! Wrong bin. Try again.");
    }
  };

  const drop = (e) => {
    e.preventDefault();
    const itemId = e.dataTransfer?.getData("itemId");
    const itemType = e.dataTransfer?.getData("itemType");
    handleDrop(itemId, itemType);
  };

  const customDrop = (e) => {
    const { itemId, itemType } = e.detail;
    handleDrop(itemId, itemType);
  };

  const allowDrop = (e) => e.preventDefault();
  const dragEnter = (e) => e.target.classList.add("activeDropArea");
  const dragLeave = (e) => e.target.classList.remove("activeDropArea");

  React.useEffect(() => {
    const binElement = document.getElementById(id);
    binElement.addEventListener("customDrop", customDrop);

    return () => {
      binElement.removeEventListener("customDrop", customDrop);
    };
  }, [id]);

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
