import React, { useState } from "react";


const Home = () => {

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
  Submit your URLs for instant indexing with StellarServe Indexing. Get your content discovered faster with our automated quick indexing system for better SEO performance.
        </p>

        
<div className="max-w-5xl mx-auto flex flex-col flex-row justify-center items-center gap-12 text-center text-white mt-20">
    
      </div>
      
      </section>
    </div>
  );
};

export default Home;
