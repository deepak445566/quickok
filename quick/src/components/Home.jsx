import React, { useState } from "react";


const Home = () => {
 
 const stats = [
    { value: "10K+", label: "URLs Indexed" },
    { value: "500+", label: "Happy Users" },
    { value: "99.9%", label: "Uptime" },
  ];
  return (
    <div className="bg-gradient-to-r from-[#0b1120] to-[#111827] text-white min-h-[70vh] w-screen">
      {/* Navbar */}
    

     

      {/* Hero Section */}
      <section className="w-full  relative flex flex-col items-center justify-center text-sm px-4 md:px-16 lg:px-24 xl:px-32 pt-40">
        <div className="absolute top-28 -z-10 left-1/4 size-72 bg-purple-600 blur-[300px]"></div>

       

        {/* Heading */}
        <h1 className="text-3xl font-semibold orbi md:text-6xl leading-[40px]  md:leading-[84px]  max-w-5xl text-center ">
     StellarServe Indexing Tool- Fast URL Indexing Service
        </h1>

        <p className="text-base text-center text-slate-200 max-w-lg mt-4 orbi">
       Get your URLs indexed quickly and efficiently.
        </p>
        
        <p className=" text-md lg:text-xl text-center text-slate-200 max-w-3xl mt-4 raj ">
  Submit your URLs for instant indexing with Quick Indexing. Get your content discovered faster with our automated quick indexing system for better SEO performance.
        </p>

        {/* Buttons */}
        <div className="flex items-center gap-4 mt-8">
         <button className="flex items-center gap-2 bg-[#2563eb] text-white px-5 lg:px-8 py-4 rounded-2xl font-semibold text-md lg:text-lg tracking-wide shadow-lg hover:shadow-blue-500/40 transition-all duration-300 hover:scale-105">
  🚀 GET STARTED
</button>

         <button
      className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[#111827] text-white font-semibold border border-transparent hover:border-[#6366F1] hover:shadow-[0_0_10px_#6366F1] transition-all duration-300"
    >
      <span className="text-2xl">📖</span>
      <span className="text-lg">LEARN MORE</span>
    </button>

        </div>
<div className="max-w-5xl mx-auto flex flex-col flex-row justify-center items-center gap-12 text-center text-white mt-20">
        {stats.map((stat, i) => (
          <div key={i}>
            <h3 className="text-4xl font-bold  text-[#3B82F6] drop-shadow-[0_0_10px_#3B82F6]">
              {stat.value}
            </h3>
            <p className="text-sm tracking-widest uppercase raj text-gray-300 mt-2">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
      
      </section>
    </div>
  );
};

export default Home;
