import request from 'supertest';
import app from '../src/app';
import prisma from '../src/database/client';
import { HashService } from '../src/infrastructure/services/hash/hash.service';

describe('Auth E2E', () => {
  beforeAll(async () => {
    const hash = new HashService();
    await prisma.user.create({
      data: {
        email: 'ss@gmail.com',
        password: await hash.make('12345678')
      }
    });
  });

  describe('login', () => {
    it('successful login with valid credentials', async () => {
      // Arrange
      const payload = {
        email: 'ss@gmail.com',
        password: '12345678'
      };

      // Act
      const response = await request(app)
        .post('/api/auth/login')
        .send(payload)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json');

      // Assert
      expect(response.status).toBe(200);
      expect(response.body.user.email).toBe(payload.email);
      expect(response.body.token).toBeDefined();
      expect(response.headers['set-cookie'][0]).toBeDefined();
    });

    it('invalid email input and short password', async () => {
      // Arrange
      const payload = {
        email: 'testgmail.com',
        password: '232a'
      };

      // Act
      const response = await request(app)
        .post('/api/auth/login')
        .send(payload)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json');

      // Assert
      expect(response.status).toBe(400);
      expect(response.badRequest).toBe(true);
    });

    it('fail login with invalid password', async () => {
      // Arrange
      const payload = {
        email: 'ss@gmail.com',
        password: '54543544'
      };

      // Act
      const response = await request(app)
        .post('/api/auth/login')
        .send(payload)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json');

      // Assert
      expect(response.status).toBe(400);
      expect(response.badRequest).toBe(true);
    });

    it('fail login with not exist email in system', async () => {
      // Arrange
      const payload = {
        email: 'notfound@gmail.com',
        password: '9872234s'
      };

      // Act
      const response = await request(app)
        .post('/api/auth/login')
        .send(payload)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json');

      // Assert
      expect(response.status).toBe(404);
      expect(response.notFound).toBe(true);
    });
  });

  describe('register user', () => {
    it('successful register with valid payload', async () => {
      // Arrange
      const payload = {
        email: 'testr@gmail.com',
        username: 'testUsername',
        password: '9872234s'
      };

      // Act
      const response = await request(app)
        .post('/api/auth/register')
        .send(payload)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json');

      // Assert
      expect(response.status).toBe(201);
    });
  });

  afterAll(async () => {
    await prisma.user.delete({
      where: {
        email: 'testr@gmail.com'
      }
    });

    await prisma.user.delete({
      where: {
        email: 'ss@gmail.com'
      }
    });
  });
});
