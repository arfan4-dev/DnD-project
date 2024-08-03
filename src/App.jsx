// App.jsx
import React, { useState } from 'react';
import { DndContext } from '@dnd-kit/core';
import { SortableContext, useSortable, arrayMove } from '@dnd-kit/sortable';
import './App.css';

// Draggable Group Component
const DraggableGroup = ({ id, children }) => {
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
      {
        innerText: "<p class=\"blockquote\">This is text 1</p>",
        _id: "66acdcf2a01fbc87c82ce637"
      },
      {
        innerText: "<p class=\"blockquote\">This is text 2</p>",
        _id: "66acdcf2a01fbc87c82cee17"
      },
      {
        innerText: "<p class=\"blockquote\">This is text editor</p>",
        _id: "66acdcf2a01fbc87c82cee37"
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

  const [items, setItems] = useState([
    { id: 'text', content: data.text },
    { id: 'socialNetwork', content: data.socialNetwork },
    { id: 'link', content: data.link },
    { id: 'username', content: data.username },
  ]);

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.findIndex(item => item.id === active.id);
        const newIndex = items.findIndex(item => item.id === over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const handleSave = () => {
    const updatedData = { ...data };
    items.forEach(item => {
      updatedData[item.id] = item.content;
    });

    console.log(updatedData);
  };

  return (
    <div>
      <DndContext onDragEnd={handleDragEnd}>
        <SortableContext items={items.map(item => item.id)}>
          {items.map(item => (
            <DraggableGroup key={item.id} id={item.id}>
              {item.id === 'text' ? (
                <div>
                  {item.content.map((textItem) => (
                    <div key={textItem._id} dangerouslySetInnerHTML={{ __html: textItem.innerText }} />
                  ))}
                </div>
              ) : item.id === 'socialNetwork' ? (
                <div>
                  {item.content.map((networkItem) => (
                    <div key={networkItem._id}>
                      <strong>{networkItem.name}</strong>
                      <p>{networkItem.link}</p>
                    </div>
                  ))}
                </div>
              ) : item.id === 'link' ? (
                <div>
                  <strong>Link:</strong>
                  <p>{item.content}</p>
                </div>
              ) : item.id === 'username' ? (
                <div>
                  <strong>Username:</strong>
                  <p>{item.content}</p>
                </div>
              ) : null}
            </DraggableGroup>
          ))}
        </SortableContext>
      </DndContext>
      <button onClick={handleSave}>Save</button>
    </div>
  );
};

export default App;
