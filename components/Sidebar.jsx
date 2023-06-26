"use client";

import { useEffect, useState } from "react";
import DragAndDrop from "./DragAndDrop";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import { CiUser } from "react-icons/ci";

const Sidebarmenu = ({ handleUpload }) => {
  const { data: session } = useSession();
  const [providers, setProviders] = useState(null);

  useEffect(() => {
    const setAllProviders = async () => {
      const response = await getProviders();
      setProviders(response);
    };
    setAllProviders();
  }, []);

  return (
    <div className="bg-gradient-to-r from-teal-300 to-transparent w-[18%] h-screen flex flex-col justify-between overflow-auto top-0 transition duration-350 z-10">
      <div className="w-[100%]">
        <div>
          <DragAndDrop handleUpload={handleUpload} />
        </div>
      </div>
      {session?.user ? (
        <div className="flex flex-col">
          <div className="flex flex-row items-center gap-2 justify-center pr-4">
            <CiUser />
            <p>{session.user.name}</p>
          </div>
          <button
            type="button"
            onClick={signOut}
            className="border-solid border-2 border-gray-200 rounded p-2 pr-4 m-4">
            Sign Out
          </button>
        </div>
      ) : (
        <>
          {providers &&
            Object.values(providers).map((provider) => (
              <button
                type="button"
                key={provider.name}
                onClick={() => signIn(provider.id)}
                className="border-solid border-2 border-gray-200 rounded p-2 m-4">
                Sign In
              </button>
            ))}
        </>
      )}
    </div>
  );
};

export default Sidebarmenu;
