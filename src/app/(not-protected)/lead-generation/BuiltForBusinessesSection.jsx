const businesses = [
  {
    category: "LEGAL SERVICES",
    title: "Law Firms & Attorneys",
    description: "Instantly qualify potential clients and never lose a lead to slow response times",
  },
  {
    category: "HEALTHCARE",
    title: "Dental & Medical Clinics",
    description: "Answer insurance questions and book appointments automatically – even at 2 AM",
  },
  {
    category: "HOME SERVICES",
    title: "Contractors & Repair",
    description: "Convert emergency situations into booked jobs by responding instantly when competitors can't",
  },
  {
    category: "FINANCIAL SERVICES",
    title: "Insurance & Advisors",
    description: "Qualify prospects and schedule consultations while building trust",
  },
  {
    category: "REAL ESTATE",
    title: "Agents & Brokerages",
    description: "Provide instant property info and connect buyers with agents",
  },
  {
    category: "B2B SERVICES",
    title: "Consultants & Agencies",
    description: "Qualify prospects and book discovery calls automatically",
  },
];

export default function BuiltForBusinessesSection() {
  return (
    <section className="w-full py-24 px-8 bg-indigo-50">
      <div className="max-w-3xl mx-auto text-center mb-16">
        <h2 className="text-6xl font-bold text-gray-900 tracking-tight leading-tight mb-5">
          Built for businesses where every lead counts
        </h2>
        <p className="text-gray-500 text-lg tracking-tight">
          Service businesses that can&apos;t afford to miss opportunities – just like these industry leaders
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {businesses.map((b) => (
          <div key={b.title} className="bg-white rounded-2xl px-7 py-8 flex flex-col gap-2 border border-gray-100">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600">
              {b.category}
            </span>
            <h3 className="text-xl font-bold text-gray-900 tracking-tight">{b.title}</h3>
            <p className="text-gray-500 text-sm leading-relaxed tracking-tight">{b.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
