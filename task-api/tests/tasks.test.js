const request = require('supertest');
const app = require('../src/app');
const taskService = require('../src/services/taskService');

beforeEach(() => {
  taskService._reset();
});

describe('Tasks API', () => {

  test('GET /tasks should return empty array initially', async () => {
    const res = await request(app).get('/tasks');

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual([]);
  });

  test('POST /tasks should create a new task', async () => {
    const res = await request(app)
      .post('/tasks')
      .send({
        title: 'Test Task',
        priority: 'high'
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe('Test Task');
    expect(res.body.priority).toBe('high');
  });

  test('POST /tasks should fail if title is missing', async () => {
    const res = await request(app)
      .post('/tasks')
      .send({
        priority: 'high'
      });

    expect(res.statusCode).toBe(400);
  });

  test('GET /tasks should return created tasks', async () => {
    await request(app)
      .post('/tasks')
      .send({ title: 'Task 1' });

    const res = await request(app).get('/tasks');

    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(1);
  });

  test('DELETE /tasks/:id should delete task', async () => {
    const create = await request(app)
      .post('/tasks')
      .send({ title: 'Task to delete' });

    const id = create.body.id;

    const res = await request(app)
      .delete(`/tasks/${id}`);

    expect(res.statusCode).toBe(204);
  });

  test('PATCH /tasks/:id/complete should mark task complete', async () => {
    const create = await request(app)
      .post('/tasks')
      .send({ title: 'Complete task' });

    const id = create.body.id;

    const res = await request(app)
      .patch(`/tasks/${id}/complete`);

    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('done');
  });

});

test('GET /tasks/:id should return 404 for non-existing task', async () => {
  const res = await request(app).get('/tasks/12345');

  expect(res.statusCode).toBe(404);
});

test('PUT /tasks/:id should return 404 if task does not exist', async () => {
  const res = await request(app)
    .put('/tasks/unknown-id')
    .send({ title: 'Updated task' });

  expect(res.statusCode).toBe(404);
});

test('DELETE /tasks/:id should return 404 if task does not exist', async () => {
  const res = await request(app).delete('/tasks/non-existent');

  expect(res.statusCode).toBe(404);
});


test('PATCH /tasks/:id/assign should assign task to user', async () => {
  const create = await request(app)
    .post('/tasks')
    .send({ title: 'Assigned Task' });

  const id = create.body.id;

  const res = await request(app)
    .patch(`/tasks/${id}/assign`)
    .send({ assignee: 'John' });

  expect(res.statusCode).toBe(200);
  expect(res.body.assignee).toBe('John');
});

test('PATCH /tasks/:id/assign should return 404 if task not found', async () => {
  const res = await request(app)
    .patch('/tasks/invalid-id/assign')
    .send({ assignee: 'John' });

  expect(res.statusCode).toBe(404);
});