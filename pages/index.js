import Head from "next/head";
import { getSession, useSession, signOut } from "next-auth/react";
import AppLayoutV2 from "../layout/AppLayoutV2";
import { useRouter } from "next/router";
import Main from "../components/v2/Main";
import PageTemplate from "../components/v2/PageTemplate";
import { useDispatch } from "react-redux";
import { getSessionAsync } from "../redux/sessionSlice";
import { useEffect, useState } from "react";
import LoadingSpinner from "../components/loadings/LoadingSpinner";
import { getUserSession } from "../modules/user/apiCalls/getUserSession";

import { useSelector } from "react-redux";
import { loadingState } from "../redux/loadingSlice";

const pageTitle = "Dashboard";

const Template = (props) => {
  const dispatch = useDispatch();
  const { data: session } = useSession();
  const sessionRedux = useSelector((state) => state.session);
  const isLoading = useSelector((state) => state.loading.value);
  //const [isLoading, setIsLoading] = useState(true);
  console.log(isLoading, "isLoading");
  //return console.log("stop");

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
    //setIsLoading(false);
  }, []);

  const router = useRouter();

  if (isLoading) return <LoadingSpinner message="Načítám data..." />;
  //return console.log("stop");

  return (
    <div className="w-screen">
      <Head>
        <title>{pageTitle}</title>
      </Head>
      {session ? User({ session }) : router.push("/login")}
    </div>
  );
};

export default Template;

// Authorize User
function User() {
  //console.log(session);
  return (
    <AppLayoutV2>
      <PageTemplate pageTitle={pageTitle}>
        <Main />
      </PageTemplate>
    </AppLayoutV2>
  );
}

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

  const userSession = await getUserSession(
    session.user.email,
    session.user.name
  );
  return {
    props: { session, userSession },
  };
}
