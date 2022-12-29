import React from "react";

function LayoutTest() {
  return (
    <div className="mx-auto flex items-center h-screen  w-full justify-center bg-black text-white">
      <div className="flex flex-row absolute inset-0 items-start justify-start border border-blue-500">
        <div className="flex h-full border border-blue-500">
          <h1>Sidebar</h1>
        </div>
        <div className="flex flex-col w-full h-full">
          <div className="flex w-full border border-blue-100">
            <h1>Header</h1>
          </div>
          <div className="flex w-full border h-full border-blue-100 overflow-auto">
            <h1>Main</h1>
          </div>
          <div className="flex w-full border border-blue-100">
            <h1>Footer</h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LayoutTest;
