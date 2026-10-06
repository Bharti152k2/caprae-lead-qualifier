function deduplicateCompanies(companies) {
    const seen = new Set();

    return companies.filter((company) => {
        const key = `${company.name.trim().toLowerCase()}|${company.location
            .trim()
            .toLowerCase()}`;

        if (seen.has(key)) {
            return false;
        }

        seen.add(key);
        return true;
    });
}

module.exports = deduplicateCompanies;