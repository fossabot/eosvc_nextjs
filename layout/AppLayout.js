import Header from "../pages/components/Header";
import Navbar from "../pages/components/Navbar";
import Footer from "../pages/components/Footer";

function AppLayout({ children }) {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-grow">
        <div className="flex">
          <Navbar />
        </div>
        <div className="flex items-center justify-center w-full pt-5">
          {children}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default AppLayout;
