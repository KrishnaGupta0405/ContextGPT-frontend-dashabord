const ways = [
  {
    number: 1,
    title: "Be First to Every Lead",
    description:
      "Most businesses reply hours later. Your AI responds instantly, helping you engage prospects before competitors even see the inquiry.",
  },
  {
    number: 2,
    title: "Convert Visitors After Hours",
    description:
      "Capture leads evenings, weekends, and holidays. Every visitor gets immediate answers, even when your team is unavailable.",
  },
  {
    number: 3,
    title: "Filter Serious Buyers Automatically",
    description:
      "Collect key details like project needs, budget, and timeline upfront so you can focus on high-intent prospects.",
  },
  {
    number: 4,
    title: "Fill Your Calendar 24/7",
    description:
      "Let visitors book appointments directly in chat. New meetings appear on your calendar without any manual follow-up.",
  },
];


export default function FourWaysSection() {
  return (
    <section className="w-full py-24 px-8">
      <div className="max-w-2xl mx-auto text-center mb-16">
        <p className="text-6xl font-semibold tracking-tight text-gray-900 leading-tight mb-5">
          Four ways to beat competitors to every deal
        </p>
        <p className="text-gray-500 text-lg tracking-tight">
          While they&apos;re checking email, you&apos;re already closing
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-16">
        {ways.map((way) => (
          <div key={way.number} className="flex flex-col gap-4">
            <div className="w-20 h-20 rounded-xl bg-blue-500 flex items-center justify-center text-white text-3xl font-bold">
              {way.number}
            </div>
            <h3 className="text-2xl font-bold text-gray-900 tracking-tight">{way.title}</h3>
            <p className="text-gray-500 text-base leading-relaxed tracking-tight">
              {way.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
