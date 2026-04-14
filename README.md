# Task API — Take-Home Assignment

This project implements a small task management API using **Node.js and Express**.

The goal of the assignment was to:

* understand an unfamiliar codebase
* write tests for existing functionality
* identify and fix bugs
* implement a new feature
* document design decisions

The API uses an **in-memory datastore** and includes **automated tests using Jest and Supertest**.
--------------


# Take-Home Assignment — The Untested API

A 2-day take-home assignment. You'll read unfamiliar code, write tests, track down bugs, and ship a small feature.

Read **[ASSIGNMENT.md](./ASSIGNMENT.md)** for the full brief before you start.

---

## A note on AI tools

You're welcome to use AI tools. What we're evaluating is your ability to read and reason about unfamiliar code — so your submission should reflect your own understanding, not just generated output.

Concretely:
- For each bug you report: include where in the code it lives and why it happens
- For the feature you implement: briefly explain the design decisions you made
- If something surprised you or you had to make a tradeoff, say so

---

## Getting Started

**Prerequisites:** Node.js 18+

```bash
cd task-api
npm install
npm start        # runs on http://localhost:3000
```

**Tests:**

```bash
npm test           # run test suite
npm run coverage   # run with coverage report
```

---

## Project Structure


task-api/
│
├── src/
│ ├── app.js # Express application setup
│ ├── routes/
│ │ └── tasks.js # API route definitions
│ ├── services/
│ │ └── taskService.js # Business logic and in-memory data store
│ └── utils/
│ └── validators.js # Input validation helpers
│
├── tests/
│ └── tasks.test.js # Integration tests
│
├── BUG_REPORT.md # Identified bugs and fixes
├── FEATURE_DECISIONS.md # Feature implementation explanation
├── package.json
└── jest.config.js

---
> The data store is in-memory. It resets every time the server restarts.

---

## API Reference

| Method   | Path                      | Description                              |
|----------|---------------------------|------------------------------------------|
| `GET`    | `/tasks`                  | List all tasks. Supports `?status=`, `?page=`, `?limit=` |
| `POST`   | `/tasks`                  | Create a new task                        |
| `PUT`    | `/tasks/:id`              | Full update of a task                    |
| `DELETE` | `/tasks/:id`              | Delete a task (returns 204)              |
| `PATCH`  | `/tasks/:id/complete`     | Mark a task as complete                  |
| `GET`    | `/tasks/stats`            | Counts by status + overdue count         |
| `PATCH`  | `/tasks/:id/assign`       | **Assign a task to a user** _(to implement)_ |

### Task shape

```json
{
  "id": "uuid",
  "title": "string",
  "description": "string",
  "status": "pending | in-progress | completed",
  "priority": "low | medium | high",
  "dueDate": "ISO 8601 or null",
  "completedAt": "ISO 8601 or null",
  "createdAt": "ISO 8601"
}
```

### Sample requests

**Create a task**
```bash
curl -X POST http://localhost:3000/tasks \
  -H "Content-Type: application/json" \
  -d '{"title": "Write tests", "priority": "high"}'
```

**List tasks with filter**
```bash
curl "http://localhost:3000/tasks?status=pending&page=1&limit=10"
```

**Mark complete**
```bash
curl -X PATCH http://localhost:3000/tasks/<id>/complete
```

---

## What to Submit

See [ASSIGNMENT.md](./ASSIGNMENT.md) for full submission requirements. At minimum, include:

- **Test files** — covering the endpoints and edge cases you identified
- **Bug report** — what you found, where in the code, and why it's a bug (not just symptoms)
- **At least one fix** — with a note on your approach
- **`PATCH /tasks/:id/assign` implementation** — plus a short explanation of any design decisions (validation, edge cases, etc.)


## Test Coverage

The project includes integration and unit tests written using **Jest** and **Supertest**.

Coverage report:

* API endpoints tested
* Edge cases included
* Error handling validated
---



<img width="738" height="350" alt="image" src="https://github.com/user-attachments/assets/a8ac07ce-a9e3-428e-a399-c1e3e6bede16" />




---
Coverage is generated using:

```
npm run coverage
```
--
## Example API Requests

### Create Task

```
POST /tasks
```

Body:

```
{
  "title": "Write tests",
  "priority": "high"
}
```

---

### Assign Task

```
PATCH /tasks/:id/assign
```

Body:

```
{
  "assignee": "John"
}
```

---

### Mark Task Complete

```
PATCH /tasks/:id/complete
```


