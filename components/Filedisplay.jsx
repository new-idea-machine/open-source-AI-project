"use client";

function Filedisplay() {
  return (
    <div className="flex w-[39%]">
      <div className="bg-[#ded8d8] w-1 h-screen"></div>
      <div className="pdf-viewer">
        <div className="pdf-viewer__toolbar">
          <h1 className="text-lg mr-auto text-ellipsis whitespace-nowrap pl-1.5">
            PDF Document
          </h1>
        </div>
        <div className="pdf-viewer__content">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor culpa
          vero possimus placeat error neque non architecto ducimus minus earum
          excepturi consequatur impedit ipsa provident repellendus cupiditate,
          delectus voluptatem adipisci.
        </div>
      </div>
      <div className="bg-[#ded8d8] w-1 h-screen"></div>
    </div>
  );
}

export default Filedisplay;
