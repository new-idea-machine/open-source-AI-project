import Sidebarmenu from "@/components/Sidebar";
import React from "react";

const Home = () => {
  return (
    <div className="flex h-screen w-full overflow-clip">
      <Sidebarmenu />
      <div
        className="w-full h-full bg-no-repeat bg-cover text-white flex flex-col items-center justify-center"
        style={{
          backgroundImage: "url(assets/images/home-background.jpg)",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        }}>
        <h1 className="text-[55px] font-semibold">
          <span className="text-indigo-800">Welcome</span> to our Chat PDF App
        </h1>
        <p className="text-[33px]">Powered by OpenAI</p>
      </div>
    </div>
  );
};

export default Home;
