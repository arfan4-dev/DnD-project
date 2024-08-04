import React, { useEffect, useState } from 'react';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { arrayMove, SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

// Component for rendering sortable items
const SortableItem = ({ id, name, handleClick, data }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    padding: '8px',
    border: '1px solid #ccc',
    marginBottom: '4px',
    cursor: 'pointer',
    backgroundColor: '#f9f9f9',
  };

  const handleDelete = (itemId, event) => {
    event.stopPropagation(); // Prevents click event from propagating to parent div
    console.log('Clicked item ID:', itemId);
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners} onClick={() => handleClick(id)}>
      {
        name === 'text' ? (
          <div>
            {data.map((item) => (
              <div key={item._id} dangerouslySetInnerHTML={{ __html: item.innerText }} />
            ))}
          </div>
        ) : name === 'socialNetwork' ? (
          <div>
            {data.map((item) => (
              <div key={item._id}>
                <a href={item.link} target="_blank" rel="noreferrer">{item.name}</a>
                <div>{item.link}</div>
                <button onClick={(event) => handleDelete(item._id, event)}>Delete</button>
              </div>
            ))}
          </div>
        ) : (
          <div>{String(data)}</div> // Fallback rendering for unknown names
        )
      }
    </div>
  );
};


// Main App component
const App = () => {
  const [items, setItems] = useState({
    _id: "66acacd4b1c4660d6791346e",
    companyId: "66a738407ea7dadd23344551",
    selectedTemplate: 1,
    text: [
      {
        innerText: "<p class=\"blockquote\">This is text editor</p>",
        _id: "66acdcf2a01fbc87c82cee37"
      },
      {
        innerText: "<p class=\"blockquote\">This is text editor</p>",
        _id: "66acdcf2a01fbc87c82cee27"
      }
    ],
    socialNetwork: [
      {
        link: "http://localhost:3000/edit-profile",
        name: "Pinterest",
        _id: "66acd996a01fbc87c82cedc8"
      },
      {
        link: "http://localhost:3000/edit-profilehgjhgj",
        name: "Reddit",
        _id: "66acd996a01fbc87c82cedc9"
      },
      {
        link: "http://localhost:3000/edit-profilehgjhgj",
        name: "Vimeo",
        _id: "66ace90bf6fa46410f956703"
      }
    ],
    __v: 3,
    link: "http://localhost:3000/edit-profile",
    username: "arshan"
  });

  // Handler for drag-and-drop end event
  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      const keys = Object.keys(items);
      const oldIndex = keys.indexOf(active.id);
      const newIndex = keys.indexOf(over.id);
      const newKeys = arrayMove(keys, oldIndex, newIndex);
      const newItems = {};
      newKeys.forEach(key => {
        newItems[key] = items[key];
      });
      setItems(newItems);
    }
  };

  // Handler for item click event
  const handleItemClick = (id) => {
    console.log('Clicked item ID:', id);
  };

  // Log items when they change
  useEffect(() => {
    console.log('Items:', items);
  }, [items]);

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: '0 auto' }}>
      <h1>Drag and Drop List</h1>
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={Object.keys(items)} strategy={verticalListSortingStrategy}>
          {Object.keys(items).map((key) => (
            <SortableItem key={key} id={key} name={key} data={items[key]} handleClick={handleItemClick} />
          ))}
        </SortableContext>
      </DndContext>
    </div>
  );
};

export default App;
