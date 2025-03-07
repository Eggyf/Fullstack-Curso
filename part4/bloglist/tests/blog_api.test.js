const { test, after,beforeEach,describe} = require('node:test')

const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog =require('../models/blog')
const { title } = require('process')

const initialBlogs = [
  {
    title: 'HTML is easy',
    author: 'Abdel Fregel',
    url: 'ashdsadja',
    likes: 5
  },
  
]

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()
  
})


  test('blog list is returned as json', async () => {
  
    const response = await api
      .get('/api/blogs')
      .expect('Content-Type', /application\/json/)
      .expect(200);

      assert.deepStrictEqual(response.body.length, initialBlogs.length)
  });

  test('blog posts have id property', async () => {
    const response = await api
      .get('/api/blogs')
      .expect(200);
  
    assert.ok(response.body[0].id)
    assert.ok(!response.body[0]._id)
  });

  test('creating a new blog post increases total count by one', async () => {
    const initialBlogs = await Blog.find({});
    assert.strictEqual(initialBlogs.length,1)

    const newBlog = {
      title: 'New Blog Post',
      author: 'Author Name',
      url: 'https://example.com',
      likes: 15
    };

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201);

    const finalBlogs = await Blog.find({});
    assert.strictEqual(finalBlogs.length,2)

    
  });

  test('missing likes property defaults to 0', async () => {
    const newBlog = {
      title: 'New Blog Post',
      author: 'Author Name',
      url: 'https://example.com',
    };

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201);

    const createdBlog = await Blog.findOne({ title: newBlog.title });
    assert.strictEqual(createdBlog.likes,0);
  });

  describe('POST /api/blogs', () => {
    test('missing title property returns 400', async () => {
      const newBlog = {
        author: 'Author Name',
        url: 'https://example.com',
      };
  
        await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400);
    });
  
    test('missing url property returns 400', async () => {
      const newBlog = {
        title: 'New Blog Post',
        author: 'Author Name',
      };
  
        await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400);
    });
  });

  


after(async () => {
  await mongoose.connection.close()
})