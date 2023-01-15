import { useEffect, useState } from "react";
import { useSelector, useDispatch, connect } from "react-redux";
import { setActiveBoard } from "../../redux/projects/activeBoardSlice";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { setBoards } from "../../redux/features/boardSlice";
import { getAllBoards } from "./apiCalls/getAllBoards";
import { updatePosition } from "./apiCalls/updatePosition";

const ProjectSidebar = ({ boards }) => {
  const dispatch = useDispatch();
  const [activeIndex, setActiveIndex] = useState(0);
  const { boardId } = useSelector((state) => state.activeBoard.value);
  const session = useSelector((state) => state.session);
  const reloadMenu = useSelector((state) => state.projectState.menu.toggleMenu);
  const favourite = useSelector((state) => state.favourites.value);
  console.log(reloadMenu, "ReloadMenu - ProjectSidebar");

  useEffect(() => {
    const getBoards = async () => {
      try {
        const res = await getAllBoards();
        dispatch(setBoards(res));
      } catch (err) {
        alert(err);
      }
    };
    getBoards();
  }, [favourite, reloadMenu]);

  useEffect(() => {
    const activeItem = boards.findIndex((e) => e._id === boardId);
    if (boards.length > 0 && boardId === undefined) {
      //navigate(`/boards/${boards[0].id}`);
      dispatch(setActiveBoard(boards[0]));
    }
    setActiveIndex(activeItem);
  }, [boards, boardId]);

  const onDragEnd = async ({ source, destination }) => {
    const newList = [...boards];
    const [removed] = newList.splice(source.index, 1);
    newList.splice(destination.index, 0, removed);
    const activeItem = newList.findIndex((e) => e._id === boardId);
    setActiveIndex(activeItem);
    dispatch(setBoards(newList));
    try {
      await updatePosition({ boards: newList });
    } catch (err) {
      alert(err);
    }
  };

  //return console.log("stop");
  const selectProject = (board) => {
    dispatch(setActiveBoard(board));
  };

  return (
    <div className="flex  flex-col justify-start items-start space-y-1  bg-slate-300 w-80 h-full">
      {boards?.filter((item) => item.favourite === true).length !== 0 && (
        <h1 className="bg-yellow-600 w-full px-2">Oblíbené</h1>
      )}
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable
          key={"list-board-droppable"}
          droppableId={"list-board-droppable"}
        >
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="w-full"
            >
              {boards
                ?.filter((item) => item.favourite === true)
                ?.map((item, index) => (
                  <Draggable
                    key={item._id}
                    draggableId={item._id}
                    index={index}
                  >
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
      {boards?.filter(
        (item) => item.visibility === "private" && item.user === session._id
      ).length !== 0 && <h1 className="bg-yellow-600 w-full px-2">Privátní</h1>}
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable
          key={"list-board-droppable"}
          droppableId={"list-board-droppable"}
        >
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="w-full"
            >
              {boards
                ?.filter(
                  (item) =>
                    item.visibility === "private" && item.user === session._id
                )
                ?.map((item, index) => (
                  <Draggable
                    key={item._id}
                    draggableId={item._id}
                    index={index}
                  >
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
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable
          key={"list-board-droppable"}
          droppableId={"list-board-droppable"}
        >
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="w-full"
            >
              {boards
                ?.filter((item) => item.visibility === "public")
                ?.map((item, index) => (
                  <Draggable
                    key={item._id}
                    draggableId={item._id}
                    index={index}
                  >
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
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    boards: state.boards.value,
  };
};

export default connect(mapStateToProps)(ProjectSidebar);
