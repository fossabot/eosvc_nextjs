import { useSession } from "next-auth/react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import LoadingSpinner from "../components/loadings/LoadingSpinner";
import { getSessionAsync } from "../redux/sessionSlice";

export const defaultLoader = (props) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  //const { data: session } = useSession();
  console.log(props.userSession.session, "props.userSession");
  const sessionRedux = useSelector((state) => state.session);
  console.log(sessionRedux, "sessionRedux");
  if (sessionRedux._id === "0") {
    console.log("hehe");
    (async () => {
      await dispatch(getSessionAsync(props.userSession.session.email)).then(
        () => {
          setIsLoading(false);
        }
      );
    })();
  }

  if (isLoading) return <LoadingSpinner message="Načítám data..." />;
};
