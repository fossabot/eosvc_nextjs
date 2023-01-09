import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setActiveBoard } from "../../redux/projects/activeBoardSlice";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

const ProjectSidebar = ({ boards }) => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.activeBoard.isLoading);
  const activeBoard = useSelector((state) => state.activeBoard.value);
  const [activeIndex, setActiveIndex] = useState(0);
  const boardId = activeBoard._id;
  //console.log(boardId, "boardId - Project Sidebar");

  const selectProject = (board) => {
    console.log("You select:", board);
    dispatch(setActiveBoard(board));
  };

  const udpateActive = (listBoards) => {
    const activeItem = listBoards.findIndex((e) => e._id === boardId);
  };

  const onDragEnd = ({ source, destination }) => {
    console.log("Drag end");
  };

  if (isLoading) return <div>Loading...</div>;
  //if (boards.length === 0) return <div>Loading...</div>;

  return (
    <div className="flex  flex-col justify-start items-start space-y-1  bg-slate-300 w-full h-full">
      <h1 className="bg-yellow-600 w-full px-2">Oblíbené</h1>
      <h1 className="bg-yellow-600 w-full px-2">Privátní</h1>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable
          key={"list-board-droppable"}
          droppableId={"list-board-droppable"}
        >
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {boards.map((item, index) => (
                <Draggable key={item._id} draggableId={item._id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      className="bg-slate-600 w-full px-2 py-1 rounded-md border border-yellow-400"
                      ref={provided.innerRef}
                      {...provided.dragHandleProps}
                      {...provided.draggableProps}
                      selected={index === activeIndex}
                      onClick={() => selectProject(item)}
                    >
                      {item.title}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <h1 className="bg-yellow-600 w-full px-2">Veřejné</h1>
    </div>
  );
};

export default ProjectSidebar;
