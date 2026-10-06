import { useState } from "react";

import Header from "./components/Header";
import BuyBoxForm from "./components/BuyBoxForm";
import SummaryCards from "./components/SummaryCards";
import ProcessingSummary from "./components/ProcessingSummary";
import ResultsFilters from "./components/ResultsFilters";
import CompanyCard from "./components/CompanyCard";
import CompanyDetailsModal from "./components/CompanyDetailsModal";

function App() {
  const [buyBox, setBuyBox] = useState({
    industry: "",
    location: "",
    minRevenue: "",
    maxRevenue: "",
    minEmployees: "",
    maxEmployees: "",
    minAge: "",
    websiteRequired: true,
  });

  const [results, setResults] = useState([]);
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [selectedCompany, setSelectedCompany] = useState(null);
  const [detailsLoading, setDetailsLoading] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [recommendationFilter, setRecommendationFilter] =
    useState("All");
  const [industryFilter, setIndustryFilter] = useState("All");
  const [minScore, setMinScore] = useState("0");

  const industries = [
    ...new Set(results.map((company) => company.industry)),
  ];

  const filteredResults = results.filter((company) => {
    const matchesSearch = company.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesRecommendation =
      recommendationFilter === "All" ||
      company.recommendation === recommendationFilter;

    const matchesIndustry =
      industryFilter === "All" ||
      company.industry === industryFilter;

    const matchesScore =
      company.score >= Number(minScore);

    return (
      matchesSearch &&
      matchesRecommendation &&
      matchesIndustry &&
      matchesScore
    );
  });

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setBuyBox((previous) => ({
      ...previous,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Remove the error once the user starts correcting the form.
    if (errorMessage) {
      setErrorMessage("");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setErrorMessage("");

    // Validate required fields
    if (
      !buyBox.industry.trim() ||
      !buyBox.location.trim() ||
      !buyBox.minRevenue ||
      !buyBox.maxRevenue ||
      !buyBox.minEmployees ||
      !buyBox.maxEmployees ||
      !buyBox.minAge
    ) {
      setErrorMessage("Please fill in all Buy Box fields.");
      return;
    }

    const minRevenue = Number(buyBox.minRevenue);
    const maxRevenue = Number(buyBox.maxRevenue);
    const minEmployees = Number(buyBox.minEmployees);
    const maxEmployees = Number(buyBox.maxEmployees);
    const minAge = Number(buyBox.minAge);

    if (minRevenue > maxRevenue) {
      setErrorMessage(
        "Minimum revenue cannot be greater than maximum revenue."
      );
      return;
    }

    if (minEmployees > maxEmployees) {
      setErrorMessage(
        "Minimum employees cannot be greater than maximum employees."
      );
      return;
    }

    if (minRevenue < 0 || maxRevenue < 0) {
      setErrorMessage("Revenue cannot be negative.");
      return;
    }

    if (minEmployees < 0 || maxEmployees < 0) {
      setErrorMessage("Employee count cannot be negative.");
      return;
    }

    if (minAge < 0) {
      setErrorMessage("Company age cannot be negative.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/buy-box`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(buyBox),
        }
      );

      const data = await response.json();

      if (data.success) {
        setResults(data.results);
        setSummary(data.summary);
      } else {
        setErrorMessage(
          data.message || "Failed to evaluate leads."
        );
      }
    } catch (error) {
      console.error("Error evaluating leads:", error);

      setErrorMessage(
        "Something went wrong while evaluating leads. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetails = async (company) => {
    setDetailsLoading(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/companies/${company._id}`
      );

      const data = await response.json();

      if (data.success) {
        setSelectedCompany({
          ...company,
          ...data.company,
        });
      } else {
        console.error("Failed to fetch company details.");
      }
    } catch (error) {
      console.error("Error fetching company details:", error);
    } finally {
      setDetailsLoading(false);
    }
  };

  const handleExportCSV = () => {
    if (filteredResults.length === 0) {
      return;
    }

    const headers = [
      "Company",
      "Industry",
      "Location",
      "Revenue",
      "Employees",
      "Age",
      "Score",
      "Recommendation",
      "Website",
    ];

    const rows = filteredResults.map((company) => [
      company.name,
      company.industry,
      company.location,
      company.revenue,
      company.employees,
      company.age,
      company.score,
      company.recommendation,
      company.website,
    ]);

    const csvContent = [headers, ...rows]
      .map((row) =>
        row
          .map(
            (value) =>
              `"${String(value ?? "").replace(/"/g, '""')}"`
          )
          .join(",")
      )
      .join("\n");

    const blob = new Blob([csvContent], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "qualified-leads.csv";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  const handleClearFilters = () => {
    setSearchTerm("");
    setIndustryFilter("All");
    setRecommendationFilter("All");
    setMinScore("0");
  };

  const highPriorityCount = results.filter(
    (company) => company.recommendation === "High Priority"
  ).length;

  const reviewCount = results.filter(
    (company) => company.recommendation === "Review"
  ).length;

  const skippedCount = results.filter(
    (company) => company.recommendation === "Skip"
  ).length;

  const getRecommendationStyle = (recommendation) => {
    if (recommendation === "High Priority") {
      return "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200";
    }

    if (recommendation === "Review") {
      return "bg-amber-50 text-amber-700 ring-1 ring-amber-200";
    }

    return "bg-red-50 text-red-700 ring-1 ring-red-200";
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Header />

      <main className="mx-auto max-w-7xl space-y-8 px-6 py-8">
        <BuyBoxForm
          buyBox={buyBox}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          loading={loading}
        />

        {errorMessage && (
          <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            <div className="flex items-start gap-3">
              <span className="font-semibold">Error</span>
              <p>{errorMessage}</p>
            </div>
          </div>
        )}

        {results.length > 0 && (
          <section>
            <div className="mb-5">
              <h2 className="text-lg font-semibold">
                Screening Results
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Companies ranked by acquisition fit.
              </p>
            </div>

            <SummaryCards
              highPriorityCount={highPriorityCount}
              reviewCount={reviewCount}
              skippedCount={skippedCount}
              totalLeads={results.length}
            />

            <ProcessingSummary summary={summary} />

            <div className="mb-6 flex justify-end">
              <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-slate-500">
                  Export the currently filtered leads for further review or outreach.
                </p>

                <button
                  onClick={handleExportCSV}
                  disabled={filteredResults.length === 0}
                  className="rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Export CSV
                </button>
              </div>
            </div>

            <ResultsFilters
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              industryFilter={industryFilter}
              setIndustryFilter={setIndustryFilter}
              recommendationFilter={recommendationFilter}
              setRecommendationFilter={setRecommendationFilter}
              minScore={minScore}
              setMinScore={setMinScore}
              industries={industries}
              handleClearFilters={handleClearFilters}
            />

            <div className="mb-4 text-sm text-slate-500">
              Showing{" "}
              <span className="font-semibold text-slate-900">
                {filteredResults.length}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-slate-900">
                {results.length}
              </span>{" "}
              leads
            </div>

            {filteredResults.length > 0 ? (
              <div className="space-y-4">
                {filteredResults.map((company) => (
                  <CompanyCard
                    key={company._id}
                    company={company}
                    getRecommendationStyle={
                      getRecommendationStyle
                    }
                    handleViewDetails={handleViewDetails}
                    detailsLoading={detailsLoading}
                  />
                ))}
              </div>
            ) : (
              <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center">
                <h3 className="text-lg font-semibold text-slate-900">
                  No matching companies
                </h3>

                <p className="mt-2 text-sm text-slate-500">
                  Try changing your search or filter criteria.
                </p>
              </div>
            )}
          </section>
        )}
      </main>

      <CompanyDetailsModal
        selectedCompany={selectedCompany}
        setSelectedCompany={setSelectedCompany}
        getRecommendationStyle={getRecommendationStyle}
      />
    </div>
  );
}

export default App;