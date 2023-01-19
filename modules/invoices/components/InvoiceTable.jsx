import Link from "next/link";
import { Fragment, useState } from "react";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import ConfirmDelete from "../modals/ConfirmDelete";
import InvoiceModalRight from "../modals/InvoiceModalRight";
import ShowInvoiceModal from "../modals/ShowInvoiceModal";
import { getAllInvoices } from "../apiCalls/getAllInvoices";
import { deleteInvoice } from "../apiCalls/deleteInvoice";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function TodoList() {
  const [modal, setModal] = useState(false);
  const [invoiceId, setInvoiceId] = useState(null);
  const [selectedInvoice, setSelectedInvoice] = useState(undefined);
  const [filter, setFilter] = useState("");
  const [filterLink, setFilterLink] = useState("");
  // Access the client
  const queryClient = useQueryClient();

  const { data: invoices, isLoading } = useQuery({
    queryKey: ["invoices"],
    queryFn: getAllInvoices,
    refetchInterval: 1000,
  });
  console.log(invoices, "invoices");
  // Mutations
  const deleteMutation = useMutation({
    mutationFn: (invoiceId) => deleteInvoice(invoiceId),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["invoices"] });
    },
  });

  const refetchInvoices = () => {
    queryClient.invalidateQueries({ queryKey: ["invoices"] });
  };

  const handelDeleteTodo = async (id) => {
    console.log("Delete invoiceID: ", id);
    await deleteMutation.mutate(id);
    setInvoiceId(null);
  };

  if (isLoading) return console.log("loading");

  return (
    <div className="px-4 sm:px-6 lg:px-8 overflow-auto">
      {modal && (
        <ConfirmDelete
          invoiceId={invoiceId}
          onClose={() => setModal(false)}
          onDelete={() => handelDeleteTodo(invoiceId)}
        />
      )}
      <InvoiceModalRight
        invoice={selectedInvoice}
        show={true}
        //boardId={boardId}
        onClose={() => setSelectedInvoice(undefined)}
        //onUpdate={onUpdateTask}
        //onDelete={onDeleteTask}
      />
      <ShowInvoiceModal
        invoice={selectedInvoice}
        show={true}
        //boardId={boardId}
        onClose={() => setSelectedInvoice(undefined)}
        //onUpdate={onUpdateTask}
        //onDelete={onDeleteTask}
      />
      <div className="mt-8 flex flex-col">
        <div className="flex flex-row">
          <div className="flex justify-start items-center gap-5 p-5">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Filter (in description):
            </h3>
            <div className="flex items-center justify-center">
              <input
                type="text"
                className="p-2 rounded-md"
                placeholder="filter ..."
                onChange={(e) => {
                  setFilter(e.target.value);
                }}
              />
            </div>
          </div>
          {
            <div className="flex justify-start items-center gap-5 p-5">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Filter (in link):
              </h3>
              <div className="flex items-center justify-center">
                <input
                  type="text"
                  className="p-2 rounded-md"
                  placeholder="filter ..."
                  onChange={(e) => {
                    setFilterLink(e.target.value);
                  }}
                />
              </div>
            </div>
          }
        </div>
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
                      Celkem faktur: {invoices.length}
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {
                    <Fragment key={invoices.id}>
                      {invoices
                        ?.filter((invoice) => {
                          if (filter === "") {
                            return invoice;
                          } else if (
                            todo.description
                              .toLowerCase()
                              .includes(filter.toLowerCase())
                          ) {
                            return invoice;
                          }
                        })
                        ?.map((invoice, invoiceIndex) => (
                          <tr
                            key={invoiceIndex}
                            className={classNames(
                              invoiceIndex === 0
                                ? "border-gray-300"
                                : "border-gray-200",
                              "border-t"
                            )}
                          >
                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                              {invoice._id.substring(0, 3) +
                                "..." +
                                invoice._id.substring(invoice._id.length - 3)}
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              {invoice.type}
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              {invoice.description.substring(0, 60) + " ..."}
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              <Link href={"#"} target="_blank">
                                {" link to invoice"}
                                {/*todo.url.substring(0, 40) + " ..."*/}
                              </Link>
                            </td>
                            <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                              <div className="flex flex-row gap-3">
                                <PencilSquareIcon
                                  className="w-4 h-4"
                                  onClick={() => {
                                    setSelectedInvoice(invoice);
                                    //setOpen(true);
                                  }}
                                />
                                <TrashIcon
                                  className="w-4 h-4"
                                  onClick={() => {
                                    setModal(true);
                                    setInvoiceId(invoice._id);
                                  }}
                                />
                              </div>
                            </td>
                          </tr>
                        ))}
                    </Fragment>
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
