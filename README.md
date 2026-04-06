# Finance Dashboard Backend (Assignment)

## Overview

This project is a backend system for a finance dashboard where users can manage financial records based on their roles.

It demonstrates:

- API design
- Data modeling
- Role-Based Access Control (RBAC)
- Dashboard analytics using aggregation

---

## Tech Stack

- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication

---

## Roles & Permissions

| Role    | Access                        |
| ------- | ----------------------------- |
| Viewer  | View dashboard only           |
| Analyst | View records + dashboard      |
| Admin   | Full access (CRUD operations) |

---

## Authentication

- JWT-based authentication
- Token required for protected routes
- Middleware used:
  - `isAuthenticated`
  - `authorizeRoles`

---

## Features

### User Management

- Register user
- Login user
- Role assignment (viewer, analyst, admin)

---

### Financial Records

- Create record
- Get all records
- Update record
- Delete record

#### Fields:

- amount
- type (income / expense)
- category
- date
- notes

---

### Dashboard APIs

- Total income
- Total expenses
- Net balance
- Category-wise aggregation
- Trends (monthly)

---

## Access Control (RBAC)

Implemented using middleware:

- Only admin can create/update/delete records
- Analyst can view records & dashboard
- Viewer can only access dashboard

---
