function calculateRangeScore(value, min, max, points) {
  // Outside the acceptable range
  if (value < min || value > max) {
    return 0;
  }

  // If min and max are the same
  if (min === max) {
    return points;
  }

  const midpoint = (min + max) / 2;

  const distance = Math.abs(value - midpoint);

  const maxDistance = (max - min) / 2;

  // Score ranges from 50% at the boundary
  // to 100% at the midpoint
  const fit = 1 - distance / maxDistance;

  const score = points * (0.5 + 0.5 * fit);

  return Math.round(score);
}

function qualifyCompany(company, buyBox) {
  let score = 0;
  const scoreBreakdown = {
    industry: { earned: 0, possible: 25 },
    location: { earned: 0, possible: 20 },
    revenue: { earned: 0, possible: 20 },
    employees: { earned: 0, possible: 15 },
    age: { earned: 0, possible: 10 },
    website: { earned: 0, possible: 10 },
  };
  const reasons = [];
  const failedCriteria = [];

  // --------------------------------
  // 1. Industry — 25 points
  // --------------------------------
  const industryMatches =
    company.industry.trim().toLowerCase() ===
    buyBox.industry.trim().toLowerCase();

  if (industryMatches) {
    score += 25;
    scoreBreakdown.industry.earned = 25;
    reasons.push("Industry matches");
  } else {
    failedCriteria.push("Industry does not match");
  }

  // --------------------------------
  // 2. Location — 20 points
  // --------------------------------
  const locationMatches =
    company.location.trim().toLowerCase() ===
    buyBox.location.trim().toLowerCase();

  if (locationMatches) {
    score += 20;
    scoreBreakdown.location.earned = 20;
    reasons.push("Location matches");
  } else {
    failedCriteria.push("Location does not match");
  }

  // --------------------------------
  // 3. Revenue — 20 points
  // --------------------------------
  const minRevenue = Number(buyBox.minRevenue);
  const maxRevenue = Number(buyBox.maxRevenue);

  const revenueMatches =
    company.revenue >= minRevenue &&
    company.revenue <= maxRevenue;

  if (revenueMatches) {
    const revenueScore = calculateRangeScore(
      company.revenue,
      minRevenue,
      maxRevenue,
      20
    );

    score += revenueScore;
    scoreBreakdown.revenue.earned = revenueScore;

    reasons.push(
      `Revenue is within target range (${revenueScore}/20)`
    );
  } else if (company.revenue < minRevenue) {
    failedCriteria.push("Revenue is below target range");
  } else {
    failedCriteria.push("Revenue is above target range");
  }

  // --------------------------------
  // 4. Employees — 15 points
  // --------------------------------
  const minEmployees = Number(buyBox.minEmployees);
  const maxEmployees = Number(buyBox.maxEmployees);

  const employeeMatches =
    company.employees >= minEmployees &&
    company.employees <= maxEmployees;

  if (employeeMatches) {
    const employeeScore = calculateRangeScore(
      company.employees,
      minEmployees,
      maxEmployees,
      15
    );

    score += employeeScore;
    scoreBreakdown.employees.earned = employeeScore;

    reasons.push(
      `Employee count is within target range (${employeeScore}/15)`
    );
  } else if (company.employees < minEmployees) {
    failedCriteria.push("Employee count is below target range");
  } else {
    failedCriteria.push("Employee count is above target range");
  }

  // --------------------------------
  // 5. Company Age — 10 points
  // --------------------------------
  const minAge = Number(buyBox.minAge);

  const ageMatches = company.age >= minAge;
  if (ageMatches) {
    score += 10;
    scoreBreakdown.age.earned = 10;
    reasons.push("Company age meets requirement");
  } else {
    failedCriteria.push("Company age does not meet requirement");
  }

  // --------------------------------
  // 6. Website — 10 points
  // --------------------------------
  const websiteMatches =
    !buyBox.websiteRequired || Boolean(company.website);

  if (websiteMatches) {
    score += 10;
    scoreBreakdown.website.earned = 10;


    if (buyBox.websiteRequired) {
      reasons.push("Website available");
    } else {
      reasons.push("Website requirement not applicable");
    }
  } else {
    failedCriteria.push("Website is required");
  }

  // --------------------------------
  // Hard requirements
  // --------------------------------
  const hardRequirementsMet =
    industryMatches && locationMatches;

  let recommendation;

  if (!hardRequirementsMet) {
    recommendation = "Skip";
  } else if (score >= 80) {
    recommendation = "High Priority";
  } else if (score >= 50) {
    recommendation = "Review";
  } else {
    recommendation = "Skip";
  }
  return {
    ...company,
    score,
    recommendation,
    reasons,
    failedCriteria,
    scoreBreakdown,
  };
}

module.exports = qualifyCompany;