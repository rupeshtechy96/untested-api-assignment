# Bug Report

## Bug 1 — Incorrect Pagination Offset

**Location:**
`src/services/taskService.js`

**Issue:**
The pagination logic used the formula:

```
offset = page * limit
```

This skips the first page of results. For example:

* page = 1
* limit = 10

Offset becomes `10`, which skips the first 10 records.

**Expected Behavior:**
The first page should start at index `0`.

**Fix Implemented:**

```
offset = (page - 1) * limit
```

This correctly returns results starting from the first item when page = 1.

---

## Bug 2 — Incorrect Status Filtering

**Location:**
`src/services/taskService.js`

**Issue:**
Status filtering previously used:

```
t.status.includes(status)
```

This could incorrectly match partial strings. For example:

* searching for `do` could match `done`.

**Expected Behavior:**
Status filtering should match exact values.

**Fix Implemented:**

```
t.status === status
```

This ensures accurate filtering.

---

## Bug 3 — Task Completion Overwrites Priority

**Location:**
`src/services/taskService.js`

**Issue:**
When marking a task as complete, the code forced the priority to `medium` regardless of the existing value.

**Expected Behavior:**
Completing a task should only update:

* `status`
* `completedAt`

Priority should remain unchanged.

**Fix Implemented:**
Removed the priority override in the completion logic.
