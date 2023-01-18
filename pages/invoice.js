import Head from "next/head";
import { getSession, useSession, signOut } from "next-auth/react";
import AppLayoutV2 from "../layout/AppLayoutV2";
import { useRouter } from "next/router";
import ModulNotReady from "../components/v2/ModulNotReady";
import PageTemplate from "../components/v2/PageTemplate";
import { useDispatch } from "react-redux";
import { getSessionAsync } from "../redux/sessionSlice";
import { useEffect, useState } from "react";
import { getUserSession } from "../modules/user/apiCalls/getUserSession";
import { useSelector } from "react-redux";
import { loadingState } from "../redux/loadingSlice";
import LoadingSpinner from "../components/loadings/LoadingSpinner";
import InvoicesMain from "../modules/invoices/InvoicesMain";

const pageTitle = "Fakturace";

const Template = (props) => {
  const dispatch = useDispatch();
  const { data: session } = useSession();
  const sessionRedux = useSelector((state) => state.session);
  const isLoading = useSelector((state) => state.loading.value);

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

export default Template;

// Authorize User
function User() {
  //console.log(session);
  return (
    <AppLayoutV2>
      <PageTemplate pageTitle={pageTitle}>
        <InvoicesMain />
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
