# Software Requirements Specification (SRS)
## Udhari Khata — Digital Credit Ledger Web App

**Version:** 1.0 (MVP)
**Date:** July 20, 2026

---

## 1. Purpose & Scope
Udhari Khata is a web-based digital credit ledger for small local businesses (starting with a vegetable shop), replacing the traditional paper "khata." It lets a shop owner and their customers both record credit/payment transactions, with an owner-verification step to protect ledger integrity.

MVP scope: single shop, single owner. Multi-shop support, online payment collection, and automated reminders are out of scope for this version.

---

## 2. User Roles

| Role | Description |
|---|---|
| **Shop Owner (Admin)** | Manages customers, adds/verifies entries, sends reminders, views dashboard |
| **Customer** | Views own ledger, adds self-reported credit entries |

---

## 3. Operating Environment
- Frontend: React.js (mobile-first, responsive)
- Backend: Node.js + Express.js
- Database: MongoDB (Atlas)
- Deployment : Frontend - Vercel, Backend - Render, MongoDB - Atlas.
- Auth: email + password (customer), admin credentials (owner)
- Notifications: WhatsApp (for payment reminders)
- Storage: Imagekit

---

## 4. Functional Requirements

### 4.1 Authentication
| ID | Requirement |
|---|---|
| FR-1.1 | Owner logs in with admin username/password |
| FR-1.2 | Customer signs up/logs in with phone number + OTP |
| FR-1.3 | System issues a session token (JWT) on successful login |
| FR-1.4 | Owner-only and customer-only routes are access-restricted by role |

### 4.2 Owner Features
| ID | Requirement |
|---|---|
| FR-2.1 | Owner can add and manage customer accounts |
| FR-2.2 | Owner can add a credit or payment entry for any customer, with an optional note |
| FR-2.3 | Owner can view and search any customer's ledger |
| FR-2.4 | Owner can view Pending entries and either approve (Verify) or reject them. On rejection, owner must add a message stating the reason |
| FR-2.5 | Owner can manually send a payment reminder via WhatsApp |
| FR-2.6 | Owner has a dashboard showing total outstanding credit and top debtors |
| FR-2.7 | Entries added by the owner are auto-marked as Verified |

### 4.3 Customer Features
| ID | Requirement |
|---|---|
| FR-3.1 | Customer can add their own credit entry (amount + optional note) |
| FR-3.2 | Customer-added entries default to status **Pending** |
| FR-3.3 | Customer can view their own ledger, including balance and full history |
| FR-3.4 | Customer can see the status of each entry (Pending/Verified) |
| FR-3.5 | Customer can see entries added by the owner |

### 4.4 Shared Ledger Logic
| ID | Requirement |
|---|---|
| FR-4.1 | Balance is calculated in real time as sum of Verified credits minus Verified payments |
| FR-4.2 | Every entry has a status field: `pending` or `verified` |
| FR-4.3 | Pending and Verified entries are visually distinguishable in the UI |
| FR-4.4 | Dashboard shows Verified and Pending totals separately (e.g. "Verified: ₹X, Pending: ₹Y") rather than combining them |

---

## 5. Non-Functional Requirements

| ID | Requirement |
|---|---|
| NFR-1 | UI must be mobile-responsive |
| NFR-2 | OTP verification should complete within ~30 seconds |
| NFR-3 | Ledger balance must update in real time after any entry is added or verified |
| NFR-4 | Passwords and OTPs must never be stored in plain text |
| NFR-5 | UI must be simple and usable for non-tech-savvy shop owners and customers |

---

## 6. Data Model

**Owner**
- ownerId, name, shopName, username, passwordHash, phone, createdAt

**Customer**
- customerId, name, phone, ownerId, status (active/inactive), createdAt

**Entry**
- entryId, customerId, ownerId, type (credit/payment), amount, note, addedBy (owner/customer), status (pending/verified/rejected), createdAt, verifiedAt, verifiedBy, rejectionReason

---

## 7. MVP Scope Boundaries

**In scope:**
- Single shop, single owner
- Owner + customer entries with verification workflow
- Manual WhatsApp reminders
- Basic dashboard (total outstanding, top debtors)

**Out of scope (future phases):**
- Automated/scheduled reminders
- Multi-shop support
- Online payment collection
- Multi-language support
- Detailed analytics/reporting

---

---

*End of SRS — Version 1.0 (MVP)*
