function CompanyCard({
  company,
  getRecommendationStyle,
  handleViewDetails,
  detailsLoading,
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      {/* Header */}
      <div className="flex flex-col justify-between gap-5 p-6 sm:flex-row sm:items-start">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-xl font-semibold tracking-tight text-slate-900">
              {company.name}
            </h3>

            <span
              className={`rounded-full px-2.5 py-1 text-xs font-semibold ${getRecommendationStyle(
                company.recommendation
              )}`}
            >
              {company.recommendation}
            </span>
          </div>

          <p className="mt-2 text-sm text-slate-500">
            {company.industry}{" "}
            <span className="text-slate-300">•</span>{" "}
            {company.location}
          </p>
        </div>

        {/* Score */}
        <div className="sm:text-right">
          <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
            Qualification Score
          </p>

          <div className="mt-1 text-3xl font-bold text-slate-900">
            {company.score}
            <span className="text-base font-normal text-slate-400">
              /100
            </span>
          </div>
        </div>
      </div>

      {/* Company Metrics */}
      <div className="grid grid-cols-2 border-y border-slate-100 bg-slate-50/50 md:grid-cols-4">
        <div className="border-b border-slate-100 px-6 py-4 md:border-b-0 md:border-r">
          <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
            Revenue
          </p>
          <p className="mt-1 text-sm font-semibold text-slate-900">
            ${company.revenue}M
          </p>
        </div>

        <div className="border-b border-slate-100 px-6 py-4 md:border-b-0 md:border-r">
          <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
            Employees
          </p>
          <p className="mt-1 text-sm font-semibold text-slate-900">
            {company.employees}
          </p>
        </div>

        <div className="border-slate-100 px-6 py-4 md:border-r">
          <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
            Company Age
          </p>
          <p className="mt-1 text-sm font-semibold text-slate-900">
            {company.age} years
          </p>
        </div>

        <div className="border-slate-100 px-6 py-4">
          <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
            Website
          </p>
          <p
            className={`mt-1 text-sm font-semibold ${
              company.website
                ? "text-emerald-600"
                : "text-red-600"
            }`}
          >
            {company.website ? "Available" : "Missing"}
          </p>
        </div>
      </div>

      {/* Criteria */}
      <div className="grid gap-6 p-6 md:grid-cols-2">
        <div>
          <h4 className="text-sm font-semibold text-slate-900">
            Matching criteria
          </h4>

          {company.reasons.length > 0 ? (
            <ul className="mt-3 space-y-2">
              {company.reasons.map((reason, index) => (
                <li
                  key={index}
                  className="flex items-start gap-2 text-sm text-emerald-700"
                >
                  <span className="mt-0.5 font-semibold">✓</span>
                  <span>{reason}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-3 text-sm text-slate-400">
              No matching criteria.
            </p>
          )}
        </div>

        <div>
          <h4 className="text-sm font-semibold text-slate-900">
            Criteria not met
          </h4>

          {company.failedCriteria.length > 0 ? (
            <ul className="mt-3 space-y-2">
              {company.failedCriteria.map((reason, index) => (
                <li
                  key={index}
                  className="flex items-start gap-2 text-sm text-red-600"
                >
                  <span className="mt-0.5 font-semibold">✕</span>
                  <span>{reason}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-3 text-sm text-slate-400">
              All criteria are satisfied.
            </p>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between border-t border-slate-100 px-6 py-4">
        <p className="text-xs text-slate-400">
          Review detailed scoring and company information
        </p>

        <button
          type="button"
          onClick={() => handleViewDetails(company)}
          disabled={detailsLoading}
          className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-300 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {detailsLoading ? "Loading..." : "View Details"}
        </button>
      </div>
    </div>
  );
}

export default CompanyCard;