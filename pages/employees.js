import Head from "next/head";
import { getSession, useSession, signOut } from "next-auth/react";
import AppLayoutV2 from "../layout/AppLayoutV2";
import Employees from "../modules/Employees";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import PageTemplate from "../components/v2/PageTemplate";
import { getUserSession } from "../modules/user/apiCalls/getUserSession";
import LoadingSpinner from "../components/loadings/LoadingSpinner";
import { getSessionAsync } from "../redux/sessionSlice";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { loadingState } from "../redux/loadingSlice";

const EmployeesHome = (props) => {
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
  }, []);

  const router = useRouter();
  if (isLoading) return <LoadingSpinner message="Načítám data..." />;

  return (
    <div className="w-full">
      <Head>
        <title>Zaměstnanci</title>
      </Head>
      {session ? User({ session }) : router.push("/login")}
    </div>
  );
};

export default EmployeesHome;

// Authorize User
function User() {
  //console.log(session);
  return (
    <AppLayoutV2>
      <PageTemplate pageTitle="Zaměstnanci">
        <Employees />
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
