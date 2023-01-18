import { PlusIcon } from "@heroicons/react/20/solid";

export default function NewProject({ userId }) {
  //Create new project Empty project

  const handleDefaultProject = async () => {
    console.log("Creating Default Project");
    try {
      const _id = userId;
      const title = "Nový projekt";
      const description = "Popis projektu";
      await createBoard(_id, title, description);
      setNewProject(true);
    } catch (error) {
      console.log(errors);
    }
  };

  return (
    <div className="text-center pt-5">
      <svg
        className="mx-auto h-12 w-12 text-gray-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          vectorEffect="non-scaling-stroke"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
        />
      </svg>
      <h3 className="mt-2 text-sm font-medium text-gray-900">
        Aktuálně neexistuje v systému projekt
      </h3>
      <p className="mt-1 text-sm text-gray-500">
        Začněte tím, že založíte nový projekt.
      </p>
      <div className="mt-6 px-24">
        <button
          type="button"
          className="my-button-v2"
          onClick={handleDefaultProject}
        >
          <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
          Nový projekt
        </button>
      </div>
    </div>
  );
}
