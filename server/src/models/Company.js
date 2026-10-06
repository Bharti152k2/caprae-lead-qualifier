const mongoose = require("mongoose");

const companySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    industry: {
      type: String,
      required: true,
    },

    location: {
      type: String,
      required: true,
    },

    revenue: {
      type: Number,
      required: true,
    },

    employees: {
      type: Number,
      required: true,
    },

    age: {
      type: Number,
      required: true,
    },

    website: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Company", companySchema);