import React from "react";

const Start = () => {
  return (
    <section className="relative min-h-[80vh] flex flex-col items-center justify-center text-center bg-[#2F3C50] text-white px-6 min-h-[70vh] w-screen">
      {/* Background stars */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-full h-full bg-[radial-gradient(white_1px,transparent_1px)] bg-[size:50px_50px] opacity-20"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-5xl font-bold mb-4 orbi">
          Ready to Get Started?
        </h1>
        <p className="text-lg md:text-xl text-gray-300 mb-10 raj">
          Join thousands of users who trust <span className="text-blue-400 font-semibold">  StellarServe Indexing Tool</span> for fast URL indexing and instant Google indexing results
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition">
            🚀 CREATE ACCOUNT
          </button>
          <button className="flex items-center gap-2 bg-[#1a2639] hover:bg-[#253650] text-white font-semibold px-6 py-3 rounded-lg shadow-md transition">
            🤖 TRY BOT
          </button>
        </div>
      </div>
    </section>
  );
};

export default Start;
