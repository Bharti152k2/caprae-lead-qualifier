function CompanyDetailsModal({
  selectedCompany,
  setSelectedCompany,
  getRecommendationStyle,
}) {
  if (!selectedCompany) {
    return null;
  }

  const breakdown = selectedCompany.scoreBreakdown;

  const scoreItems = [
    { label: "Industry", key: "industry" },
    { label: "Location", key: "location" },
    { label: "Revenue", key: "revenue" },
    { label: "Employees", key: "employees" },
    { label: "Company Age", key: "age" },
    { label: "Website", key: "website" },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm"
      onClick={() => setSelectedCompany(null)}
    >
      <div
        className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-slate-200 bg-white shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-start justify-between border-b border-slate-200 bg-white p-6">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">
                Acquisition Target
              </p>

              <span
                className={`rounded-full px-2.5 py-1 text-xs font-semibold ${getRecommendationStyle(
                  selectedCompany.recommendation
                )}`}
              >
                {selectedCompany.recommendation}
              </span>
            </div>

            <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900">
              {selectedCompany.name}
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              {selectedCompany.industry}{" "}
              <span className="text-slate-300">•</span>{" "}
              {selectedCompany.location}
            </p>
          </div>

          <button
            type="button"
            onClick={() => setSelectedCompany(null)}
            aria-label="Close details"
            className="rounded-lg p-2 text-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
          >
            ✕
          </button>
        </div>

        {/* Score Summary */}
        <div className="grid gap-4 p-6 sm:grid-cols-2">
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
              Qualification Score
            </p>

            <p className="mt-2 text-4xl font-bold text-slate-900">
              {selectedCompany.score}
              <span className="text-lg font-normal text-slate-400">
                /100
              </span>
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
              Recommendation
            </p>

            <span
              className={`mt-3 inline-flex rounded-full px-3 py-1.5 text-sm font-semibold ${getRecommendationStyle(
                selectedCompany.recommendation
              )}`}
            >
              {selectedCompany.recommendation}
            </span>
          </div>
        </div>

        {/* Score Breakdown */}
        <div className="px-6">
          <div className="rounded-xl border border-slate-200 p-5">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-semibold text-slate-900">
                  Score Breakdown
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  How the qualification score was calculated.
                </p>
              </div>

              <span className="text-lg font-bold text-slate-900">
                {selectedCompany.score}/100
              </span>
            </div>

            <div className="mt-5 space-y-4">
              {breakdown &&
                scoreItems.map((item) => {
                  const score = breakdown[item.key];

                  if (!score) {
                    return null;
                  }

                  const percentage =
                    score.possible === 0
                      ? 0
                      : (score.earned / score.possible) * 100;

                  return (
                    <div key={item.key}>
                      <div className="mb-1.5 flex items-center justify-between text-sm">
                        <span className="font-medium text-slate-700">
                          {item.label}
                        </span>

                        <span className="font-semibold text-slate-900">
                          {score.earned}/{score.possible}
                        </span>
                      </div>

                      <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                        <div
                          className="h-full rounded-full bg-blue-600 transition-all"
                          style={{
                            width: `${percentage}%`,
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>

        {/* Company Information */}
        <div className="px-6 pt-6">
          <h3 className="text-base font-semibold text-slate-900">
            Company Information
          </h3>

          <div className="mt-4 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-slate-200 bg-slate-200 sm:grid-cols-3">
            <div className="bg-white p-4">
              <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                Industry
              </p>
              <p className="mt-1 text-sm font-semibold text-slate-900">
                {selectedCompany.industry}
              </p>
            </div>

            <div className="bg-white p-4">
              <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                Location
              </p>
              <p className="mt-1 text-sm font-semibold text-slate-900">
                {selectedCompany.location}
              </p>
            </div>

            <div className="bg-white p-4">
              <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                Revenue
              </p>
              <p className="mt-1 text-sm font-semibold text-slate-900">
                ${selectedCompany.revenue}M
              </p>
            </div>

            <div className="bg-white p-4">
              <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                Employees
              </p>
              <p className="mt-1 text-sm font-semibold text-slate-900">
                {selectedCompany.employees}
              </p>
            </div>

            <div className="bg-white p-4">
              <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                Company Age
              </p>
              <p className="mt-1 text-sm font-semibold text-slate-900">
                {selectedCompany.age} years
              </p>
            </div>

            <div className="bg-white p-4">
              <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                Website
              </p>

              {selectedCompany.website ? (
                <a
                  href={selectedCompany.website}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-1 block text-sm font-semibold text-blue-600 hover:underline"
                >
                  Visit Website ↗
                </a>
              ) : (
                <p className="mt-1 text-sm font-semibold text-red-600">
                  Missing
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Criteria */}
        <div className="grid gap-6 p-6 sm:grid-cols-2">
          <div>
            <h3 className="text-base font-semibold text-slate-900">
              Matching Criteria
            </h3>

            {selectedCompany.reasons?.length > 0 ? (
              <ul className="mt-4 space-y-2">
                {selectedCompany.reasons.map((reason, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-2 rounded-lg bg-emerald-50 px-3 py-2.5 text-sm text-emerald-700"
                  >
                    <span className="font-semibold">✓</span>
                    <span>{reason}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-4 rounded-lg bg-slate-50 px-3 py-2.5 text-sm text-slate-500">
                No matching criteria.
              </p>
            )}
          </div>

          <div>
            <h3 className="text-base font-semibold text-slate-900">
              Criteria Not Met
            </h3>

            {selectedCompany.failedCriteria?.length > 0 ? (
              <ul className="mt-4 space-y-2">
                {selectedCompany.failedCriteria.map(
                  (reason, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-2 rounded-lg bg-red-50 px-3 py-2.5 text-sm text-red-700"
                    >
                      <span className="font-semibold">✕</span>
                      <span>{reason}</span>
                    </li>
                  )
                )}
              </ul>
            ) : (
              <p className="mt-4 rounded-lg bg-slate-50 px-3 py-2.5 text-sm text-slate-500">
                All criteria are satisfied.
              </p>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end border-t border-slate-200 bg-slate-50/50 p-6">
          <button
            type="button"
            onClick={() => setSelectedCompany(null)}
            className="rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default CompanyDetailsModal;