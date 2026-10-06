function validateCompany(company) {
    const errors = [];

    if (!company.name || !company.name.trim()) {
        errors.push("Company name is missing");
    }

    if (!company.industry || !company.industry.trim()) {
        errors.push("Industry is missing");
    }

    if (!company.location || !company.location.trim()) {
        errors.push("Location is missing");
    }

    if (typeof company.revenue !== "number" || company.revenue < 0) {
        errors.push("Revenue must be a non-negative number");
    }

    if (
        typeof company.employees !== "number" ||
        company.employees < 0
    ) {
        errors.push("Employees must be a non-negative number");
    }

    if (typeof company.age !== "number" || company.age < 0) {
        errors.push("Company age must be a non-negative number");
    }

    return {
        isValid: errors.length === 0,
        errors,
    };
}

module.exports = validateCompany;