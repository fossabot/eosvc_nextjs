import { useState } from "react";
import { Dialog } from "@headlessui/react";

export default function MyDialog() {
  let [setModal, setOpenModal] = useState(false);

  return (
    <Dialog
      open={setModal}
      onClose={() => setOpenModal(false)}
      className="relative z-50"
    >
      {/* The backdrop, rendered as a fixed sibling to the panel container */}
      <div
        className="fixed inset-20 rounded-md bg-black  "
        aria-hidden="true"
      />

      {/* Full-screen scrollable container */}
      <div className="fixed inset-0 overflow-y-auto">
        {/* Container to center the panel */}
        <div className="flex min-h-full items-center justify-center p-4">
          {/* The actual dialog panel  */}
          <Dialog.Panel className="mx-auto w-80 h-80 rounded bg-white">
            <Dialog.Title>Complete your order</Dialog.Title>
            {/* ... */}
          </Dialog.Panel>
        </div>
      </div>
    </Dialog>
  );
}
