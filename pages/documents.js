import Head from "next/head";
import { getSession, useSession, signOut } from "next-auth/react";
import AppLayoutV2 from "../layout/AppLayoutV2";
import { useRouter } from "next/router";
import ModulNotReady from "../components/v2/ModulNotReady";
import PageTemplate from "../components/v2/PageTemplate";
import { getSessionAsync } from "../redux/sessionSlice";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getUserSession } from "../modules/user/apiCalls/getUserSession";
import LoadingSpinner from "../components/loadings/LoadingSpinner";
import { loadingState } from "../redux/loadingSlice";
import DocumentsMain from "../modules/documents/DocumentsMain";

const pageTitle = "Dokumenty";

const Documents = (props) => {
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

export default Documents;

// Authorize User
function User() {
  //console.log(session);
  return (
    <AppLayoutV2>
      <PageTemplate pageTitle={pageTitle}>
        <DocumentsMain />
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
