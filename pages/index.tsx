import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";

const Home: NextPage = () => {
  return (
    <div className="border border-black">
      <div className="border border-black">Top menu</div>
      <div className="flex flex-row border">
        <div className="border border-black">Left menu</div>
        <div className="border border-black w-full">content</div>
      </div>
    </div>
  );
};

export default Home;
