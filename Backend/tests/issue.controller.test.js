import request from 'supertest';
import { app, server } from '../server.js'; // Adjust the path to your server file
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server'; // For in-memory database
import Issue from '../issue/issue.model.js'; // Import the Issue model

let mongoServer;

// Connect to an in-memory database before all tests
beforeAll(async () => {
    // Check if mongoServer is already initialized to prevent multiple connections
    if (!mongoServer) {
        mongoServer = await MongoMemoryServer.create();
    }
    const mongoUri = mongoServer.getUri();

    // Only connect if there isn't an active connection
    if (mongoose.connection.readyState === 0) {
        await mongoose.connect(mongoUri);
    }
});

// Close the database connection after all tests
afterAll(async () => {
    await mongoose.connection.close() //mongoose.disconnect({ force: true });
    await mongoServer.stop();
    server.close();
});

// Test the create issue endpoint
describe('POST /api/create', () => {
    it('should create a new issue and return it', async () => {
        const newIssue = {
            title: 'Test Issue',
            description: 'Test Description',
        };

        const response = await request(app)
            .post('/api/create')
            .send(newIssue)
            .expect(200);

        expect(response.body.title).toBe(newIssue.title);
        expect(response.body.description).toBe(newIssue.description);
    });

    it('should return 400 if title is missing', async () => {
        const newIssue = {
            description: 'Test Description',
        };

        const response = await request(app)
            .post('/api/create')
            .send(newIssue)
            .expect(400);

        expect(response.body.title).toBe('Title is required');
    });

    it('should return 400 if description is missing', async () => {
        const newIssue = {
            title: 'Test Issue',
        };

        const response = await request(app)
            .post('/api/create')
            .send(newIssue)
            .expect(400);

        expect(response.body.description).toBe('Description is required');
    });

    
});

// Test the get issue by ID endpoint
describe('GET /api/issue/:id', () => {
    let issueId;

    beforeAll(async () => {
        const newIssue = new Issue({
            title: 'Test Issue',
            description: 'Test Description',
        });
        const savedIssue = await newIssue.save();
        issueId = savedIssue._id; // Get the ID for further tests
    });

    it('should return an issue by ID', async () => {
        const response = await request(app)
            .get(`/api/issue/${issueId}`)
            .expect(200);

        expect(response.body.title).toBe('Test Issue');
        expect(response.body.description).toBe('Test Description');
    });

    it('should return 404 if issue not found', async () => {
        const id=new mongoose.Types.ObjectId()
        const response = await request(app)
            .get(`/api/issue/${id}`)
            .expect(404);

        expect(response.body.message).toBe('Not Found');
    });
});

// Test the get all issues endpoint
describe('GET /api/issues', () => {
    it('should return all issues', async () => {
        const response = await request(app)
            .get('/api/issues')
            .expect(200);

        expect(Array.isArray(response.body)).toBe(true);
    });
});

// Test the update issue by ID endpoint
describe('PUT /api/issue/:id', () => {
    let issueId;

    beforeAll(async () => {
        const newIssue = new Issue({
            title: 'Test Issue',
            description: 'Test Description',
        });
        const savedIssue = await newIssue.save();
        issueId = savedIssue._id;
    });

    it('should update an issue by ID', async () => {
        const updatedIssue = {
            title: 'Updated Title',
            description: 'Updated Description',
        };

        const response = await request(app)
            .put(`/api/issue/${issueId}`)
            .send(updatedIssue)
            .expect(200);

        expect(response.body.title).toBe(updatedIssue.title);
        expect(response.body.description).toBe(updatedIssue.description);
    });

    it('should update the title of an issue by ID', async () => {
        const updatedData = {
            title: 'Updated Title',
        };

        const response = await request(app)
            .put(`/api/issue/${issueId}`)
            .send(updatedData)
            .expect(200);

        expect(response.body.title).toBe(updatedData.title);
        expect(response.body.description).toBe('Updated Description'); // Ensure description remains unchanged
    });

    it('should update the description of an issue by ID', async () => {
        const updatedData = {
            description: 'Updated Description',
        };

        const response = await request(app)
            .put(`/api/issue/${issueId}`)
            .send(updatedData)
            .expect(200);

        expect(response.body.description).toBe(updatedData.description);
        expect(response.body.title).toBe('Updated Title'); // Ensure title remains unchanged
    });



    it('should return 404 if issue not found', async () => {
        const id=new mongoose.Types.ObjectId()
        const response = await request(app)
            .put(`/api/issue/${id}`)
            .send({ title: 'Updated Title' })
            .expect(404);

        expect(response.body.message).toBe('Not Found');
    });
});

// Test the delete issue by ID endpoint
describe('DELETE /api/issue/:id', () => {
    let issueId;

    beforeAll(async () => {
        const newIssue = new Issue({
            title: 'Test Issue',
            description: 'Test Description',
        });
        const savedIssue = await newIssue.save();
        issueId = savedIssue._id;
    });

    it('should delete an issue by ID', async () => {
        const response = await request(app)
            .delete(`/api/issue/${issueId}`)
            .expect(200);

        expect(response.body.message).toBe('The issue has been successfully deleted.');
    });

    it('should return 404 if issue not found', async () => {
        const id=new mongoose.Types.ObjectId()
        const response = await request(app)
            .delete(`/api/issue/${id}`)
            .expect(404);

        expect(response.body.message).toBe('Not Found');
    });
});
