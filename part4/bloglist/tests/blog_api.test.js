const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const bcrypt = require('bcrypt')
const api = supertest(app)

const initialBlogs = [
  {
    title: 'HTML is easy',
    author: 'Abdel Fregel',
    url: 'ashdsadja',
    likes: 5
  },
]

let validToken
let userId
let testUser

beforeEach(async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})

  const passwordHash = await bcrypt.hash('sekret', 10)
  testUser = new User({ username: 'root', passwordHash, blogs: [] })
  await testUser.save()

  const loginResponse = await api.post('/api/login').send({ username: 'root', password: 'sekret' })
  validToken = loginResponse.body.token
  userId = testUser.id

  const blogObject = new Blog(initialBlogs[0])
  blogObject.user = userId
  await blogObject.save()

  testUser.blogs = testUser.blogs.concat(blogObject._id)
  await testUser.save()
})

test('blog list is returned as json', async () => {
  const response = await api
    .get('/api/blogs')
    .expect('Content-Type', /application\/json/)
    .expect(200)

  assert.strictEqual(response.body.length, 1)
})

test('blog posts have id property', async () => {
  const response = await api
    .get('/api/blogs')
    .expect(200)

  assert.ok(response.body[0].id)
  assert.ok(!response.body[0]._id)
})

test('creating a new blog post increases total count by one', async () => {
  const initialBlogs = await Blog.find({})
  assert.strictEqual(initialBlogs.length, 1)

  const newBlog = {
    title: 'New Blog Post',
    author: 'Author Name',
    url: 'https://example.com',
    likes: 15,
  }

  await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${validToken}`)
    .send(newBlog)
    .expect(201)

  const finalBlogs = await Blog.find({})
  assert.strictEqual(finalBlogs.length, 2)
})

test('missing likes property defaults to 0', async () => {
  const newBlog = {
    title: 'New Blog Post',
    author: 'Author Name',
    url: 'https://example.com',
  }

  await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${validToken}`)
    .send(newBlog)
    .expect(201)

  const createdBlog = await Blog.findOne({ title: newBlog.title })
  assert.strictEqual(createdBlog.likes, 0)
})

describe('POST /api/blogs', () => {
  test('missing title property returns 400', async () => {
    const newBlog = {
      author: 'Author Name',
      url: 'https://example.com',
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${validToken}`)
      .send(newBlog)
      .expect(400)
  })

  test('missing url property returns 400', async () => {
    const newBlog = {
      title: 'New Blog Post',
      author: 'Author Name',
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${validToken}`)
      .send(newBlog)
      .expect(400)
  })

  test('creating a blog without token fails with 401', async () => {
    const newBlog = {
      title: 'New Blog Post',
      author: 'Author Name',
      url: 'https://example.com',
      likes: 15
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401)
  })
})

describe('DELETE /api/blogs/:id', () => {
  test('deleting a blog post returns 204', async () => {
    const newBlog = {
      title: 'New Blog Post',
      author: 'Author Name',
      url: 'https://example.com',
      likes: 5
    }

    const createdBlog = new Blog(newBlog)
    createdBlog.user = userId
    await createdBlog.save()

    testUser.blogs = testUser.blogs.concat(createdBlog._id)
    await testUser.save()

    await api
      .delete(`/api/blogs/${createdBlog._id}`)
      .set('Authorization', `Bearer ${validToken}`)
      .expect(204)

    const remainingBlogs = await Blog.find({})
    assert.strictEqual(remainingBlogs.length, 1)
  })

  test('deleting a non-existent blog post returns 404', async () => {
    await api
      .delete('/api/blogs/1234567890abcdef12345678')
      .set('Authorization', `Bearer ${validToken}`)
      .expect(404)
  })

  test('deleting a blog without token fails with 401', async () => {
    const newBlog = {
      title: 'New Blog Post',
      author: 'Author Name',
      url: 'https://example.com',
      likes: 5
    }

    const createdBlog = new Blog(newBlog)
    createdBlog.user = userId
    await createdBlog.save()

    testUser.blogs = testUser.blogs.concat(createdBlog._id)
    await testUser.save()

    await api
      .delete(`/api/blogs/${createdBlog._id}`)
      .expect(401)
  })

  test('deleting a blog by wrong user fails with 403', async () => {
    const newBlog = {
      title: 'New Blog Post',
      author: 'Author Name',
      url: 'https://example.com',
      likes: 5
    }

    const createdBlog = new Blog(newBlog)
    createdBlog.user = userId
    await createdBlog.save()

    testUser.blogs = testUser.blogs.concat(createdBlog._id)
    await testUser.save()

    const passwordHash = await bcrypt.hash('password', 10)
    const otherUser = new User({ username: 'hacker', passwordHash, blogs: [] })
    await otherUser.save()

    const otherLogin = await api.post('/api/login').send({ username: 'hacker', password: 'password' })
    const otherToken = otherLogin.body.token

    await api
      .delete(`/api/blogs/${createdBlog._id}`)
      .set('Authorization', `Bearer ${otherToken}`)
      .expect(403)
  })
})

describe('PUT /api/blogs/:id', () => {
  test('updating likes of a blog post returns updated blog', async () => {
    const newBlog = {
      title: 'New Blog Post',
      author: 'Author Name',
      url: 'https://example.com',
      likes: 7
    }

    const createdBlog = new Blog(newBlog)
    createdBlog.user = userId
    await createdBlog.save()

    testUser.blogs = testUser.blogs.concat(createdBlog._id)
    await testUser.save()

    const updateData = { likes: createdBlog.likes + 1 }

    const response = await api
      .put(`/api/blogs/${createdBlog._id}`)
      .send(updateData)
      .expect(200)

    assert.strictEqual(response.body.likes, createdBlog.likes + 1)
  })

  test('updating a non-existent blog post returns 404', async () => {
    await api
      .put('/api/blogs/1234567890abcdef12345678')
      .send({ likes: 10 })
      .expect(404)
  })
})

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await User.find({})

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await User.find({})
    assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    assert(usernames.includes(newUser.username))
  })

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await User.find({})

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'salainen',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await User.find({})
    assert(result.body.error.includes('expected `username` to be unique'))

    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })
})

after(async () => {
  await mongoose.connection.close()
})
