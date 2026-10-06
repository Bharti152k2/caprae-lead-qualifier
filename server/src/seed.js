require("dotenv").config();

const connectDB = require("./db");
const Company = require("./models/Company");

const companies = [
    {
        name: "Lone Star Manufacturing",
        industry: "Manufacturing",
        location: "Texas",
        revenue: 25,
        employees: 120,
        age: 18,
        website: "https://lonestarmanufacturing.com",
    },
    {
        name: "Texas Auto Parts",
        industry: "Automotive",
        location: "Texas",
        revenue: 12,
        employees: 80,
        age: 15,
        website: "https://texasautoparts.com",
    },
    {
        name: "Houston Industrial Supply",
        industry: "Manufacturing",
        location: "Texas",
        revenue: 7,
        employees: 35,
        age: 12,
        website: "https://houstonindustrial.com",
    },
    {
        name: "Dallas Software Solutions",
        industry: "Software",
        location: "Texas",
        revenue: 30,
        employees: 150,
        age: 10,
        website: "https://dallassoftware.com",
    },
    {
        name: "Austin Metal Works",
        industry: "Manufacturing",
        location: "Texas",
        revenue: 60,
        employees: 250,
        age: 22,
        website: "https://austinmetalworks.com",
    },
    {
        name: "Lone Star Manufacturing",
        industry: "Manufacturing",
        location: "Texas",
        revenue: 25,
        employees: 120,
        age: 18,
        website: "https://another-example.com",
    }
];

const seedDatabase = async () => {
    try {
        await connectDB();

        await Company.deleteMany();

        await Company.insertMany(companies);

        console.log("Companies inserted successfully");

        process.exit(0);
    } catch (error) {
        console.error("Seeding failed:", error.message);

        process.exit(1);
    }
};

seedDatabase();