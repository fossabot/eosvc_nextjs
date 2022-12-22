import Head from "next/head";
import { getSession, useSession } from "next-auth/react";
import AppLayoutV2 from "../layout/AppLayoutV2";

import PageTemplate from "../components/v2/PageTemplate";
import Link from "next/link";

const pageTitle = "CRM";

const Template = ({ children }) => {
  const { data: session } = useSession();
  console.log(session);
  return (
    <div className="w-full">
      <Head>
        <title>{pageTitle}</title>
      </Head>
      {session ? (
        <AppLayoutV2>
          <PageTemplate pageTitle={pageTitle}>{children}</PageTemplate>
        </AppLayoutV2>
      ) : (
        <div>
          Please log in to view this page<Link href="/">Login</Link>
        </div>
      )}
    </div>
  );
};

export default Template;

export async function getServerSideProps({ res }) {
  const session = await getSession({ req });

  if (!session) {
    if (res) {
      res.writeHead(302, {
        Location: "/login",
      });
      res.end();
    }

    return {
      props: {},
    };
  }

  return {
    props: { session },
  };
}
