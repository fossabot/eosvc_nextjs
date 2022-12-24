import { useLayoutEffect } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  resetServerContext,
} from "react-beautiful-dnd";

const finalSpaceCharacters = [
  {
    id: "gary",
    name: "Gary Goodspeed",
    thumb: "/assets/img2.png",
  },
  {
    id: "cato",
    name: "Little Cato",
    thumb: "/assets/img2.png",
  },
  {
    id: "kvn",
    name: "KVN",
    thumb: "/assets/img2.png",
  },
  {
    id: "mooncake",
    name: "Mooncake",
    thumb: "/assets/img2.png",
  },
  {
    id: "quinn",
    name: "Quinn Ergon",
    thumb: "/assets/img2.png",
  },
];

function Projects() {
  const ready = true;
  console.log(ready, "ready");
  const [characters, updateCharacters] = useState(finalSpaceCharacters);
  console.log(characters);

  function handleOnDragEnd(result) {
    if (!result.destination) return;

    const items = Array.from(characters);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    updateCharacters(items);
  }
  return (
    <div className="App">
      <header className="App-header">
        <h1>Final Space Characters</h1>
        {ready && (
          <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="characters">
              {(provided) => (
                <ul
                  className="characters"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {characters.map(({ id, name, thumb }, index) => {
                    return (
                      <Draggable key={id} draggableId={id} index={index}>
                        {(provided) => (
                          <li
                            className="flex flex-row border"
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <div>
                              <img
                                src={thumb}
                                width={100}
                                alt={`${name} Thumb`}
                              />
                            </div>
                            <p>{name}</p>
                          </li>
                        )}
                      </Draggable>
                    );
                  })}
                  {provided.placeholder}
                </ul>
              )}
            </Droppable>
          </DragDropContext>
        )}
      </header>
      <p>
        Images from{" "}
        <a href="https://final-space.fandom.com/wiki/Final_Space_Wiki">
          Final Space Wiki
        </a>
      </p>
    </div>
  );
}

export default Projects;
