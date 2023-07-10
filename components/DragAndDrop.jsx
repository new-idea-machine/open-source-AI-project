"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { BsChatLeftDots } from "react-icons/bs";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function DragAndDrop({ handleUpload }) {
  const { data: session } = useSession();
  const [sidebarData, setSidebarData] = useState([]);
  const [message, setMessage] = useState();
  const [isClicked, setIsClicked] = useState(false);

  const fetchUserFiles = async () => {
    if (!session?.user) {
      return;
    }
    const response = await fetch(`/api/documents`);
    const data = await response.json();
    console.log(data);
    setSidebarData(data);
  };
  useEffect(() => {
    fetchUserFiles();
  }, [session]);

  const handleClick = (index) => {
    setIsClicked(index);
  };

  const handleFile = async (e) => {
    setMessage("");
    let file = e.target.files[0];

    // Call handleUpload and get the new filename
    await handleUpload(file);
    fetchUserFiles();
    e.target.value = null;
  };

  return (
    <>
      <div className="flex justify-center items-center">
        <div className="w-full p-2 m-2 backdrop:rounded-md">
          <span className="flex justify-center items-center bg-white text-[12px] text-red-500">
            {message}
          </span>
          <div className="h-20 w-full overflow-hidden relative shadow-md border-2 items-center rounded-md cursor-pointer border-gray-400 border-dotted font-medium">
            <form>
              <input
                type="file"
                onChange={(e) => handleFile(e)}
                className="h-full w-full opacity-0 z-10 absolute cursor-pointer"
                name="file"
              />
            </form>

            <div className="h-full w-full bg-gray-100 absolute z-1 flex justify-center items-center top-0">
              <div className="flex flex-col items-center">
                <i className="mdi mdi-folder-open text-[30px] text-gray-400 text-center"></i>
                <Image
                  src={"/assets/images/document-upload.png"}
                  width={30}
                  height={30}
                  alt=""
                />
                <span className="text-[12px] mt-1">{`Drag and Drop a document`}</span>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {sidebarData.map((data) => {
              return (
                <div
                  key={data._id}
                  className={`w-full h-10 flex items-center justify-between rounded p-3 cursor-pointer ${
                    isClicked === data._id
                      ? "bg-gray-200 bg-opacity-100"
                      : "hover:bg-gray-100 hover:bg-opacity-50 bg-none"
                  }`}
                  onClick={() => handleClick(data._id)}>
                  <div className="flex flex-row items-center gap-2 w-[100%]">
                    <div>
                      <BsChatLeftDots />
                    </div>
                    <span className="truncate text-sm" title={data.filename}>
                      <Link href={`/${data._id}`}>{data.filename}</Link>
                    </span>
                    <button className="pt-0.5 ml-auto" title="Delete File">
                      <svg
                        className="cursor-pointer hover:text-blue-500 transform hover:scale-110 transition duration-300"
                        stroke="currentColor"
                        fill="currentColor"
                        height="1em"
                        width="1em"
                        viewBox="0 0 1024 1024"
                        xmlns="http://www.w3.org/2000/svg">
                        <path d="M360 184h-8c4.4 0 8-3.6 8-8v8h304v-8c0 4.4 3.6 8 8 8h-8v72h72v-80c0-35.3-28.7-64-64-64H352c-35.3 0-64 28.7-64 64v80h72v-72zm504 72H160c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h60.4l24.7 523c1.6 34.1 29.8 61 63.9 61h454c34.2 0 62.3-26.8 63.9-61l24.7-523H888c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32zM731.3 840H292.7l-24.2-512h487l-24.2 512z" />
                      </svg>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
