function PageTemplate({ children, pageTitle }) {
  return (
    <main className="bg-gray-100 rounded-sm  h-full">
      <div className="flex justify-center items-center pt-2">
        <h1 className="text-4xl font-bold">{pageTitle}</h1>
      </div>
      <div>{children}</div>
    </main>
  );
}

export default PageTemplate;
