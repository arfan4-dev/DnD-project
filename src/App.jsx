import React, { useEffect, useState } from 'react';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { arrayMove, SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const SortableItem = ({ id, name, handleClick }) => {
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
      {name}
    </div>
  );
};

const App = () => {
  const [items, setItems] = useState({
    key1: 'Item 1',
    key2: 'Item 2',
    key3: 'Item 3',
    key4: 'Item 4',
  });

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      const oldIndex = Object.keys(items).indexOf(active.id);
      const newIndex = Object.keys(items).indexOf(over.id);
      const newItems = arrayMove(Object.entries(items), oldIndex, newIndex);
      setItems(Object.fromEntries(newItems));
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
        <SortableContext items={Object.keys(items)} strategy={verticalListSortingStrategy}>
          {Object.keys(items).map((key) => (
            <SortableItem key={key} id={key} name={items[key]} handleClick={handleItemClick} />
          ))}
        </SortableContext>
      </DndContext>
    </div>
  );
};

export default App;
