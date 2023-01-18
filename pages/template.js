import { useEffect, useRef, useState } from "react";
import Template from "../layout/template";
import TableUi from "../components/tables/TableUi";
import LoadingSpinner from "../components/loadings/LoadingSpinner";
import { useSelector } from "react-redux";
import { getSessionAsync } from "../redux/sessionSlice";
import { getUserSession } from "../modules/user/apiCalls/getUserSession";
import { getSession } from "next-auth/react";
import { useDispatch } from "react-redux";
import { loadingState } from "../redux/loadingSlice";
import { HomeIcon } from "@heroicons/react/20/solid";

function Demo(props) {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.loading.value);
  const sessionRedux = useSelector((state) => state.session);

  useEffect(() => {
    if (sessionRedux._id === "0") {
      console.log("I dont have user dispatch him!");
      (async () => {
        await dispatch(getSessionAsync(props.userSession.session.email)).then(
          () => {
            dispatch(loadingState(false));
            //setIsLoading(false);
          }
        );
      })();
    }
    dispatch(loadingState(false));
  }, []);

  const inputRef = useRef(null);
  const [inputValue, setInputValue] = useState("");

  function handleBlur() {
    console.log("Input value changed to:", inputRef.current.value);
    setInputValue(""); // Clear the input field
  }

  const pages = [
    { name: "Projects", href: "#", current: false },
    { name: "Project Nero", href: "#", current: true },
  ];

  if (isLoading) return <LoadingSpinner message="Načítám data..." />;

  return (
    <Template>
      <div className="p-2 space-y-5">
        {/* <DocumentsPage /> <Test /> */}
        <div>
          <form>
            <input
              type="text"
              ref={inputRef}
              value={inputValue}
              onBlur={handleBlur}
              onChange={(e) => setInputValue(e.target.value)}
            />
          </form>
        </div>

        <div>
          <nav className="flex" aria-label="Breadcrumb">
            <ol
              role="list"
              className="flex space-x-4 rounded-md bg-white px-6 shadow"
            >
              <li className="flex">
                <div className="flex items-center">
                  <a href="#" className="text-gray-400 hover:text-gray-500">
                    <HomeIcon
                      className="h-5 w-5 flex-shrink-0"
                      aria-hidden="true"
                    />
                    <span className="sr-only">Home</span>
                  </a>
                </div>
              </li>
              {pages.map((page) => (
                <li key={page.name} className="flex">
                  <div className="flex items-center">
                    <svg
                      className="h-full w-6 flex-shrink-0 text-gray-200"
                      viewBox="0 0 24 44"
                      preserveAspectRatio="none"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path d="M.293 0l22 22-22 22h1.414l22-22-22-22H.293z" />
                    </svg>
                    <a
                      href={page.href}
                      className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700"
                      aria-current={page.current ? "page" : undefined}
                    >
                      {page.name}
                    </a>
                  </div>
                </li>
              ))}
            </ol>
          </nav>
        </div>
        <TableUi />
      </div>
    </Template>
  );
}

export default Demo;

export async function getServerSideProps({ req }) {
  const session = await getSession({ req });

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  const userSession = await getUserSession(session.user.email);
  return {
    props: { session, userSession },
  };
}
