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
        <div className="w-full p-2 mr-4 rounded-md">
          <span className="flex justify-center items-center bg-white text-[12px] text-red-500">
            {message}
          </span>
          <div className="h-20 w-full overflow-hidden relative shadow-md border-2 items-center rounded-md cursor-pointer border-gray-400 border-dotted font-medium">
            <form>
              <input
                type="file"
                onChange={(e) => handleFile(e)}
                className="h-full w-full opacity-0 z-10 absolute"
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
                  onClick={() => handleClick(data._id)}
                >
                  <div className="flex flex-row items-center gap-2 w-[100%]">
                    <div>
                      <BsChatLeftDots />
                    </div>
                    <span className="truncate text-sm" title={data.filename}>
                      {data.filename}
                      <Link href={`/${data._id}`}>{data.filename}</Link>
                    </span>
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
