function ResultsFilters({
  searchTerm,
  setSearchTerm,
  industryFilter,
  setIndustryFilter,
  recommendationFilter,
  setRecommendationFilter,
  minScore,
  setMinScore,
  industries,
  handleClearFilters,
}) {
  return (
    <div className="mb-6 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="mb-3 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-sm font-semibold text-slate-900">
            Filter Results
          </h3>
          <p className="text-xs text-slate-500">
            Narrow down companies based on your screening criteria.
          </p>
        </div>

        <button
          type="button"
          onClick={handleClearFilters}
          className="self-start text-sm font-medium text-slate-500 transition hover:text-slate-900 sm:self-auto"
        >
          Clear filters
        </button>
      </div>

      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
        {/* Search */}
        <input
          type="text"
          placeholder="Search company..."
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          className="rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm outline-none transition placeholder:text-slate-400 hover:border-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        />

        {/* Industry */}
        <select
          value={industryFilter}
          onChange={(event) => setIndustryFilter(event.target.value)}
          className="rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm outline-none transition hover:border-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        >
          <option value="All">All Industries</option>

          {industries.map((industry) => (
            <option key={industry} value={industry}>
              {industry}
            </option>
          ))}
        </select>

        {/* Recommendation */}
        <select
          value={recommendationFilter}
          onChange={(event) =>
            setRecommendationFilter(event.target.value)
          }
          className="rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm outline-none transition hover:border-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        >
          <option value="All">All Recommendations</option>
          <option value="High Priority">High Priority</option>
          <option value="Review">Review</option>
          <option value="Skip">Skip</option>
        </select>

        {/* Minimum Score */}
        <select
          value={minScore}
          onChange={(event) => setMinScore(event.target.value)}
          className="rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm outline-none transition hover:border-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        >
          <option value="0">All Scores</option>
          <option value="80">80+ Score</option>
          <option value="70">70+ Score</option>
          <option value="60">60+ Score</option>
          <option value="50">50+ Score</option>
        </select>
      </div>
    </div>
  );
}

export default ResultsFilters;