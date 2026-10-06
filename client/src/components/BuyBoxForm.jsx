function BuyBoxForm({
  buyBox,
  handleChange,
  handleSubmit,
  loading,
}) {
  return (
    <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      {/* Header */}
      <div className="border-b border-slate-200 bg-slate-50/70 px-6 py-6">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-semibold text-slate-900">
                Define your Buy Box
              </h2>

              <span className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700">
                Acquisition Criteria
              </span>
            </div>

            <p className="mt-1 text-sm text-slate-500">
              Set the criteria used to identify and prioritize
              potential acquisition targets.
            </p>
          </div>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="p-6">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {/* Industry */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Industry
              <span className="ml-1 text-red-500">*</span>
            </label>

            <input
              type="text"
              name="industry"
              placeholder="e.g. Manufacturing"
              value={buyBox.industry}
              onChange={handleChange}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          {/* Location */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Location
              <span className="ml-1 text-red-500">*</span>
            </label>

            <input
              type="text"
              name="location"
              placeholder="e.g. Texas"
              value={buyBox.location}
              onChange={handleChange}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          {/* Min Revenue */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Min Revenue ($M)
              <span className="ml-1 text-red-500">*</span>
            </label>

            <input
              type="number"
              name="minRevenue"
              min="0"
              placeholder="5"
              value={buyBox.minRevenue}
              onChange={handleChange}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          {/* Max Revenue */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Max Revenue ($M)
              <span className="ml-1 text-red-500">*</span>
            </label>

            <input
              type="number"
              name="maxRevenue"
              min="0"
              placeholder="50"
              value={buyBox.maxRevenue}
              onChange={handleChange}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          {/* Min Employees */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Min Employees
              <span className="ml-1 text-red-500">*</span>
            </label>

            <input
              type="number"
              name="minEmployees"
              min="0"
              placeholder="20"
              value={buyBox.minEmployees}
              onChange={handleChange}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          {/* Max Employees */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Max Employees
              <span className="ml-1 text-red-500">*</span>
            </label>

            <input
              type="number"
              name="maxEmployees"
              min="0"
              placeholder="200"
              value={buyBox.maxEmployees}
              onChange={handleChange}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          {/* Company Age */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Min Company Age
              <span className="ml-1 text-red-500">*</span>
            </label>

            <input
              type="number"
              name="minAge"
              min="0"
              placeholder="10"
              value={buyBox.minAge}
              onChange={handleChange}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          {/* Website */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Website Requirement
            </label>

            <label className="flex h-[42px] cursor-pointer items-center gap-3 rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-700 transition hover:border-slate-400 hover:bg-slate-50">
              <input
                type="checkbox"
                name="websiteRequired"
                checked={buyBox.websiteRequired}
                onChange={handleChange}
                className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
              />

              <span>Require company website</span>
            </label>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-7 flex flex-col gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-slate-400">
            Fields marked with <span className="text-red-500">*</span>{" "}
            are required.
          </p>

          <button
            type="submit"
            disabled={loading}
            className="rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Evaluating..." : "Evaluate Leads"}
          </button>
        </div>
      </form>
    </section>
  );
}

export default BuyBoxForm;