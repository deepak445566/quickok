import React from "react";

const Payment = () => {
  return (
    <div className="bg-[#0b0f1c] text-white py-16 px-6 flex flex-col items-center text-center min-h-[70vh] w-screen">
      {/* Title */}
      <h2 className="text-3xl md:text-4xl font-extrabold mb-4 flex items-center gap-2 orbi">
        <span role="img" aria-label="card">💳</span> Need Payment Help?
      </h2>

      {/* Subtitle */}
      <p className="text-gray-300 max-w-2xl mb-8 text-sm md:text-base">
        Having trouble with payments or need alternative payment options? Our support
        team is here to help you with:
      </p>

      {/* Help list */}
      <ul className="space-y-3 text-gray-300 text-sm md:text-base mb-10 raj">
        <li className="flex items-center justify-center gap-2 raj">
          <span role="img" aria-label="email">📧</span>
          <a
            href="mailto:support@quickindexing.com"
            className="text-blue-500 hover:underline"
          >
            support@  StellarServe Indexing Tool.com
          </a>
        </li>
        <li className="flex items-center justify-center gap-2">
          <span role="img" aria-label="wrench">🛠️</span> Payment troubleshooting
        </li>
        <li className="flex items-center justify-center gap-2">
          <span role="img" aria-label="money">💰</span> Alternative payment methods
        </li>
        <li className="flex items-center justify-center gap-2">
          <span role="img" aria-label="phone">📞</span> Direct support assistance
        </li>
      </ul>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg shadow-lg shadow-blue-500/20 flex items-center gap-2 raj">
          💬 CONTACT SUPPORT
        </button>
        <button className="bg-[#1b2233] hover:bg-[#232a3d] border border-blue-800 text-white font-semibold px-8 py-3 rounded-lg flex items-center gap-2 raj">
          📧 EMAIL SUPPORT
        </button>
      </div>
    </div>
  );
};

export default Payment;
