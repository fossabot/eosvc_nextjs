function DashboardBox({ children }) {
  return (
    <div className="flex flex-row w-1/2 p-2 ">
      <div className="flex  flex-col w-full bg-gray-200 p-5 rounded-md ">
        {children}
      </div>
    </div>
  );
}

export default DashboardBox;
