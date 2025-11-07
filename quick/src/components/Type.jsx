export default function Type() {
  const features = [
    {
      icon: "🚀",
      title: "Fast Indexing",
      description:
        "Get your URLs indexed by search engines quickly and efficiently.",
    },
    {
      icon: "📊",
      title: "Real-time Tracking",
      description:
        "Monitor your submission status with live updates and detailed analytics.",
    },
    {
      icon: "💳",
      title: "Credit System",
      description:
        "Flexible credit-based pricing – pay only for what you use.",
    },
     {
      icon: "🤖",
      title: "Telegram Bot",
      description:
        "Use our @QuickIndexingBot for instant submissions on the go",
    },
  ];

  return (
    <section className="bg-gradient-to-r from-[#0b1120] to-[#111827] py-20 px-6 text-white text-center min-h-[70vh] w-screen">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-extrabold mb-12 text-white orbi mt-10">
          Why Choose <span className="text-[#3B82F6]">  StellarServe Indexing Tool</span> for Fast URL Indexing?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <div
              key={i}
              className="bg-black rounded-2xl p-8 shadow-md border border-transparent 
                         hover:border-[#3B82F6]/50 
                         hover:shadow-[0_0_25px_#3B82F6,0_0_50px_#1E3A8A] 
                         transition-all duration-500"
            >
              <div className="text-5xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-3 text-white">
                {feature.title}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
