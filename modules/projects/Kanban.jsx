import { useEffect } from "react";
import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { setSection } from "../../redux/projects/sectionSlice";
import LoadingSpinner from "../../components/loadings/LoadingSpinner";
import { updateSection } from "./apiCalls/updateSection";
import { addTask } from "./apiCalls/addTask";
import TaskModal from "./bck/TaskModal";
import Task from "./bck/Task";
import TaskModalRight from "./TaskModalRight";
import { updateTaskPosition } from "./apiCalls/updateTaskPosition";

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

  const createSection = async () => {
    try {
      const section = await sectionApi.create(boardId);
      setData([...data, section]);
    } catch (err) {
      alert(err);
    }
  };

  const deleteSection = async (sectionId) => {
    try {
      await sectionApi.delete(boardId, sectionId);
      const newData = [...data].filter((e) => e._id !== sectionId);
      setData(newData);
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

  const onUpdateTask = (task) => {
    const newData = [...data];
    const sectionIndex = newData.findIndex((e) => e.id === task.section.id);
    const taskIndex = newData[sectionIndex].tasks.findIndex(
      (e) => e.id === task.id
    );
    newData[sectionIndex].tasks[taskIndex] = task;
    setData(newData);
  };

  const onDeleteTask = (task) => {
    const newData = [...data];
    const sectionIndex = newData.findIndex((e) => e.id === task.section.id);
    const taskIndex = newData[sectionIndex].tasks.findIndex(
      (e) => e.id === task.id
    );
    newData[sectionIndex].tasks.splice(taskIndex, 1);
    setData(newData);
  };

  /*


*/
  return (
    <div className="flex flex-col border p-2 space-y-2 border-pink-700">
      <div>
        <button className="my-button" onClick={createSection}>
          Add section
        </button>
        <p>{data.length} Sections</p>
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex flex-row items-start px-2 gap-2 ">
          {data?.map((section, index) => (
            <div
              className="flex flex-col items-center justify-center text-white h-full w-80 bg-gray-500 p-2 rounded-md"
              key={section._id}
            >
              <Droppable key={section._id} droppableId={section._id}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="flex flex-col rounded-md border w-full bg-gray-300 p-2 gap-2"
                  >
                    <div className="space-x-1 space-y-2">
                      {section.title}
                      <div>
                        <input
                          type="text"
                          placeholder={section.title}
                          onChange={(e) => updateSectionTitle(e, section._id)}
                        />
                        <button onClick={() => createTask(section._id)}>
                          create
                        </button>
                        <button onClick={() => deleteSection(section._id)}>
                          del
                        </button>
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
                              setOpen(true);
                            }}
                            cursor={snapshot.isDragging ? "grabbing" : "grab"}
                            className="flex flex-col items-start justify-center text-xs p-2 bg-gray-500 rounded-md"
                          >
                            <h1>TaskId: {task._id}</h1>
                            <h2>
                              {task.title === "" ? "Untitled" : task.title}
                            </h2>
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
        </div>
      </DragDropContext>
      {open && <TaskModalRight open={open} />}
      <Task />
    </div>
  );
};

export default Kanban;
