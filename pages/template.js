import { useEffect, useRef, useState } from "react";
import Template from "../layout/template";
import TableUi from "../components/tables/TableUi";
import Test from "../components/modals/test";
import DocumentsPage from "../modules/documents/documents";
import LoadingSpinner from "../components/loadings/LoadingSpinner";
import { useSelector } from "react-redux";
import { getSessionAsync, selectSession } from "../redux/sessionSlice";
import { getUserSession } from "../modules/user/apiCalls/getUserSession";
import { getSession, useSession } from "next-auth/react";
import { useDispatch } from "react-redux";
import { loadingState } from "../redux/loadingSlice";

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
  }, []);

  const inputRef = useRef(null);
  const [inputValue, setInputValue] = useState("");

  function handleBlur() {
    console.log("Input value changed to:", inputRef.current.value);
    setInputValue(""); // Clear the input field
  }

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
        {/* <DocumentsPage />*/}
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
