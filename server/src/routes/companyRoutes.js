const express = require("express");
const Company = require("../models/Company");

const router = express.Router();

// Get all companies
router.get("/", async (req, res) => {
    try {
        const companies = await Company.find().sort({ createdAt: -1 });

        res.json({
            success: true,
            companies,
        });
    } catch (error) {
        console.error("Error fetching companies:", error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch companies",
        });
    }
});

// Get one company by ID
router.get("/:id", async (req, res) => {
    try {
        const company = await Company.findById(req.params.id);

        if (!company) {
            return res.status(404).json({
                success: false,
                message: "Company not found",
            });
        }

        res.json({
            success: true,
            company,
        });
    } catch (error) {
        console.error("Error fetching company:", error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch company",
        });
    }
});
router.post("/", async (req, res) => {
    try {
        const company = await Company.create(req.body);

        res.status(201).json({
            success: true,
            company,
        });
    } catch (error) {
        console.error("Error creating company:", error);

        res.status(400).json({
            success: false,
            message: "Failed to create company",
            error: error.message,
        });
    }
});

module.exports = router;