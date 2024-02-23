const request = require('supertest');
const app = require('./api'); 

// Test the /tasks GET endpoint
test('GET /tasks returns all tasks.', async () => {
  const response = await request(app).get('/tasks');
  expect(response.status).toBe(200);
  expect(response.body).toHaveLength(3); // Assuming there are 2 tasks initially
});

// Test the /tasks GET by ID endpoint
test('GET /tasks by id', async () => {
    const idTask = 1
    const response = await request(app).get('/tasks/'+idTask);
    expect(response.status).toBe(200);
  });

  //Test POST /tasks
  test('POST /tasks', async () => {
    const newTask = { id: 4, title: 'New Task', description: 'Do something new' }
    const response = await request(app).post('/tasks/').send(newTask);
    expect(response.status).toBe(201);
    expect(response.body === newTask);
  });

  //Test PUT /tasks
  test("PUT /tasks:id should update a task", async()=>{
    const idTask = 1
    const response = await  request(app).put("/tasks/"+idTask).send({description:'Updated Test'});
    expect(response.status).toBe(200);
    expect(response.body.description).toBe('Updated Test');
})

//Test DELETE /tasks
test("DELETE /tasks:id should update a task", async()=>{
    const idTask = 1
    const response = await  request(app).delete("/tasks/"+idTask);
    expect(response.status).toBe(204);
})
