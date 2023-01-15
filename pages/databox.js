import Head from "next/head";
import { getSession, useSession, signOut } from "next-auth/react";
import AppLayoutV2 from "../layout/AppLayoutV2";
import { useRouter } from "next/router";
import PageTemplate from "../components/v2/PageTemplate";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getSessionAsync } from "../redux/sessionSlice";
import { getUserSession } from "../modules/user/apiCalls/getUserSession";
import { loadingState } from "../redux/loadingSlice";
import DataBoxMain from "../modules/dataBox/DataBoxMain";
import LoadingSpinner from "../components/loadings/LoadingSpinner";

const pageTitle = "Datová schránka";

const DataBox = (props) => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.loading.value);
  const { data: session } = useSession();
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

  const router = useRouter();
  if (isLoading) return <LoadingSpinner message="Načítám data..." />;

  return (
    <div className="w-full">
      <Head>
        <title>{pageTitle}</title>
      </Head>
      {session ? User({ session }) : router.push("/login")}
    </div>
  );
};

export default DataBox;

// Authorize User
function User() {
  //console.log(session);
  return (
    <AppLayoutV2>
      <PageTemplate pageTitle={pageTitle}>
        <DataBoxMain />
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
  const userSession = await getUserSession(session.user.email);
  return {
    props: { session, userSession },
  };
}
