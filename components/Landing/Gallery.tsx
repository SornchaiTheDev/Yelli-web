import React from "react";

const Albums = () => {
  return (
    <div className="flex flex-col items-center gap-4 col-span-3 md:col-span-1 ">
      <div className="grid grid-cols-2 gap-2 justify-items-stretch place-items-start">
        {Array(3)
          .fill(0)
          .map((_, index) => (
            <div className="rounded-lg overflow-hidden w-full h-36 bg-gray-50">
              <img
                className="h-full object-cover object-center"
                src="https://images.unsplash.com/photo-1651821486767-316ebf5a9b1d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2071&q=80"
              />
            </div>
          ))}

        <div className="rounded-lg overflow-hidden w-full h-36 bg-gray-50 relative">
          <div className="bg-[rgba(0,0,0,.40)] top-0 left-0 w-full h-full absolute flex justify-center items-center">
            <h2 className="text-white font-semibold text-xl">+24</h2>
          </div>
          <img
            className="h-full object-cover object-center"
            src="https://images.unsplash.com/photo-1651821486767-316ebf5a9b1d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2071&q=80"
          />
        </div>
      </div>
      <h2>Home Party • 28 April</h2>
    </div>
  );
};

function Gallery() {
  return (
    <div className="p-4">
      <h2 className="my-10 font-bold text-2xl text-center">Recent Event</h2>
      <div className="grid grid-cols-3 gap-4 my-24">
        <Albums />
        <Albums />
        <Albums />
      </div>
    </div>
  );
}

export default Gallery;
