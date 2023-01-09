import Head from "next/head";
import { getSession, useSession } from "next-auth/react";
import AppLayoutV2 from "../layout/AppLayoutV2";

import PageTemplate from "../components/v2/PageTemplate";
import Link from "next/link";

const pageTitle = "Modul for testing";

const Template = ({ children }) => {
  const { data: session } = useSession();

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
