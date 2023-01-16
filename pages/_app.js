import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { store } from "../redux/store";
import { Provider } from "react-redux";
import { Roboto } from "@next/font/google";

//import dotenv from "dotenv";

// If loading a variable font, you don't need to specify the font weight
const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
});

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <main className={roboto.className}>
            <Component {...pageProps} />
          </main>
        </Provider>
        {/*<ReactQueryDevtools initialIsOpen={false} />*/}
      </QueryClientProvider>
    </SessionProvider>
  );
}

export default MyApp;
