import React, { useState } from "react";

const faqs = [
  {
    question: "What is   StellarServe Indexing Tool?",
    answer:
      "  StellarServe Indexing Tool is a fast and reliable URL indexing service that helps get your web pages discovered by search engines quickly.",
  },
  {
    question: "How much does it cost?",
    answer:
      "We use a credit-based system. Each URL submission costs 1 credit. You can purchase credits in packages starting from ₹350. Contact support for payment assistance.",
  },
  {
    question: "How long does indexing take?",
    answer:
      "Most URLs are processed within 24-48 hours. Search engine indexing depends on various factors but is typically faster than organic discovery.",
  },
   {
    question: "Can I use the Telegram bot?",
    answer:
      "Yes! Use @  StellarServe Indexing ToolBot to submit URLs directly from Telegram.",
  },
];

const Fqs = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-[#111a2c] text-white py-16 px-6 min-h-[70vh] w-screen">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-5xl font-extrabold mb-10 orbi">
           StellarServe Indexing Tool FAQ -{" "}
          <span className="text-blue-400">Fast URL Indexing Questions</span>
        </h2>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-[#090d18] rounded-lg overflow-hidden border border-transparent hover:border-blue-700 transition-all orbi"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex justify-between items-center text-left px-6 py-5 font-semibold text-lg focus:outline-none"
              >
                <span>{faq.question}</span>
                <span className="text-blue-400 text-xl font-bold">
                  {openIndex === index ? "−" : "+"}
                </span>
              </button>

              {openIndex === index && (
                <div className="px-6 pb-5 text-gray-300 text-sm md:text-base border-t border-gray-800">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Fqs;
