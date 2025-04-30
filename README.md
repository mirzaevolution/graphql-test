[![Deploy to Elastic Beanstalk](https://github.com/mirzaevolution/graphql-test/actions/workflows/pipeline.yml/badge.svg)](https://github.com/mirzaevolution/graphql-test/actions/workflows/pipeline.yml)


# Sample GraphQL API

A complete GraphQL backend built with Node.js (TypeScript), Prisma, and SQL Server.
Deployed to Azure App Service (Node.JS) with full CI/CD automation via GitHub Actions.

**You can check the deployed endpoint here: https://graphql-mgr-hwazedfzhtexagca.southeastasia-01.azurewebsites.net/graphql**

---

## Technologies

- Node.js + TypeScript
- Apollo Server (GraphQL)
- Prisma ORM
- SQL Server (via AWS RDS)
- Azure App Service (Node.JS)
- GitHub Actions (CI/CD)

---

## Project Setup

1. [git clone https://github.com/mirzaevolution/graphql-test.git](https://github.com/mirzaevolution/graphql-test.git)

2. Install dependencies

    `cd graphql-test`
    `npm install`

3. Create .env:

    `DATABASE_URL="sqlserver://SERVER:PORT;database=DB_NAME;user=USERNAME;password=PASSWORD;trustServerCertificate=true"`

4. Build and start locally:
  ```
    npm run build
    npm run dev
  ```

Access: http://localhost:4000

---

## Prisma Models

- Proposal
- Day
- Step

Each with cascading delete and reordering on remove.

---

## Sample GraphQL Queries

### Create Proposal

```
  mutation {
    createProposal(input: {
      name: "Test Proposal 1",
      days: [{ name: "Day 1" }, { name: "Day 2" }],
      steps: [{ name: "Step 1" }]
    }) {
      id name
    }
  }
```

### Query Proposals

```
  query {
    proposals {
      id name
      days { id name order }
      steps { id name order }
    }
  }
```

---

## App Deployment

- Azure App Service (Node.JS)
- RDS SQL Server (public, port 1433)
- Configure DATABASE_URL as environment variable

Build and zip:

npm run build
zip -r deploy.zip dist node_modules package.json .env prisma

Upload to Azure App Service dashboard.

---

## GitHub Actions CI/CD

[CI/CD GitHub Actions Dashboard](https://github.com/mirzaevolution/graphql-test/blob/master/.github/workflows/pipeline.yml)

Secrets required:
- AZURE_WEBAPP_PUBLISH_PROFILE

---

## Samples:
![2025-05-01_01h19_01](https://github.com/user-attachments/assets/cc6f2ca8-7f89-460b-a4d0-d06f287860cc)
![2025-05-01_01h29_00](https://github.com/user-attachments/assets/41b3b4d5-3939-481f-bc37-86a7ffd7de58)
![2025-05-01_01h38_46](https://github.com/user-attachments/assets/45fcf156-86c7-4642-b4ea-ba1d00eb1d32)
![2025-05-01_01h38_49](https://github.com/user-attachments/assets/2fbbc48d-2a06-487b-b70a-d0717fe49d88)

