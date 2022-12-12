import Head from "next/head";
import { getSession, useSession, signOut } from "next-auth/react";
import AppLayout from "../layout/AppLayout";
import Projects from "./components/Projects";
import { useRouter } from "next/router";
import { useState } from "react";

const Home = () => {
  const { data: session } = useSession();
  // console.log(session);
  const router = useRouter();

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

// Authorize User
function User() {
  //console.log(session);
  return (
    <AppLayout>
      <Projects />
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
