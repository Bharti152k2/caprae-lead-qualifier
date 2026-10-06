const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./db");
const Company = require("./models/company");
const qualifyCompany = require("./qualifier");
const deduplicateCompanies = require("./deduplicate");
const validateCompany = require("./validator");
const validateBuyBox = require("./buyBoxValidator");
const companyRoutes = require("./routes/companyRoutes");
const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/companies", companyRoutes);

app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    message: "Caprae Lead Qualifier API is running",
  });
});
app.post("/api/buy-box", async (req, res) => {
  try {
    const buyBox = req.body;
    const buyBoxValidation = validateBuyBox(buyBox);

    if (!buyBoxValidation.isValid) {
      return res.status(400).json({
        success: false,
        message: "Invalid Buy Box",
        errors: buyBoxValidation.errors,
      });
    }
    const companies = await Company.find();

    // Convert MongoDB documents to plain objects
    const companyData = companies.map((company) =>
      company.toObject()
    );

    // Validate company data
    const validCompanies = companyData.filter(
      (company) => validateCompany(company).isValid
    );

    const invalidCount =
      companyData.length - validCompanies.length;

    // Remove duplicate companies
    const uniqueCompanies =
      deduplicateCompanies(validCompanies);

    const duplicateCount =
      validCompanies.length - uniqueCompanies.length;

    // Score and qualify companies
    const results = uniqueCompanies
      .map((company) => qualifyCompany(company, buyBox))
      .sort((a, b) => b.score - a.score);

    res.json({
      success: true,

      summary: {
        totalCompanies: companyData.length,
        invalidCompanies: invalidCount,
        duplicateCompanies: duplicateCount,
        qualifiedCompanies: results.length,
      },

      results,
    });
  } catch (error) {
    console.error("Error evaluating companies:", error);

    res.status(500).json({
      success: false,
      message: "Failed to evaluate companies",
    });
  }
});
const PORT = process.env.PORT || 5000;
connectDB();
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});