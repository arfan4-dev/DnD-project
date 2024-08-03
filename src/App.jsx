// App.jsx
import React, { useEffect, useState } from 'react';
import { DndContext, useDraggable } from '@dnd-kit/core';
import { SortableContext, useSortable, arrayMove } from '@dnd-kit/sortable';
import './App.css';

// Draggable Item Component
const DraggableItem = ({ id, children }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

  const style = {
    transform: `translate3d(${transform?.x || 0}px, ${transform?.y || 0}px, 0)`,
    transition,
    padding: '8px',
    margin: '4px',
    background: 'lightgray',
    border: '1px solid gray',
    borderRadius: '4px',
    cursor: 'grab',
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {children}
    </div>
  );
};

const App = () => {
  const [data, setData] = useState({
    _id: "66acacd4b1c4660d6791346e",
    companyId: "66a738407ea7dadd23344551",
    selectedTemplate: 1,
    text: [
      { innerText: "<p class=\"blockquote\">This is text 1</p>", _id: "66acdcf2a01fbc87c82ce637" },
      { innerText: "<p class=\"blockquote\">This is text</p>", _id: "66acdcf2a01fbc87c82cee17" },
      { innerText: "<p class=\"blockquote\">This is text editor</p>", _id: "66acdcf2a01fbc87c82cee37" }
    ],
    socialNetwork: [
      { link: "http://localhost:3000/edit-profile", name: "Pinterest", _id: "66acd996a01fbc87c82cedc8" },
      { link: "http://localhost:3000/edit-profilehgjhgj", name: "Reddit", _id: "66acd996a01fbc87c82cedc9" },
      { link: "http://localhost:3000/edit-profilehgjhgj", name: "Vimeo", _id: "66ace90bf6fa46410f956703" }
    ],
    __v: 3,
    link: "http://localhost:3000/edit-profile",
    username: "arshan"
  });

  // Flatten data object into an array of items
  const flattenData = () => {
    const items = [];

    // Handle text and socialNetwork arrays
    Object.keys(data).forEach(key => {
      if (Array.isArray(data[key])) {
        data[key].forEach(item => {
          items.push({ ...item, id: item._id, type: key });
        });
      }
    });

    // Add special handling for other keys if needed
    if (data.username) {
      items.push({ id: 'username', content: `Username: ${data.username}`, type: 'username' });
    }
    if (data.link) {
      items.push({ id: 'link', content: `Link: ${data.link}`, type: 'link' });
    }

    return items;
  };

  const [flattenedData, setFlattenedData] = useState(flattenData());

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (!active || !over) {
      return; // Exit if either is null
    }

    if (active.id !== over.id) {
      setFlattenedData(prevFlattenedData => {
        const oldIndex = prevFlattenedData.findIndex(item => item.id === active.id);
        const newIndex = prevFlattenedData.findIndex(item => item.id === over.id);

        // Ensure indexes are valid
        if (oldIndex === -1 || newIndex === -1) {
          return prevFlattenedData;
        }

        const updatedFlattenedData = arrayMove(prevFlattenedData, oldIndex, newIndex);

        // Rebuild the original data structure
        const updatedData = { ...data };
        updatedData.text = updatedFlattenedData.filter(item => item.type === 'text');
        updatedData.socialNetwork = updatedFlattenedData.filter(item => item.type === 'socialNetwork');

        // Update special keys if they are in the flattened data
        const usernameItem = updatedFlattenedData.find(item => item.type === 'username');
        const linkItem = updatedFlattenedData.find(item => item.type === 'link');
        if (usernameItem) updatedData.username = usernameItem.content.replace('Username: ', '');
        if (linkItem) updatedData.link = linkItem.content.replace('Link: ', '');

        setData(updatedData);
        console.log("🚀 ~ handleDragEnd ~ updatedData:", updatedData)
        return updatedFlattenedData;
      });
    }
  };

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <SortableContext items={flattenedData.map(item => item.id)}>
        {flattenedData.map((item) => (
          <DraggableItem key={item.id} id={item.id}>
            {item.type === 'text' ? (
              <div dangerouslySetInnerHTML={{ __html: item.innerText }} />
            ) : item.type === 'socialNetwork' ? (
              <div>
                <strong>{item.name}</strong>
                <p>{item.link}</p>
              </div>
            ) : (
              <div>{item.content}</div>
            )}
          </DraggableItem>
        ))}
      </SortableContext>
    </DndContext>
  );
};

export default App;
