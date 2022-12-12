import Head from "next/head";
import { getSession, useSession, signOut } from "next-auth/react";
import AppLayout from "../layout/AppLayout";
import Main from "./components/Main";
import { useRouter } from "next/router";

const Home = () => {
  const { data: session } = useSession();
  // console.log(session);
  const router = useRouter();

  //Sign Out function
  /*
  function handleSignOut() {
    signOut();
  }
*/
  return (
    <div className="w-full">
      <Head>
        <title>Home Page</title>
      </Head>
      {session ? User({ session }) : router.push("/login")}
    </div>
  );
};

export default Home;

// Guest
/*
function Guest() {
  return (
    <main className="container mx-auto text-center py-20">
      <h3 className="text-4xl font-bold">Guest Homepage</h3>

      <div className="flex justify-center">
        <Link
          href={"/login"}
          className="mt-5 px-10 py-1 rounded-sm bg-indigo-500 text-gray-50"
        >
          Sign In
        </Link>
      </div>
    </main>
  );
}
*/
// Authorize User
function User() {
  //console.log(session);
  return (
    <AppLayout>
      <Main />
    </AppLayout>
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
