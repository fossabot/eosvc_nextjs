import Header from "../components/v2/Header";
import Sidebar from "../components/v2/Sidebar";
import Footer from "../components/v2/Footer";
import Breadcrumb from "../utils/breadcrumb";
import { useSession } from "next-auth/react";
import { useQuery } from "react-query";
import { getUserId } from "../modules/user/apiCalls/getUserId";
import { useDispatch } from "react-redux";
import { update } from "../redux/userSlice";
import LoadingSpinner from "../components/loadings/LoadingSpinner";
import { useRouter } from "next/router";

function AppLayoutV2({ children }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const { data: session } = useSession();
  /*
  const session = {
    user: {
      email: "test@test.com",
    },
  };
*/
  const { isLoading, data } = useQuery(
    "user",
    () => getUserId(session.user.email),
    {
      onSuccess: (data) => {
        if (data === null) {
          router.push("/profile");
        } else {
          dispatch(update(data));
        }
      },
    }
  );

  isLoading && <LoadingSpinner message={"Nahrávam data uživatele"} />;
  //If there is just a user with session but not in local DB, redirect to profile page
  //  data?.email !== session.user.email && router.push("/profile");

  return (
    <div className="flex flex-row mx-auto w-full h-screen">
      <div>
        <Sidebar />
      </div>
      <div className="flex flex-col mx-auto w-full h-full ">
        <div className="h-20">
          <Header />
        </div>
        <div className="text-gray-400 px-5 py-2">
          <Breadcrumb />
        </div>
        <div className="px-5 pb-5 h-full overflow-scroll"> {children}</div>
        <div>
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default AppLayoutV2;
