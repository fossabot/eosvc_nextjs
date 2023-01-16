import Link from "next/link";
import { Fragment } from "react";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function TodoList({ todos }) {
  console.log(todos, "todos");
  //return console.log("stop");

  const handelDeleteTodo = (id) => {
    console.log("Delete TaskID: ", id);
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 overflow-auto">
      <div className="mt-8 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="min-w-full">
                <thead className="bg-slate-900 ">
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-300 sm:pl-6"
                    >
                      ID
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-300"
                    >
                      Title
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-300"
                    >
                      Description
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-300"
                    >
                      URL
                    </th>

                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-300"
                    >
                      total todos: {todos.length}
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  <Fragment key={todos.id}>
                    {todos?.map((todo, todoIndex) => (
                      <tr
                        key={todo.id}
                        className={classNames(
                          todoIndex === 0
                            ? "border-gray-300"
                            : "border-gray-200",
                          "border-t"
                        )}
                      >
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                          {todo._id.substring(0, 3) +
                            "..." +
                            todo._id.substring(todo._id.length - 3)}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {todo.title}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {todo.description.substring(0, 60) + " ..."}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          <Link href={todo.url}>
                            {" "}
                            {todo.url.substring(0, 40) + " ..."}
                          </Link>
                        </td>
                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                          <div className="flex flex-row gap-3">
                            <PencilSquareIcon className="w-4 h-4" />
                            <TrashIcon
                              className="w-4 h-4"
                              onClick={() => handelDeleteTodo(todo._id)}
                            />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </Fragment>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
