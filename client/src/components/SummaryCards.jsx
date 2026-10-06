function SummaryCards({
  highPriorityCount,
  reviewCount,
  skippedCount,
  totalLeads,
}) {
  const cards = [
    {
      label: "High Priority",
      value: highPriorityCount,
      description: "Strong acquisition fit",
      valueStyle: "text-emerald-600",
      dotStyle: "bg-emerald-500",
    },
    {
      label: "Review",
      value: reviewCount,
      description: "Needs further evaluation",
      valueStyle: "text-amber-600",
      dotStyle: "bg-amber-500",
    },
    {
      label: "Skipped",
      value: skippedCount,
      description: "Outside target criteria",
      valueStyle: "text-red-600",
      dotStyle: "bg-red-500",
    },
    {
      label: "Total Leads",
      value: totalLeads,
      description: "Companies evaluated",
      valueStyle: "text-slate-900",
      dotStyle: "bg-slate-400",
    },
  ];

  return (
    <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => (
        <div
          key={card.label}
          className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
        >
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-slate-500">
              {card.label}
            </p>

            <span
              className={`h-2.5 w-2.5 rounded-full ${card.dotStyle}`}
            />
          </div>

          <p
            className={`mt-3 text-3xl font-bold ${card.valueStyle}`}
          >
            {card.value}
          </p>

          <p className="mt-1 text-xs text-slate-400">
            {card.description}
          </p>
        </div>
      ))}
    </div>
  );
}

export default SummaryCards;