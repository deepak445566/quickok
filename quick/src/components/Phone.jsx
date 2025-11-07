import React from "react";

export default function Phone() {
  return (
    <section className="w-full bg-[#010516] text-white py-20 px-6 md:px-20 font-[Poppins] min-h-[70vh] w-screen">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        {/* Left Content */}
        <div>
          <h2 className="text-4xl md:text-4xl font-bold mb-6 flex items-center gap-3 orbi">
            🤖 Submit URLs via <br /> Telegram Bot
          </h2>
          <p className="text-lg text-gray-300 mb-6 raj">
            Use our Telegram bot <span className="text-blue-400 font-semibold">@  StellarServe Indexing ToolBot</span> for instant URL submissions directly from your mobile device. No need to open the website - just send your URLs to the bot!
          </p>

          <ul className="space-y-4 text-lg text-gray-300 orbi">
            <li className="flex items-center gap-2">⚡ Instant submissions</li>
            <li className="flex items-center gap-2">📱 Mobile-friendly</li>
            <li className="flex items-center gap-2">🔔 Real-time notifications</li>
          </ul>

          <button className="mt-10 bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold px-8 py-3 rounded-xl flex items-center gap-2 orbi">
            📱 START BOT
          </button>
        </div>

        {/* Phone UI */}
        <div className="flex justify-center">
          <div className="bg-[#111216] p-4 rounded-3xl border border-gray-800 shadow-2xl w-[280px] sm:w-[300px] md:w-[360px]">
            <div className="bg-black rounded-2xl p-4 space-y-4 h-[500px] flex flex-col justify-start">
              {/* Chat bubbles */}
              <div className="bg-blue-600 text-white py-3 px-4 rounded-xl w-fit max-w-[95%] text-sm">
                <strong>@  StellarServe Indexing ToolBot</strong> <br /> Welcome! Send me your URLs to index them quickly.
              </div>

              <div className="bg-[#2b2b2b] text-white py-3 px-4 rounded-xl w-fit max-w-[85%] ml-auto text-sm">
                https://example.com/my-page
              </div>

              <div className="bg-blue-600 text-white py-3 px-4 rounded-xl w-fit max-w-[85%] text-sm">
                ✅ URL submitted for indexing! Status: Processing
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}