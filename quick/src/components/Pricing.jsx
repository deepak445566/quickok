import React from "react";

const plans = [
  {
    credits: 10,
    price: 350,
    oldPrice: 400,
    features: ["10 URL submissions", "Real-time tracking", "Telegram bot access"],
  },
  {
    credits: 20,
    price: 680,
    oldPrice: 780,
    features: ["20 URL submissions", "Real-time tracking", "Telegram bot access"],
  },
  {
    credits: 50,
    price: 1650,
    oldPrice: 1900,
    features: ["50 URL submissions", "Real-time tracking", "Telegram bot access"],
  },
  {
    credits: 100,
    price: 3200,
    oldPrice: 3680,
    features: ["100 URL submissions", "Real-time tracking", "Telegram bot access"],
  },
];

const Pricing = () => {
  return (
    <div className=" bg-[#0b1525] flex items-center justify-center px-4  flex-col min-h-[70vh] w-screen">
       <div className="text-center max-w-6xl mx-auto mt-10">
        <h2 className="text-3xl md:text-5xl font-bold mb-4 orbi text-white">
   StellarServe Indexing Tool Pricing Packages for Fast URL Indexing
        </h2>
        <p className="text-gray-300 max-w-2xl mx-auto mb-16 mt-10">
Pay only for what you use with Quick Indexing. No monthly subscriptions for instant indexing.
        </p>
      </div>
      <div className="grid md:grid-cols-4 gap-6 w-full max-w-6xl">
        {plans.map((plan, idx) => (
          <div
            key={idx}
            className="bg-[#0e1a2b] text-white rounded-xl p-6 md:p-8 flex flex-col items-center text-center border border-transparent hover:border-blue-600 transition-all duration-300"
          >
            <h2 className="text-2xl font-bold mb-2 orbi">{plan.credits} Credits</h2>
            <div className="relative mb-4">
              <p className="text-4xl font-extrabold text-blue-500 orbi">₹{plan.price}</p>
              <span className="absolute top-0 right-[-40px] bg-red-500 text-xs px-2 py-1 rounded-full">
                13% OFF
              </span>
              <p className="text-gray-400 line-through text-sm mt-1 raj">
                ₹{plan.oldPrice}
              </p>
            </div>

            <ul className="text-sm space-y-3 mb-6">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-center gap-2 justify-center">
                  <span className="text-green-400">✔️</span> {feature}
                </li>
              ))}
            </ul>

            <button className="mt-auto bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-md font-semibold text-white transition-all">
              PURCHASE CREDITS
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pricing;
