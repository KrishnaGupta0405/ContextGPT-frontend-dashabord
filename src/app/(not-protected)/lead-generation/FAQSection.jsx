const faqs = [
  {
    question: "How quickly will I start getting more leads?",
    answer:
      "Immediately. Once you add ContextGPT to your site (5-minute setup), it starts responding to visitors instantly. Most businesses see their first lead within 24 hours.",
  },
  {
    question: "Are my leads and customer data secure?",
    answer:
      "Absolutely. We've completed a SOC 2 Type II examination and are both GDPR certified and HIPAA compliant. Your leads stay in your account only, all data is encrypted in transit and at rest, and we never use your customer conversations to train our AI.",
  },
  {
    question: "Will it capture leads outside business hours?",
    answer:
      "Yes, 24/7/365. Weekend browsers, late-night emergencies, holiday shoppers - ContextGPT captures and qualifies leads around the clock, even while you sleep.",
  },
];

export default function FAQSection() {
  return (
    <section className="w-full py-24 px-8">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-5xl font-bold text-gray-900 tracking-tight text-center mb-10">
          Frequently asked questions
        </h2>

        <div className="bg-indigo-50 rounded-2xl px-8 py-6 mb-10 border-l-4 border-blue-500">
          <p className="text-gray-600 text-lg italic leading-relaxed tracking-tight">
            &ldquo;I built ContextGPT after watching businesses lose deals to slow replies. Speed wins.&rdquo;
          </p>
          <p className="text-gray-500 text-base mt-3 tracking-tight">— Bhanu Teja, Founder</p>
        </div>

        <div className="flex flex-col divide-y divide-gray-200">
          {faqs.map((faq) => (
            <div key={faq.question} className="py-8 flex flex-col gap-3">
              <h3 className="text-xl font-bold text-gray-900 tracking-tight">{faq.question}</h3>
              <p className="text-gray-500 text-base leading-relaxed tracking-tight">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
