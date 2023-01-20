import Header from "../components/v2/Header";
import Sidebar from "../components/v2/Sidebar";
import Footer from "../components/v2/Footer";
import Breadcrumb from "../utils/breadcrumb";

function AppLayoutV2({ children }) {
  return (
    <div className="absolute flex flex-row w-full overflow-hidden">
      <div className="">
        <Sidebar />
      </div>
      <div className="h-screen  flex flex-col overflow-auto w-full ">
        <div className="h-20 sticky top-0 ">
          <Header />
        </div>
        <div className="text-gray-400 px-5 py-2">
          <Breadcrumb />
        </div>
        <div className="flex grow first-letter px-5 pb-2 overflow-y-auto">
          {children}
        </div>
        <div className="bottom-0">
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default AppLayoutV2;
