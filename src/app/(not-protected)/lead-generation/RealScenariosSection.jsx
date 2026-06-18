import { Clock, FileText, ArrowDown, Cloud } from "lucide-react";

const scenarios = [
{
time: "10:47 PM – AFTER-HOURS INQUIRY",
timeColor: "text-blue-600",
icon: Clock,
iconBg: "bg-blue-500",
cardBg: "bg-indigo-50",
quote: '"Are you available this week? I need help ASAP."',
description: "The AI answers questions instantly, collects contact details, and offers available booking times.",
result: "Qualified lead captured",
resultColor: "text-blue-600",
},
{
time: "1:20 PM – SERVICE QUESTION",
timeColor: "text-purple-600",
icon: FileText,
iconBg: "bg-purple-500",
cardBg: "bg-white",
quote: '"How much does your service cost?"',
description: "The AI explains pricing, answers common questions, and guides the visitor toward booking.",
result: "Appointment scheduled",
resultColor: "text-blue-600",
},
{
time: "8:05 AM – NEW CUSTOMER",
timeColor: "text-green-600",
icon: ArrowDown,
iconBg: "bg-green-500",
cardBg: "bg-green-50",
quote: '"Can you help with my specific situation?"',
description: "The AI uses your website content to provide accurate answers and recommend the next step.",
result: "Consultation booked",
resultColor: "text-green-600",
},
{
time: "4:35 PM – HIGH-VALUE LEAD",
timeColor: "text-orange-500",
icon: Cloud,
iconBg: "bg-orange-500",
cardBg: "bg-orange-50",
quote: "We're comparing providers and need a solution soon.",
description: "The AI qualifies the opportunity, gathers requirements, and books a meeting with your team.",
result: "Sales call booked",
resultColor: "text-green-600",
},
];


export default function RealScenariosSection() {
  return (
    <section className="w-full py-24 px-8">
      <div className="max-w-3xl mx-auto text-center mb-16">
        <h2 className="text-6xl font-bold text-gray-900 tracking-tight leading-tight mb-5">
          See it in real scenarios
        </h2>
        <p className="text-gray-500 text-lg tracking-tight">
          Real scenarios showing how SiteGPT turns website visitors into booked appointments—24/7
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {scenarios.map((s) => {
          const Icon = s.icon;
          return (
            <div
              key={s.time}
              className={`${s.cardBg} rounded-2xl px-7 py-6 flex flex-col gap-4 border border-gray-100`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-lg ${s.iconBg} flex items-center justify-center flex-shrink-0`}>
                  <Icon className="text-white" size={22} />
                </div>
                <span className={`text-xs font-semibold uppercase tracking-widest ${s.timeColor}`}>
                  {s.time}
                </span>
              </div>
              <p className="text-gray-900 font-bold text-xl leading-snug tracking-tight">
                {s.quote}
              </p>
              <p className="text-gray-500 text-sm leading-relaxed tracking-tight">
                {s.description}
              </p>
              <p className={`text-sm font-semibold text-green-700 flex items-center gap-2`}>
                <span>✓</span> {s.result}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
