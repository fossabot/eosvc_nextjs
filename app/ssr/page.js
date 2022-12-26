const fetchData = async () =>
  await fetch("http://localhost:3000/api/documents/images").then((response) =>
    response.json()
  );

export default async function ssr() {
  const data = await fetchData();

  return (
    <div className="flex flex-col w-full border items-center justify-center">
      <h1 className="text-red-500">test ssr</h1>
      <div className="flex flex-row items-center justify-between border border-blue-500 w-full">
        {data.map((image, i) => {
          return (
            <div key={i} className=" bg-gray-500">
              <h1>Image ID: {image._id}</h1>
              <img className="object-fit" src={image.myFile} alt="" />
            </div>
          );
        })}
      </div>
    </div>
  );
}
