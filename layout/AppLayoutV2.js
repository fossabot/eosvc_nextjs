import Header from "../components/v2/Header";
import Sidebar from "../components/v2/Sidebar";
import Footer from "../components/v2/Footer";
import Breadcrumb from "../utils/breadcrumb";
//import dotenv from "dotenv";

function AppLayoutV2({ children }) {
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
