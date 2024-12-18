const Trash = ({ id, name, type }) => {
  const dragStart = (e) => {
    if (e.type === "touchstart") {
      const touch = e.touches[0];
      const element = e.target;

      console.log("Touch start at:", touch.clientX, touch.clientY); // Debugging

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
      element.touchMoveListener = moveElement; // Store the reference as a property
    } else {
      e.dataTransfer.setData("itemId", id);
      e.dataTransfer.setData("itemType", type);
    }
  };

  const dragEnd = (e) => {
    if (e.type === "touchend") {
      const touch = e.changedTouches[0];
      console.log("Touch end at:", touch.clientX, touch.clientY); // Debugging

      const element = e.target;

      element.style.position = "";
      element.style.zIndex = "";
      element.style.left = "";
      element.style.top = "";
      element.classList.remove("dragging");

      const moveListener = element.touchMoveListener;
      if (moveListener) {
        document.removeEventListener("touchmove", moveListener);
        delete element.touchMoveListener;
      }

      // Detect drop target
      const dropTarget = document.elementFromPoint(touch.clientX, touch.clientY);
      console.log("Drop target:", dropTarget); // Debugging
      if (dropTarget && dropTarget.classList.contains("dropBins")) {
        console.log("Custom drop dispatched to:", dropTarget); // Debugging
        dropTarget.dispatchEvent(
          new CustomEvent("customDrop", {
            detail: { itemId: id, itemType: type },
            bubbles: true,
          })
        );
      } else {
        console.log("No valid drop target."); // Debugging
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

const DropBins = ({ type, setScore, setBinItems, binItems, id, setMessage, items }) => {
  const handleDrop = (itemId, itemType) => {
    console.log("Handling drop:", { itemId, itemType }); // Debugging

    if (itemType === type) {
      setScore((prevScore) => {
        console.log("Updated score:", prevScore + 1); // Debugging
        return prevScore + 1;
      });
      setBinItems((prevItems) => {
        console.log("Updated bin items:", [...prevItems, itemId]); // Debugging
        return [...prevItems, itemId];
      });
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
    console.log("Custom drop triggered", e.detail); // Debugging
    const { itemId, itemType } = e.detail;
    handleDrop(itemId, itemType);
  };

  const allowDrop = (e) => e.preventDefault();
  const dragEnter = (e) => e.target.classList.add("activeDropArea");
  const dragLeave = (e) => e.target.classList.remove("activeDropArea");

  React.useEffect(() => {
    const binElement = document.getElementById(id);
    if (!binElement) {
      console.error(`Bin element with id "${id}" not found`); // Debugging
      return;
    }

    binElement.addEventListener("customDrop", customDrop);
    console.log(`Custom drop listener added to bin "${id}"`); // Debugging

    return () => {
      console.log(`Custom drop listener removed from bin "${id}"`); // Debugging
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
          if (!item) return null; // Handle case where item is not found
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