import React, { useEffect, useState } from 'react';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { SortableContext, useSortable, arrayMove } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const DraggableItem = ({ id, children }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
  const style = {
    transform: CSS.Transform.toString(transform),
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
  const [items, setItems] = useState([
    {
      type: "text",
      innerText: "<p class=\"blockquote\">This is text 1</p>",
      _id: "66acdcf2a01fbc87c82ce637"
    },
    {
      type: "text",
      innerText: "<p class=\"blockquote\">This is text 2</p>",
      _id: "66acdcf2a01fbc87c82cee17"
    },
    {
      type: "text",
      innerText: "<p class=\"blockquote\">This is text editor</p>",
      _id: "66acdcf2a01fbc87c82cee37"
    },
    {
      type: "social",
      link: "http://localhost:3000/edit-profile",
      name: "Pinterest",
      _id: "66acd996a01fbc87c82cedc8"
    },
    {
      type: "social",
      link: "http://localhost:3000/edit-profilehgjhgj",
      name: "Reddit",
      _id: "66acd996a01fbc87c82cedc9"
    },
    {
      type: "social",
      link: "http://localhost:3000/edit-profilehgjhgj",
      name: "Vimeo",
      _id: "66ace90bf6fa46410f956703"
    },
    {
      type: "username",
      value: "arshan",
      _id: "66ace90bf6fa46410f9536703"
    },
    {
      type: "link",
      value: "http://localhost:3000/edit-profile",
      _id: "66ace90bf6fa46410f2956703"
    },
    {
      type: "general",
      _id: "66acacd4b1c4660d6791346e",
      companyId: "66a738407ea7dadd23344551",
      selectedTemplate: 1
    }
  ]);

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      const activeIndex = items.findIndex(item => item._id === active.id);
      const overIndex = items.findIndex(item => item._id === over.id);

      const updatedItems = arrayMove(items, activeIndex, overIndex);
      setItems(updatedItems);
    }
  };

  useEffect(() => {
    console.log(items);
  }, [items]);

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={items.filter(item => item.type !== "general").map(item => item._id)}>
        {items
          .filter(item => item.type !== "general")
          .map((item) => (
            <DraggableItem key={item._id} id={item._id}>
              {item.type === "text" ? (
                <div dangerouslySetInnerHTML={{ __html: item.innerText }} />
              ) : item.type === "social" ? (
                <div className="flex items-center gap-2">
                  <span>{item.name}</span>
                  <a href={item.link} target="_blank" rel="noopener noreferrer">{item.link}</a>
                </div>
              ) : (
                <div>{item.value}</div>
              )}
            </DraggableItem>
          ))}
      </SortableContext>
    </DndContext>
  );
};

export default App;
