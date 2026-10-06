function validateBuyBox(buyBox) {
  const errors = [];

  if (!buyBox.industry || !buyBox.industry.trim()) {
    errors.push("Industry is required");
  }

  if (!buyBox.location || !buyBox.location.trim()) {
    errors.push("Location is required");
  }

  const minRevenue = Number(buyBox.minRevenue);
  const maxRevenue = Number(buyBox.maxRevenue);

  if (!Number.isFinite(minRevenue) || minRevenue < 0) {
    errors.push("Minimum revenue must be a non-negative number");
  }

  if (!Number.isFinite(maxRevenue) || maxRevenue < 0) {
    errors.push("Maximum revenue must be a non-negative number");
  }

  if (
    Number.isFinite(minRevenue) &&
    Number.isFinite(maxRevenue) &&
    minRevenue > maxRevenue
  ) {
    errors.push(
      "Minimum revenue cannot be greater than maximum revenue"
    );
  }

  const minEmployees = Number(buyBox.minEmployees);
  const maxEmployees = Number(buyBox.maxEmployees);

  if (!Number.isFinite(minEmployees) || minEmployees < 0) {
    errors.push(
      "Minimum employees must be a non-negative number"
    );
  }

  if (!Number.isFinite(maxEmployees) || maxEmployees < 0) {
    errors.push(
      "Maximum employees must be a non-negative number"
    );
  }

  if (
    Number.isFinite(minEmployees) &&
    Number.isFinite(maxEmployees) &&
    minEmployees > maxEmployees
  ) {
    errors.push(
      "Minimum employees cannot be greater than maximum employees"
    );
  }

  const minAge = Number(buyBox.minAge);

  if (!Number.isFinite(minAge) || minAge < 0) {
    errors.push(
      "Minimum company age must be a non-negative number"
    );
  }

  if (typeof buyBox.websiteRequired !== "boolean") {
    errors.push("Website required must be true or false");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

module.exports = validateBuyBox;