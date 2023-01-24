import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import Moment from "moment";
import { getAllUserBoards } from "../../projects/apiCalls/getAllUserBoards";
import { getSections } from "../../projects/apiCalls/getSections";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { addTaskFromInvoice } from "../apiCalls/addTaskFromInvoice";
import { Document, Page } from "react-pdf";
//import { Document, Page, View } from "@react-pdf/renderer";

import dynamic from "next/dynamic";

const PDFViewer = dynamic(
  () => import("../../../components/pdfViewer/pdfViewer"),
  {
    ssr: false,
  }
);

export default function InvoiceModalRight(props) {
  const { _id: userId } = useSelector((state) => state.session);
  const [invoice, setInvoice] = useState(props.invoice);
  const [selectedProject, setSelectedProject] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
  const [open, setOpen] = useState(true);

  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  // Access the client
  const { data: projects, isLoading } = useQuery({
    enabled: !!userId,
    queryKey: ["projectsInvoiceModal", userId],
    queryFn: async () => {
      const result = await getAllUserBoards(userId);
      setSelectedProject(result[0]?._id);
      return result;
    },
  });

  const projectId = selectedProject || projects ? projects[0]?._id : "";

  // Then get the user's projects
  const { data: sections, onSuccess } = useQuery({
    enabled: !!projectId,
    queryKey: ["sectionsInvoiceModal", projectId],
    queryFn: async () => {
      const result = await getSections(projectId);
      setSelectedSection(result[0]?._id);
      return result;
    },
  });

  //Done
  const onClose = () => {
    props.onClose();
  };

  // Mutations
  const addTaskFroInvoiceMutation = useMutation({
    mutationFn: () =>
      addTaskFromInvoice(selectedProject, selectedSection, todo),
    onSuccess: () => {
      console.log("Task from Todo added successfully");
    },
  });

  const handelCreateTaskInProject = async (e) => {
    e.preventDefault();
    await addTaskFroInvoiceMutation.mutate(
      selectedProject,
      selectedSection,
      invoice
    );
    props.onClose();
  };

  if (isLoading) return <div>Loading...</div>;

  if (invoice !== undefined)
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

          <div className="fixed inset-0 overflow-hidden border border-black">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16 ">
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
                                Faktura ID: -
                                {/*crypto.randomUUID()*/ invoice._id}
                              </Dialog.Title>
                              <p className="text-sm text-gray-500">
                                Modal pro zobrazení faktury
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
                            <h1>Detail faktury</h1>
                          </div>
                          <div className="flex flex-col text-sm py-2">
                            <div className="flex flex-row">
                              <div className="px-4 sm:px-6 font-bold">
                                Vytvořen:
                              </div>
                              <div>
                                {Moment(invoice.createdAt).format(
                                  "YYYY-MM-DD-HH:mm"
                                )}
                              </div>
                            </div>

                            <div className="flex flex-row">
                              <div className="px-4 sm:px-6 font-bold">
                                Naposledy editováno:
                              </div>
                              <div>
                                {/*Moment(task.lastEditedAt).format(
                                  "YYYY-MM-DD-HH:mm"
                                )*/}
                              </div>
                            </div>
                          </div>
                          <div className="w-full">
                            {invoice.invoice_file_mimeType ===
                              "application/pdf" && (
                              <div>
                                {/*      <iFrame
                                    className="w-full h-[800px]"
                                    src={invoice.invoice_file_url}
                                  ></iFrame> 
                                  //how to render pdf in react js
                                  //PDFViewer(invoice.invoice_file_url)
                                  <PDFViewer />
                                  */}

                                <PDFViewer />
                                {invoice.invoice_file_url}
                              </div>
                            )}
                            {invoice.invoice_file_mimeType === "image/png" && (
                              <div>
                                <img
                                  src={invoice.invoice_file_url}
                                  className="object-fill"
                                />
                              </div>
                            )}
                          </div>
                          <div className="flex justify-start items-center w-full p-5 gap-2">
                            <div>Vytovřit úkol z faktury:</div>
                            <div>
                              <select
                                className="border border-gray-300 rounded-md p-2"
                                onChange={(e) => {
                                  //console.log(e.target.value);
                                  setSelectedProject(e.target.value);
                                }}
                                //onChange={handelUpdateProject}
                              >
                                {projects.map((project, index) => (
                                  <option key={index} value={project._id}>
                                    {project.title}
                                  </option>
                                ))}
                              </select>
                            </div>
                            {sections && (
                              <div>
                                <select
                                  className="border border-gray-300 rounded-md p-2"
                                  onChange={(e) => {
                                    //console.log(e.target.value);
                                    setSelectedSection(e.target.value);
                                  }}
                                  //onChange={handelUpdateProject}
                                >
                                  {sections?.map((section, index) => (
                                    <option key={index} value={section._id}>
                                      {section.title}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            )}
                          </div>
                          <div className="px-5">
                            <button
                              className="my-button-v2"
                              onClick={handelCreateTaskInProject}
                            >
                              {isLoading
                                ? "... Loading"
                                : "Vytvořit úkol do modulu Projekty"}
                            </button>
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
