import Link from "next/link";
import { Fragment, useState } from "react";
import {
  PencilSquareIcon,
  TrashIcon,
  EyeIcon,
  PhotoIcon,
  DocumentIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Moment from "moment";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import ConfirmDelete from "../modals/ConfirmDelete";
import InvoiceModalRight from "../modals/InvoiceModalRight";
import ShowInvoiceModal from "../modals/ShowInvoiceModal";
import LoadingSpinner from "../../../components/loadings/LoadingSpinner";
import { getAllInvoices } from "../apiCalls/getAllInvoices";
import { deleteInvoice } from "../apiCalls/deleteInvoice";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function TodoList() {
  const [modal, setModal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [invoiceId, setInvoiceId] = useState(null);
  const [invoiceFileUrl, setInvoiceFileUrl] = useState(null);
  const [selectedInvoice, setSelectedInvoice] = useState(undefined);
  const [filter, setFilter] = useState("");
  const [filterLink, setFilterLink] = useState("");
  const [hasData, setHasData] = useState(false);
  // console.log(selectedInvoice, "selectedInvoice");
  // console.log(showModal, "showModal");
  console.log(invoiceFileUrl, "invoiceFileUrl");
  // Access the client
  const queryClient = useQueryClient();

  const { data: invoices, isLoading } = useQuery({
    queryKey: ["invoices"],
    queryFn: getAllInvoices,
    //refetch invoices every 5 second
    refetchInterval: 5000,
    onSuccess: (data) => {
      //console.log(data, "data");
      setHasData(true);
    },
    onError: (error) => {
      console.log(error, "error");
      setHasData(false);
    },
  });
  //console.log(invoices, "invoices");

  // Mutations
  const deleteMutation = useMutation({
    mutationFn: (invoiceFileUrl, invoiceId) => {
      deleteInvoice(invoiceFileUrl, invoiceId);
    },
    onMutate: () => toast("Mažu fakturu!"),
    //isLoading: () => toast("Wow so easy!"),
    onSuccess: () => {
      setInvoiceId(null);
      setInvoiceFileUrl(null);
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["invoices"] });
    },
  });

  const handelDeleteTodo = async (invoiceFileUrl, invoiceId) => {
    console.log("Delete invoiceID: ", invoiceFileUrl, invoiceId);
    await deleteMutation.mutate({ invoiceFileUrl, invoiceId });
  };

  if (isLoading) return <LoadingSpinner message={"Načítám faktury ..."} />;

  return (
    <div className="flex overflow-y-auto  ">
      {modal && (
        <ConfirmDelete
          invoiceId={invoiceId}
          onClose={() => setModal(false)}
          onDelete={() => {
            toast.success("Faktura smazána!");
            handelDeleteTodo(invoiceFileUrl, invoiceId);
          }}
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
      {showModal && (
        <ShowInvoiceModal
          invoice={selectedInvoice}
          show={true}
          //boardId={boardId}
          onClose={() => {
            setSelectedInvoice(undefined);
            setShowModal(false);
          }}
          //onUpdate={onUpdateTask}
          //onDelete={onDeleteTask}
        />
      )}
      <div className="flex flex-col w-full ">
        <ToastContainer
          position="top-right"
          autoClose={1000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <div className="flex flex-row">
          <div className="flex justify-start items-center gap-2 p-2">
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
          <div className="flex justify-start items-center gap-2 p-2">
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
        </div>
        {/* Need to scroll in this div */}

        <div className=" min-w-full py-2 align-middle ">
          {/* Table with invoices */}
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
                    Vytvořena
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-300"
                  >
                    Type
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
                    {hasData &&
                      invoices
                        ?.filter((invoice) => {
                          if (filter === "") {
                            return invoice;
                          } else if (
                            invoice.description
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
                              {Moment(invoice.createdAt).format(
                                "YYYY-MM-DD-HH:mm"
                              )}
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              {invoice.invoice_type}
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              {invoice.description.substring(0, 60) + " ..."}
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              <Link href={""} target="_blank">
                                {" link to invoice"}
                                {/*todo.url.substring(0, 40) + " ..."*/}
                              </Link>
                            </td>
                            <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                              <div className="flex flex-row gap-3 items-end justify-end">
                                <ExclamationTriangleIcon
                                  className="w-4 h-4"
                                  onClick={() => toast.success("Test")}
                                />
                                <EyeIcon
                                  className="w-4 h-4"
                                  onClick={() => {
                                    setSelectedInvoice(invoice);
                                    setShowModal(true);
                                    //setOpen(true);
                                  }}
                                />
                                {invoice.invoice_file_mimeType ===
                                  "image/png" && (
                                  <PhotoIcon className="w-4 h-4" />
                                )}
                                {invoice.invoice_file_mimeType ===
                                  "application/pdf" && (
                                  <DocumentIcon className="w-4 h-4" />
                                )}
                                <PencilSquareIcon
                                  className="w-4 h-4"
                                  onClick={() => {
                                    setSelectedInvoice(invoice);
                                    setShowModal(true);
                                    //setOpen(true);
                                  }}
                                />
                                <TrashIcon
                                  className="w-4 h-4"
                                  onClick={() => {
                                    setModal(true);
                                    setInvoiceId(invoice._id);
                                    setInvoiceFileUrl(invoice.invoice_file_url);
                                  }}
                                />
                              </div>
                            </td>
                          </tr>
                        ))}
                    {!hasData && (
                      <tr>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                          Dafa faktur se nanačetla z mongoDB, proveďte reload
                          stránky (ctrl+F5) pro nové načtení dat.
                        </td>
                      </tr>
                    )}
                  </Fragment>
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
