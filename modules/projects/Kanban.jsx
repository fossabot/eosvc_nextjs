import { useEffect } from "react";
import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const Kanban = (props) => {
  const boardId = props.activeBoard._id;
  console.log(boardId, "BoardId - Kanban");
  const [data, setData] = useState([]);
  const [sections, setSections] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    try {
      const sections = fetch(`/api/projects/section/${boardId}`)
        .then((res) => res.json())
        .then((res) => {
          console.log(res, "res");
          setSections(res);
        });
    } catch (err) {
      console.log(err);
    }
  }, [boardId]);

  const DragEnd = (result) => {};

  isLoading && <div>Loading...</div>;
  return (
    <div className="flex flex-col border border-black w-full ">
      <DragDropContext onDragEnd={DragEnd}>
        <div className="flex flex-row items-start px-2 gap-2">
          {sections.map((section, index) => (
            <div
              className="flex flex-col items-center justify-center text-white h-full w-80 overflow-x-scroll bg-gray-500"
              key={section._id}
            >
              {section.title}
              <Droppable key={section._id} droppableId={section._id}>
                {(provided) => (
                  <div className="flex flex-col border">
                    <h1>task</h1>
                    <h1>task</h1>
                  </div>
                )}
              </Droppable>
            </div>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};

export default Kanban;
