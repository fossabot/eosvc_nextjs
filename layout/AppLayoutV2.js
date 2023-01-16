import Header from "../components/v2/Header";
import Sidebar from "../components/v2/Sidebar";
import Footer from "../components/v2/Footer";
import Breadcrumb from "../utils/breadcrumb";

function AppLayoutV2({ children }) {
  return (
    <div className="flex flex-row mx-auto w-full h-screen justify-between">
      <div>
        <Sidebar />
      </div>
      <div className="flex flex-col mx-auto w-full h-full overflow-hidden  ">
        <div className="h-20 sticky top-0 ">
          <Header />
        </div>
        <div className="text-gray-400 px-5 py-2">
          <Breadcrumb />
        </div>
        <div className="px-5 pb-5 h-full overflow-y-auto"> {children}</div>
        <div className="sticky">
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default AppLayoutV2;
