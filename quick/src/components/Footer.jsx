import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[#0e1a2b] text-gray-300 pt-16 pb-8 border-t border-gray-700 min-h-[70vh] w-screen">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 orbi">
        {/* Column 1 */}
        <div>
          <h2 className="text-blue-500 text-xl font-semibold mb-3">
            StellarServe Indexing Tool
          </h2>
          <p className="text-sm">Fast & Reliable URL Indexing Service</p>
        </div>

        {/* Column 2 */}
        <div>
          <h3 className="text-blue-500 text-lg font-semibold mb-3">Support</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-blue-400 transition">Help Guide</a></li>
            <li><a href="#" className="hover:text-blue-400 transition">FAQ</a></li>
            <li><a href="#" className="hover:text-blue-400 transition">Drip Guide</a></li>
            <li><a href="#" className="hover:text-blue-400 transition">Telegram Bot</a></li>
          </ul>
        </div>

        {/* Column 3 */}
        <div>
          <h3 className="text-blue-500 text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-blue-400 transition">Login</a></li>
          </ul>
        </div>

        {/* Column 4 */}
        <div>
          <h3 className="text-blue-500 text-lg font-semibold mb-3">Legal</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-blue-400 transition">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-blue-400 transition">Terms & Conditions</a></li>
            <li><a href="#" className="hover:text-blue-400 transition">Refunds Policy</a></li>
            <li><a href="#" className="hover:text-blue-400 transition">Contact Us</a></li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-10 border-t border-gray-700 pt-6 text-center text-sm text-gray-400">
        © 2025 Quick Indexing. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
