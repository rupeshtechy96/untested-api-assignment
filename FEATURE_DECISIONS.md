# Feature Implementation — Task Assignment

## Endpoint Added

```
PATCH /tasks/:id/assign
```

## Request Body

```
{
  "assignee": "string"
}
```

## Behavior

* Assigns a task to a user by storing the assignee name on the task object.
* Returns the updated task.
* Returns **404** if the task does not exist.
* Returns **400** if the assignee value is invalid.

## Validation Decisions

The `assignee` field must:

* be present in the request body
* be a string
* not be an empty value

Invalid input returns a **400 Bad Request**.

## Data Model Update

Each task now includes:

```
assignee: string | null
```

This allows tasks to be assigned or unassigned.

## Testing

Two integration tests were added:

1. Assigning a task successfully.
2. Returning 404 when the task does not exist.

These tests ensure the endpoint works correctly and handles edge cases.
