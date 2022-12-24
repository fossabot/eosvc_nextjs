import React, { useState } from "react";
import Modal from "react-modal";
import Profile from "../v2/Profile";
import AddEmployeeForm from "../employee/addEmployeeForm";

function Test() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="flex items-center justify-end">
      <div className="w-20">
        <p
          onClick={() => setIsOpen(true)}
          className="rounded-md bg-yellow-600 text-blue-900 px-5 py-2"
        >
          open
        </p>
      </div>
      <Modal
        isOpen={isOpen}
        shouldCloseOnEsc={true}
        onRequestClose={() => setIsOpen(false)}
      >
        <button onClick={() => setIsOpen(false)}>close</button>
        <AddEmployeeForm />
      </Modal>
    </div>
  );
}

export default Test;
