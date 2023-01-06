import React, { useState } from "react";
import { columnsFromBackend } from "./KanbanData";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import TaskCard from "./TaskCard";
import { useQuery } from "react-query";
import { getSections } from "./apiCalls/getSections";
import { useSelector, useDispatch } from "react-redux";

const Projects = () => {
  const dispatch = useDispatch();
  const board = useSelector((state) => state.board.value);
  console.log(board._id, "board in projects");
  const { isLoading, data: sections } = useQuery("sections", () =>
    getSections(board._id)
  );
  //const columns = sections;

  console.log(sections, "sections");
  //console.log(columns, "columns");
  const onDragEnd = (result) => {};
  return (
    <div className="w-full border border-blue-500">
      Hello
      <div className="border border-black w-full">
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="flex flex-row px-3 gap-3 max-auto items-center justify-center">
            {sections.map((section) => {
              return (
                <div className="bg-gray-600 w-full">
                  <h2>{section.title}</h2>
                  <Droppable droppableId={section._id}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className="flex flex-col justify-center items-center"
                      >
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </div>
              );
            })}
          </div>
        </DragDropContext>
      </div>
    </div>
  );
};

export default Projects;
