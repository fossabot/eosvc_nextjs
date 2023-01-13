import { useEffect } from "react";
import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { setSection } from "../../redux/projects/sectionSlice";
import LoadingSpinner from "../../components/loadings/LoadingSpinner";
import { updateSection } from "./apiCalls/updateSection";
import { addTask } from "./apiCalls/addTask";
//import Task from "./bck/Task";
import TaskModalRight from "./TaskModalRight";
import { updateTaskPosition } from "./apiCalls/updateTaskPosition";
import {} from "@heroicons/react/outline/";
import { PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import { deleteSection } from "./apiCalls/deleteSection";
import { createSection } from "./apiCalls/createSection";
import { deleteTask } from "./apiCalls/deleteTask";

let timer;
const timeout = 500;

const Kanban = (props) => {
  const dispatch = useDispatch();
  console.log(props, "Props - Kanban");
  //return console.log("stop");
  const boardId = props.boardId;
  const [data, setData] = useState([]);
  console.log(data, "Data - Kanban");
  const [selectedTask, setSelectedTask] = useState(undefined);
  const [open, setOpen] = useState(false);
  //const sections = useSelector((state) => state.section.value);
  //const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setData(props.data);
  }, [props.data]);

  //Done
  const onDragEnd = async ({ source, destination }) => {
    if (!destination) return;
    const sourceColIndex = data.findIndex((e) => e._id === source.droppableId);
    const destinationColIndex = data.findIndex(
      (e) => e._id === destination.droppableId
    );
    const sourceCol = data[sourceColIndex];
    const destinationCol = data[destinationColIndex];

    const sourceSectionId = sourceCol._id;
    const destinationSectionId = destinationCol._id;

    const sourceTasks = [...sourceCol.tasks];
    const destinationTasks = [...destinationCol.tasks];

    if (source.droppableId !== destination.droppableId) {
      const [removed] = sourceTasks.splice(source.index, 1);
      destinationTasks.splice(destination.index, 0, removed);
      data[sourceColIndex].tasks = sourceTasks;
      data[destinationColIndex].tasks = destinationTasks;
    } else {
      const [removed] = destinationTasks.splice(source.index, 1);
      destinationTasks.splice(destination.index, 0, removed);
      data[destinationColIndex].tasks = destinationTasks;
    }

    try {
      /*
      await taskApi.updatePosition(boardId, {
        resourceList: sourceTasks,
        destinationList: destinationTasks,
        resourceSectionId: sourceSectionId,
        destinationSectionId: destinationSectionId,
      });
      */
      await updateTaskPosition(boardId, {
        resourceList: sourceTasks,
        destinationList: destinationTasks,
        resourceSectionId: sourceSectionId,
        destinationSectionId: destinationSectionId,
      });
      setData(data);
    } catch (err) {
      alert(err);
    }
  };

  //Done
  const handelCreateSection = async () => {
    try {
      //const section = await sectionApi.create(boardId);
      const newSection = await createSection(boardId);
      console.log(newSection, "Section");
      setData([...data, newSection]);
    } catch (err) {
      alert(err);
    }
  };

  //Done
  const handelDeleteSection = async (sectionId) => {
    try {
      //await sectionApi.delete(boardId, sectionId);

      await deleteSection(sectionId);
      const newData = [...data].filter((e) => e._id !== sectionId);
      setData(newData);

      console.log("handelDeleteSection");
    } catch (err) {
      alert(err);
    }
  };

  //Done
  const updateSectionTitle = async (e, sectionId) => {
    clearTimeout(timer);
    const newTitle = e.target.value;
    const newData = [...data];
    const index = newData.findIndex((e) => e._id === sectionId);
    newData[index].title = newTitle;
    setData(newData);
    timer = setTimeout(async () => {
      try {
        updateSection(boardId, sectionId, { title: newTitle });
      } catch (err) {
        alert(err);
      }
    }, timeout);
  };

  //Done
  const createTask = async (sectionId) => {
    try {
      // const task = await taskApi.create(boardId, { sectionId });
      const task = await addTask(boardId, { sectionId });
      const newData = [...data];
      const index = newData.findIndex((e) => e._id === sectionId);
      newData[index].tasks.unshift(task);
      setData(newData);
    } catch (err) {
      alert(err);
    }
  };

  //Done
  const onUpdateTask = (task) => {
    const newData = [...data];
    const sectionIndex = newData.findIndex((e) => e._id === task.section._id);
    const taskIndex = newData[sectionIndex].tasks.findIndex(
      (e) => e._id === task._id
    );
    newData[sectionIndex].tasks[taskIndex] = task;
    setData(newData);
  };

  //Done
  const onDeleteTask = (task) => {
    const newData = [...data];
    const sectionIndex = newData.findIndex((e) => e._id === task.section._id);
    const taskIndex = newData[sectionIndex].tasks.findIndex(
      (e) => e._id === task._id
    );
    newData[sectionIndex].tasks.splice(taskIndex, 1);
    setData(newData);
  };

  //Done
  const handelDeleteTask = async (task) => {
    console.log("delete task");
    console.log(boardId, "boardId", task._id, "task._id", "Deleting Task");
    try {
      //await deleteTask(boardId, task._id);
      deleteTask(boardId, task._id);
      onDeleteTask(task);
      //props.onDelete(task);
      //setTask(undefined);
    } catch (err) {
      alert(err);
    }
  };
  /*
const deleteTask = async () => {

  };

*/
  return (
    <div className="flex flex-col space-y-2 h-full">
      <div className="p-2 text-xs">
        <p>{data.length} Sections</p>
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex flex-row items-start h-full  overflow-scroll">
          {data?.map((section, index) => (
            <div
              className="flex flex-col items-center justify-center text-gray-600 h-full w-80"
              key={section._id}
            >
              <Droppable key={section._id} droppableId={section._id}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="flex flex-col  w-full h-full "
                  >
                    <div className="flex flex-col items-center justify-center py-2">
                      <div className="flex flex-row w-full border-y">
                        <input
                          type="text"
                          className="text-slate-900 bg-gray-100 pl-2 "
                          placeholder={section.title}
                          onChange={(e) => updateSectionTitle(e, section._id)}
                        />
                        <div className="flex items-center justify-center w-full">
                          <button
                            onClick={() => handelDeleteSection(section._id)}
                          >
                            <TrashIcon className="w-4 h-4" />
                          </button>
                        </div>
                        <svg
                          className="h-full w-6 flex-shrink-0 text-gray-200"
                          viewBox="0 0 24 44"
                          preserveAspectRatio="none"
                          fill="currentColor"
                          xmlns="http://www.w3.org/2000/svg"
                          aria-hidden="true"
                        >
                          <path d="M.293 0l22 22-22 22h1.414l22-22-22-22H.293z" />
                        </svg>
                      </div>
                      <div className="w-full">
                        <div className="flex flex-row items-center justify-center space-x-5 py-2  w-full">
                          <button
                            className="w-80 border justify-center items-center flex flex-row hover:bg-gray-200"
                            onClick={() => createTask(section._id)}
                          >
                            <PlusIcon className="w-6 h-6" />
                          </button>
                        </div>
                      </div>
                    </div>
                    {section.tasks.map((task, index) => (
                      <Draggable
                        key={task._id}
                        draggableId={task._id}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            onClick={() => {
                              setSelectedTask(task);
                              //setOpen(true);
                            }}
                            cursor={snapshot.isDragging ? "grabbing" : "grab"}
                            className="flex flex-col items-start justify-center text-xs p-2 m-2 bg-orange-50 rounded-md border border-slate-300 shadow-md"
                          >
                            <div className="flex flex-row justify-between mx-auto w-full">
                              <h2 className="font-bold text-sm text-slate-900">
                                {task.title === "" ? "Untitled" : task.title}
                              </h2>

                              <TrashIcon
                                className="w-4 h-4"
                                onClick={() => handelDeleteTask(task)}
                              />
                            </div>
                            <div>
                              <p className="">TaskId: {task._id}</p>
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          ))}
          <div className="flex justify-start border-y  mt-2 items-start w-full pb-2 pt-3 ">
            <div
              className="flex flex-row space-x-3 w-80"
              onClick={handelCreateSection}
            >
              <PlusIcon className="w-6 h-6 text-gray-600/50" />
              <p className="text-gray-500"> Přidat novou sekci</p>
            </div>
          </div>
        </div>
      </DragDropContext>
      <TaskModalRight
        task={selectedTask}
        show={true}
        boardId={boardId}
        onClose={() => setSelectedTask(undefined)}
        onUpdate={onUpdateTask}
        onDelete={onDeleteTask}
      />

      <Task />
    </div>
  );
};

export default Kanban;
