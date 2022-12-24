import React from "react";
import { Draggable } from "react-beautiful-dnd";

const TaskCard = ({ item, index }) => {
  return (
    <Draggable key={item.id} draggableId={item.id} index={index}>
      {(provided) => (
        <div
          className="p-2"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div
            className={`flex flex-col justify-center items-start  rounded-md bg-white text-xs border border-gray-400 p-2 hover:bg-gray-200`}
          >
            <p className="text-black font-bold">{item.Task}</p>
            <div className="pt-2">
              <p>
                <span className="text-gray-400 text-xs">
                  {new Date(item.Due_Date).toLocaleDateString("en-us", {
                    month: "short",
                    day: "2-digit",
                  })}
                </span>
              </p>
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default TaskCard;
