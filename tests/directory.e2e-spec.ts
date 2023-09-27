import supertest from 'supertest';
import app from '../src/app';

const request = supertest(app);

describe('DirectoryController E2E Tests', () => {

  it('should get all directories', async () => {
    const response = await request.get('/directory');
    expect(response.status).toBe(200);
  });

  it('should view directory stats', async () => {
    const response = await request.get('/directory/view-directory-stats/1');
    expect(response.status).toBe(200);
  });

  it('should view directory content', async () => {
    const response = await request.get('/directory/view-directory-content/1');
    expect(response.status).toBe(200);
  });
});
