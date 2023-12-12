import React from "react";

const Skeleton = () => {
  return (
    <div className="bg-gray-200 rounded-xl p-2 md:p-8 lg:p-8 h-auto  w-[90%] md:w-[95%] lg:w-[90%] shadow-md text-center mx-auto mb-12 mt-12 animate-pulse">
      <div className="w-full h-44 bg-gray-300 rounded mb-4"></div>
      <div className="w-3/4 h-6 bg-gray-300 rounded mb-2"></div>
      <div className="w-1/2 h-6 bg-gray-300 rounded"></div>
    </div>
  );
};

export default Skeleton;
