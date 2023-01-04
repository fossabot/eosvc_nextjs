import Head from "next/head";
import { getSession, useSession, signOut } from "next-auth/react";
import AppLayoutV2 from "../layout/AppLayoutV2";
import { useRouter } from "next/router";
import Main from "../components/v2/Main";
import PageTemplate from "../components/v2/PageTemplate";
import { useQuery } from "react-query";
import { getUserId } from "../modules/user/apiCalls/getUserId";
import { useDispatch } from "react-redux";
import { update } from "../redux/userSlice";
import LoadingSpinner from "../components/loadings/LoadingSpinner";

const pageTitle = "Dashboard";

const Template = () => {
  const { data: session } = useSession();
  const { isLoading, data } = useQuery("user", () =>
    getUserId(session.user.email)
  );
  const router = useRouter();

  const id = data?._id;
  const name = data?.name || session.user.name;
  const email = data?.email || session.user.email;
  const avatar = data?.avatar || session.user.image;
  const dispatch = useDispatch();
  dispatch(update({ id, name, email, avatar }));

  //const isLoading = true;
  if (isLoading)
    return <LoadingSpinner message={"Aplikace se inicializuje ..."} />;

  //If there is just a user with session but not in local DB, redirect to profile page
  data?.email !== session.user.email && router.push("/profile");

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

  return {
    props: { session },
  };
}
