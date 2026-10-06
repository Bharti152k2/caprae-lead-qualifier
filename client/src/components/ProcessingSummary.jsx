function ProcessingSummary({ summary }) {
  if (!summary) {
    return null;
  }

  return (
    <div className="mb-6 rounded-xl border border-slate-200 bg-slate-50 px-5 py-4">
      <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
        <div>
          <span className="font-semibold text-slate-900">
            {summary.totalCompanies}
          </span>{" "}
          <span className="text-slate-500">
            records processed
          </span>
        </div>

        <div>
          <span className="font-semibold text-slate-900">
            {summary.invalidCompanies}
          </span>{" "}
          <span className="text-slate-500">
            invalid removed
          </span>
        </div>

        <div>
          <span className="font-semibold text-slate-900">
            {summary.duplicateCompanies}
          </span>{" "}
          <span className="text-slate-500">
            duplicates removed
          </span>
        </div>

        <div>
          <span className="font-semibold text-slate-900">
            {summary.qualifiedCompanies}
          </span>{" "}
          <span className="text-slate-500">
            evaluated
          </span>
        </div>
      </div>
    </div>
  );
}

export default ProcessingSummary;