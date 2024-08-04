import React, { useEffect, useState } from 'react';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { arrayMove, SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const SortableItem = ({ id, innerText, link, name, value, type, handleClick }) => {
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

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners} onClick={() => handleClick(id)}>
      {type === 'text' && <div dangerouslySetInnerHTML={{ __html: innerText }} />}
      {type === 'social' && <div>{name}: <a href={link}>{link}</a></div>}
      {type === 'username' && <div>Username: {value}</div>}
      {type === 'link' && <div>Link: <a href={value}>{value}</a></div>}
      {type === 'general' && <div>General Item</div>}
    </div>
  );
};

const App = () => {
  const [items, setItems] = useState([
    { type: "text", innerText: "<p class=\"blockquote\">This is text 1</p>", _id: "66acdcf2a01fbc87c82ce637" },
    { type: "text", innerText: "<p class=\"blockquote\">This is text 2</p>", _id: "66acdcf2a01fbc87c82cee17" },
    { type: "text", innerText: "<p class=\"blockquote\">This is text editor</p>", _id: "66acdcf2a01fbc87c82cee37" },
    { type: "social", link: "http://localhost:3000/edit-profile", name: "Pinterest", _id: "66acd996a01fbc87c82cedc8" },
    { type: "social", link: "http://localhost:3000/edit-profilehgjhgj", name: "Reddit", _id: "66acd996a01fbc87c82cedc9" },
    { type: "social", link: "http://localhost:3000/edit-profilehgjhgj", name: "Vimeo", _id: "66ace90bf6fa46410f956703" },
    { type: "username", value: "arshan", _id: "66ace90bf6fa46410f9536703" },
    { type: "link", value: "http://localhost:3000/edit-profile", _id: "66ace90bf6fa46410f2956703" },
    { type: "general", _id: "66acacd4b1c4660d6791346e", companyId: "66a738407ea7dadd23344551", selectedTemplate: 1 },
  ]);

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      const oldIndex = items.findIndex(item => item._id === active.id);
      const newIndex = items.findIndex(item => item._id === over.id);
      setItems(arrayMove(items, oldIndex, newIndex));
    }
  };

  const handleItemClick = (id) => {
    console.log('Clicked item ID:', id);
  };

  useEffect(() => {
    console.log('Items:', items);
  }, [items]);

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: '0 auto' }}>
      <h1>Drag and Drop List</h1>
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={items.map(item => item._id)} strategy={verticalListSortingStrategy}>
          {items.map(item => (
            <SortableItem
              key={item._id}
              id={item._id}
              innerText={item.innerText}
              link={item.link}
              name={item.name}
              value={item.value}
              type={item.type}
              handleClick={handleItemClick}
            />
          ))}
        </SortableContext>
      </DndContext>
    </div>
  );
};

export default App;
