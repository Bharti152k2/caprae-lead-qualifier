# Caprae Lead Qualifier

An acquisition target screening dashboard that helps users evaluate and prioritize potential acquisition leads based on a customizable Buy Box.

## Overview

Lead-generation tools can help identify potential companies, but acquisition teams still need to determine which companies are worth spending time on.

Caprae Lead Qualifier adds a qualification layer to this workflow.

A user defines their acquisition criteria through a Buy Box, and the application evaluates available company records against those criteria. The system validates the data, removes duplicate companies, calculates an explainable qualification score, and recommends whether each company should be prioritized, reviewed, or skipped.

The goal is to reduce manual screening effort and help acquisition teams focus their attention on the most relevant targets.

---

## Why I Built This

After analyzing the SaaSquatch Leads workflow, I focused on the step between finding potential companies and deciding which companies deserve attention.

The application is designed as a lightweight acquisition screening layer rather than another lead-generation system.

The main workflow is:

**Buy Box → Validate → Deduplicate → Score → Explain → Prioritize → Export**

This allows a user to quickly move from broad company data to a ranked set of acquisition targets.

---

## Key Features

### 1. Customizable Buy Box

Users can define:

- Industry
- Location
- Minimum and maximum revenue
- Minimum and maximum employees
- Minimum company age
- Website requirement

### 2. Automated Qualification

Each company is evaluated against the selected acquisition criteria.

The system calculates a score out of 100 based on:

| Criterion | Maximum Points |
|-----------|---------------:|
| Industry | 25 |
| Location | 20 |
| Revenue | 20 |
| Employees | 15 |
| Company Age | 10 |
| Website | 10 |
| **Total** | **100** |

Industry and location are treated as hard requirements.

If either requirement fails, the company is marked as **Skip**.

### 3. Explainable Scoring

The application does not only return a score.

For every company, it shows:

- Matching criteria
- Criteria not met
- Points earned
- Detailed score breakdown

This allows users to understand why a company received its recommendation.

### 4. Lead Prioritization

Companies are classified into three categories:

- **High Priority** — score of 80 or higher
- **Review** — score between 50 and 79
- **Skip** — score below 50 or failure of a hard requirement

### 5. Data Validation

Before qualification, company records are checked for required fields and valid numeric values.

Invalid records are excluded from the qualification process.

### 6. Duplicate Removal

Duplicate companies are removed using a normalized combination of:

- Company name
- Location

This prevents the same company from being evaluated multiple times.

### 7. Search and Filtering

Users can filter evaluated companies by:

- Company name
- Industry
- Recommendation
- Minimum score

Filters can also be cleared with one action.

### 8. Company Details

Users can open a detailed view for a company to see:

- Qualification score
- Score breakdown
- Recommendation
- Company information
- Matching criteria
- Criteria not met
- Company website

### 9. CSV Export

Users can export the currently filtered results as a CSV file for further review or outreach.

---

## UX Decisions

The interface was designed around a simple screening workflow.

### Buy Box First

The Buy Box is placed at the top because the user's acquisition criteria determine how every lead will be evaluated.

### Summary Before Details

After evaluation, summary cards immediately show:

- High Priority leads
- Review leads
- Skipped leads
- Total evaluated leads

This gives the user a quick overview before reviewing individual companies.

### Explainability

Instead of displaying only a numerical score, each company shows the reasons behind its score.

This is important for an acquisition workflow because users may need to understand why a company was prioritized before deciding whether to investigate it further.

### Progressive Detail

The main results remain compact enough to scan quickly.

Detailed scoring and company information are available through the **View Details** interaction.

### Focused Scope

The application intentionally focuses on qualification and prioritization rather than attempting to recreate an entire lead-generation platform.

This keeps the workflow useful while staying within the five-hour development constraint.

---

## Technical Architecture

The application uses a MERN-style architecture.

```text
React + Vite
     |
     | HTTP / REST API
     v
Node.js + Express
     |
     +---- Qualification Engine
     |
     +---- Validation
     |
     +---- Deduplication
     |
     v
MongoDB Atlas
```

### Frontend

- React
- Vite
- Tailwind CSS

The frontend manages:

- Buy Box input
- Validation messages
- API requests
- Result display
- Search and filtering
- Company details modal
- CSV export

### Backend

- Node.js
- Express
- Mongoose

The backend handles:

- Company retrieval
- Buy Box evaluation
- Qualification scoring
- Data validation
- Deduplication
- Company details

### Database

MongoDB Atlas stores company records.

The company schema contains:

- Name
- Industry
- Location
- Revenue
- Employees
- Company age
- Website
- Created/updated timestamps

---

## Qualification Logic

The qualification engine uses a weighted scoring model.

### Hard Requirements

Industry and location are hard requirements.

For example, if the Buy Box specifies:

```text
Industry: Manufacturing
Location: Texas
```

a company in another industry or location will not be treated as a qualified acquisition target even if it performs well on other criteria.

### Range-Based Scoring

Revenue and employee count use a proximity-based scoring approach.

Values inside the selected range receive partial to full credit depending on how close they are to the midpoint of the range.

The midpoint receives the highest score, while values near the boundaries receive lower partial credit.

Values outside the acceptable range receive zero points.

This is a mathematical screening heuristic rather than a claim about the actual attractiveness of a company.

---

## Data Processing Flow

When the user submits a Buy Box:

1. The frontend validates the Buy Box inputs.
2. The backend retrieves company records from MongoDB.
3. Company records are validated.
4. Invalid records are excluded.
5. Duplicate records are removed.
6. Remaining companies are evaluated against the Buy Box.
7. Each company receives a qualification score.
8. Matching and failed criteria are generated.
9. Companies receive a recommendation.
10. Results are sorted by score.
11. The frontend displays the results.
12. Users can filter and export the results.

---

## API Endpoints

### Health Check

```http
GET /api/health
```

Returns the API status.

### Get Companies

```http
GET /api/companies
```

Returns company records stored in MongoDB.

### Get Company

```http
GET /api/companies/:id
```

Returns a single company by MongoDB ID.

### Create Company

```http
POST /api/companies
```

Creates a company record.

This endpoint exists as a backend capability; the current UI intentionally focuses on screening rather than manual data entry.

### Evaluate Buy Box

```http
POST /api/buy-box
```

Evaluates stored companies against the submitted Buy Box and returns:

- Processing summary
- Qualification results
- Scores
- Recommendations
- Score breakdown
- Matching criteria
- Failed criteria

---

## Project Structure

```text
caprae-lead-qualifier/
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── BuyBoxForm.jsx
│   │   │   ├── CompanyCard.jsx
│   │   │   ├── CompanyDetailsModal.jsx
│   │   │   ├── Header.jsx
│   │   │   ├── ProcessingSummary.jsx
│   │   │   ├── ResultsFilters.jsx
│   │   │   └── SummaryCards.jsx
│   │   │
│   │   ├── App.jsx
│   │   └── index.css
│   │
│   └── vite.config.js
│
├── server/
│   ├── src/
│   │   ├── models/
│   │   │   └── Company.js
│   │   │
│   │   ├── routes/
│   │   │   └── companyRoutes.js
│   │   │
│   │   ├── db.js
│   │   ├── deduplicate.js
│   │   ├── qualifier.js
│   │   ├── seed.js
│   │   ├── server.js
│   │   └── validator.js
│   │
│   └── package.json
│
├── .gitignore
└── README.md
```

---

## Getting Started

### Prerequisites

Install:

- Node.js
- npm
- MongoDB Atlas account

### 1. Clone the repository

```bash
git clone <your-github-repository-url>
cd caprae-lead-qualifier
```

### 2. Install frontend dependencies

```bash
cd client
npm install
```

### 3. Install backend dependencies

Open another terminal:

```bash
cd server
npm install
```

### 4. Configure backend environment variables

Create:

```text
server/.env
```

Add:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
```

### 5. Configure frontend environment variables

Create:

```text
client/.env
```

Add:

```env
VITE_API_URL=http://localhost:5000
```

### 6. Seed the database

From the `server` directory:

```bash
node src/seed.js
```

### 7. Start the backend

```bash
npm run dev
```

The API runs on:

```text
http://localhost:5000
```

### 8. Start the frontend

From the `client` directory:

```bash
npm run dev
```

Vite will provide the local development URL.

---

## Environment Variables

### Backend

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
```

### Frontend

```env
VITE_API_URL=http://localhost:5000
```

Environment files containing secrets should never be committed to GitHub.

---

## Example Buy Box

A sample Buy Box can be configured as:

```text
Industry: Manufacturing
Location: Texas

Revenue:
$5M - $50M

Employees:
20 - 200

Minimum Company Age:
10 years

Website:
Required
```

The application then evaluates the available company records and ranks them based on acquisition fit.

---

## Performance and Scalability

For the assignment MVP, the application uses a straightforward architecture designed for rapid development and clarity.

Company records are stored in MongoDB Atlas and retrieved by the backend.

The qualification calculations are performed in memory after retrieval, which keeps the scoring logic simple and easy to reason about for the current dataset size.

For a production-scale implementation, the next steps could include:

- Pagination
- Database indexing
- Server-side filtering
- Background processing for larger datasets
- Caching frequently used screening results
- Queue-based processing for large lead imports
- Authentication and authorization
- Audit logging

---

## Deployment

The application is designed to be deployable as separate frontend and backend services.

Potential deployment architecture:

```text
React / Vite
     |
     v
Frontend Hosting
     |
     | HTTPS
     v
Node.js / Express API
     |
     v
MongoDB Atlas
```

Deployment configuration and production URLs will be added once the application is deployed.

---

## Limitations

This MVP uses a controlled company dataset to demonstrate the qualification workflow.

The project does not attempt to reproduce SaaSquatch Leads' underlying data sources, private systems, or proprietary functionality.

The scoring model is also intentionally simple and explainable. A production acquisition system could incorporate additional factors such as:

- Profitability
- Growth
- Ownership structure
- Geographic concentration
- Customer concentration
- Industry-specific risk
- Debt
- Recurring revenue
- Historical financial performance

---

## Future Improvements

If additional development time were available, I would consider adding:

1. Lead import through CSV
2. Saved Buy Box profiles
3. Authentication and user-specific screening criteria
4. More acquisition-specific scoring factors
5. Advanced financial metrics
6. Persistent screening history
7. Exportable screening reports
8. Server-side pagination and filtering
9. Background processing for large datasets
10. Production deployment and monitoring

---

## Assignment Scope

This project was intentionally scoped around the highest-value workflow that could be completed within the available development time:

**Define acquisition criteria → automatically qualify leads → explain the result → prioritize targets → export results**

The goal was to demonstrate business understanding, usable UX, full-stack implementation, explainable decision logic, and a clear path toward production scalability.
