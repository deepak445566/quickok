export default function Process() {
  const steps = [
    { number: 1, title: "Create Account", desc: "Sign up for free and start with URL indexing" },
    { number: 2, title: "Submit URLs", desc: "Add your URLs in Submit url" },
    { number: 3, title: "Get Indexed", desc: "Track your submissions and watch them get indexed by search engines" },
  ];

  return (
    <section className="w-full bg-[#060b23] text-white py-24 px-4 md:px-16 min-h-[70vh] w-screen">
      <div className="text-center max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-bold mb-4 orbi">
          How   StellarServe Indexing Tool Works for Fast Google Indexing
        </h2>
        <p className="text-gray-300 max-w-xl mx-auto mb-16">
          Get your URLs indexed quickly in just 3 simple steps with Quick Indexing
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-12 text-center max-w-6xl mx-auto">
        {steps.map((step) => (
          <div key={step.number} className="flex flex-col items-center gap-4">
            <div className="w-20 h-20 flex items-center justify-center rounded-full bg-[#0d1338] shadow-lg text-2xl font-bold">
              {step.number}
            </div>
            <h3 className="text-xl font-semibold orbi">{step.title}</h3>
            <p className="text-gray-400 text-md max-w-sm raj">{step.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}