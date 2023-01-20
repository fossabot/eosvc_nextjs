function PageTemplate({ children, pageTitle }) {
  return (
    <main className="flex flex-col bg-gray-100 rounded-md  w-full  overflow-scroll">
      <div className="flex justify-center items-center sticky bg-gray-100 top-0">
        <h1 className="text-3xl font-bold py-5 ">{pageTitle}</h1>
      </div>
      <div className="flex items-center justify-center my-3">{children}</div>
    </main>
  );
}

export default PageTemplate;
