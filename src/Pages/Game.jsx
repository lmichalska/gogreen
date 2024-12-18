const Trash = ({ id, name, type }) => {
  const dragStart = (e) => {
    if (e.type === "touchstart") {
      const touch = e.touches[0];
      const element = e.target;

      element.dataset.startX = touch.clientX;
      element.dataset.startY = touch.clientY;
      element.dataset.originalPosition = JSON.stringify({
        left: element.offsetLeft,
        top: element.offsetTop,
      });

      element.classList.add("dragging");

      const moveElement = (event) => {
        const touchMove = event.touches[0];
        const offsetX = touchMove.clientX - touch.clientX;
        const offsetY = touchMove.clientY - touch.clientY;

        element.style.position = "absolute";
        element.style.zIndex = "1000";
        element.style.pointerEvents = "none"; // Prevent interference with drop detection
        element.style.left = `${element.offsetLeft + offsetX}px`;
        element.style.top = `${element.offsetTop + offsetY}px`;

        // Save new positions for next frame
        element.dataset.startX = touchMove.clientX;
        element.dataset.startY = touchMove.clientY;
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
        const event = new Event("drop", { bubbles: true });
        event.dataTransfer = {
          getData: (key) => (key === "itemId" ? id : type),
        };
        dropTarget.dispatchEvent(event);
      } else {
        // Reset position if no valid drop
        const originalPosition = JSON.parse(element.dataset.originalPosition || "{}");
        element.style.left = `${originalPosition.left}px`;
        element.style.top = `${originalPosition.top}px`;
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
  const drop = (e) => {
    e.preventDefault();

    const itemId = e.dataTransfer?.getData("itemId") || e.target.dataset.itemId;
    const itemType = e.dataTransfer?.getData("itemType") || e.target.dataset.itemType;

    if (itemType === type) {
      setScore((prevScore) => prevScore + 1);
      setBinItems((prevItems) => [...prevItems, itemId]);

      const draggedElement = document.getElementById(itemId);
      if (draggedElement) draggedElement.style.display = "none";

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