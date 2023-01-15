import { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { deleteTask } from "./apiCalls/deleteTask";
import Moment from "moment";
import { updateTaskTitle } from "./apiCalls/updateTaskTitle";
import dynamic from "next/dynamic";
import { updateTask } from "./apiCalls/updateTask";

let timer = null;
const timeout = 500;
let isModalClosed = false;

export default function Example(props) {
  //console.log(props, "props TaskModalRight");
  const boardId = props.boardId;
  const [task, setTask] = useState(props.task);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  //const [newContent, setNewContent] = useState("");
  //const editorWrapperRef = useRef();
  const [open, setOpen] = useState(true);
  const Editor = dynamic(() => import("../../components/ckEditor/myEditor"), {
    ssr: false,
  });

  useEffect(() => {
    setTask(props.task);
    setTitle(props.task !== undefined ? props.task.title : "");
    setContent(props.task !== undefined ? props.task.content : "");
  }, [props.task]);

  //Done
  const handelUpdateContent = async (e) => {
    clearTimeout(timer);
    const newContent = e.target.value;
    timer = setTimeout(async () => {
      try {
        //await taskApi.update(boardId, task._id, { title: newTitle });
        await updateTask(task._id, { content: newContent });
      } catch (err) {
        alert(err);
      }
    }, timeout);

    task.content = newContent;
    setContent(newContent);
    props.onUpdate(task);
  };

  //Done
  const onClose = () => {
    isModalClosed = true;
    props.onUpdate(task);
    props.onClose();
  };

  //Done
  const handelDeleteTask = async () => {
    console.log(task._id, "task._id to delete");
    try {
      await deleteTask(boardId, task._id);
      props.onDelete(task);
      setTask(undefined);
      props.onClose();
    } catch (err) {
      alert(err);
    }
  };

  //Done
  const handelUpdateTitle = async (e) => {
    clearTimeout(timer);
    const newTitle = e.target.value;
    timer = setTimeout(async () => {
      try {
        //await taskApi.update(boardId, task._id, { title: newTitle });
        await updateTaskTitle(task._id, { title: newTitle });
      } catch (err) {
        alert(err);
      }
    }, timeout);

    task.title = newTitle;
    setTitle(newTitle);
    props.onUpdate(task);
  };

  if (task !== undefined)
    return (
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => {
            setOpen;
            onClose();
          }}
        >
          <div className="fixed inset-0" />

          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
                <Transition.Child
                  as={Fragment}
                  enter="transform transition ease-in-out duration-500 sm:duration-700"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-500 sm:duration-700"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <Dialog.Panel className="pointer-events-auto w-screen max-w-2xl">
                    <form className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                      <div className="flex-1 w-full">
                        {/* Header */}
                        <div className="bg-gray-50 px-4 py-6 sm:px-6">
                          <div className="flex items-start justify-between space-x-3">
                            <div className="space-y-1">
                              <Dialog.Title className="text-lg font-medium text-gray-900">
                                Task ID: - {task._id}
                              </Dialog.Title>
                              <p className="text-sm text-gray-500">
                                Modal pro editaci úkolu
                              </p>
                            </div>
                            <div className="flex h-7 items-center">
                              <button
                                type="button"
                                className="text-gray-400 hover:text-gray-500"
                                onClick={() => {
                                  setOpen;
                                  onClose();
                                }}
                              >
                                <span className="sr-only">Zavřít panel</span>
                                <XMarkIcon
                                  className="h-6 w-6"
                                  aria-hidden="true"
                                />
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Divider container */}
                        <div className="space-y-6 py-6 sm:space-y-0 sm:divide-y sm:divide-gray-200 sm:py-0">
                          {/* Project name */}
                          <div className="space-y-1 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5 ">
                            <div className="flex items-center justify-center">
                              <label
                                htmlFor="project-name"
                                className=" text-sm font-bold text-gray-900  "
                              >
                                Název úkolu
                              </label>
                            </div>
                            <div className="flex items-center justify-center sm:col-span-2 border border-gray-300 rounded-md p-2">
                              <input
                                type="text"
                                value={title}
                                placeholder={
                                  task.title === "" ? "Untitled" : task.title
                                }
                                onChange={handelUpdateTitle}
                                className="w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
                              />
                            </div>
                          </div>
                          <div className="flex flex-col text-sm py-2">
                            <div className="flex flex-row">
                              <div className="px-4 sm:px-6 font-bold">
                                Vytvořen:
                              </div>
                              <div>
                                {Moment(task.createdAt).format(
                                  "YYYY-MM-DD-HH:mm"
                                )}
                              </div>
                            </div>
                            <div className="flex flex-row">
                              <div className="px-4 sm:px-6 font-bold">
                                Naposledy editováno:
                              </div>
                              <div>
                                {Moment(task.lastEditedAt).format(
                                  "YYYY-MM-DD-HH:mm"
                                )}
                              </div>
                            </div>
                            <div className="flex flex-row">
                              <div className="px-4 sm:px-6 font-bold">
                                Termín dokončení:
                              </div>
                              <div>
                                {task.dueDateAt === null
                                  ? "Termín není definován"
                                  : Moment(task.dueDateAt).format(
                                      "YYYY-MM-DD-HH:mm"
                                    )}
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-col text-sm py-2">
                            <div className="flex flex-row">
                              <div className="px-4 sm:px-6 font-bold">
                                Priorita:
                              </div>
                              <div>
                                <select name="" id="priority">
                                  <option value="low">low</option>
                                  <option value="normal" selected>
                                    normal
                                  </option>
                                  <option value="high">high</option>
                                  <option value="critical">critical</option>
                                </select>
                              </div>
                            </div>
                          </div>

                          {/* Project description */}
                          <div className="w-full border border-green-300 space-y-1 px-4">
                            <div>
                              <label
                                htmlFor="project-description"
                                className="block text-sm font-bold text-gray-900 sm:mt-px sm:pt-2"
                              >
                                Popis úkolu:
                              </label>
                            </div>
                            <div className="w-full">
                              <textarea
                                type="text"
                                value={content}
                                placeholder={
                                  task.content === ""
                                    ? "Untitled"
                                    : task.content
                                }
                                onChange={handelUpdateContent}
                                className="w-full rounded-md p-2 border border-gray-300 shadow-sm sm:text-sm"
                              />
                            </div>
                          </div>
                          <div className="flex justify-center items-center w-full p-5">
                            {/* Editor
                            <Editor
                              value={content}
                              className="w-full h-96"
                              onChange={(v) => {
                                console.log(v);
                                () => setNewContent(v);
                              }}
                            />
                            */}
                          </div>
                        </div>
                      </div>

                      {/* Action buttons */}
                      <div className="flex-shrink-0 border-t border-gray-200 px-4 py-5 sm:px-6">
                        <div className="flex justify-end space-x-3">
                          <button
                            type="button"
                            className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            onClick={() => {
                              setOpen;
                              onClose();
                            }}
                          >
                            Cancel
                          </button>
                          <button
                            type="button"
                            className="rounded-md border border-gray-300 bg-red-500 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-red-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                            onClick={() => {
                              setOpen;
                              handelDeleteTask(task._id);
                              onClose();
                            }}
                          >
                            Smazat
                          </button>
                          <button type="submit" className="my-button-v2">
                            Uložit
                          </button>
                        </div>
                      </div>
                    </form>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    );
}
