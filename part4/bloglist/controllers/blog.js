const blogRouter = require('express').Router()
const User = require('../models/user');
const Blog = require('../models/blog')
const jwt = require('jsonwebtoken')

// const getTokenFrom = request => {
//   const authorization = request.get('authorization')
//   if(authorization && authorization.startsWith('Bearer ')){
//     return authorization.replace('Bearer ','')
//   }
//   return null;
// }

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user');
  response.json(blogs)
})

blogRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if (blog) {
    response.json(blog)
  } else {
    response.status(404).end()
  }
})


blogRouter.post('/', async (request, response) => {
  if (!request.user) {
    return response.status(401).json({ error: 'Autenticación requerida' })
  }

  const blogData = {
    ...request.body,
    user: request.user._id
  }

  const blog = new Blog(blogData)
  const savedBlog = await blog.save()
  
  // Actualizar usuario
  request.user.blogs = request.user.blogs.concat(savedBlog._id)
  await request.user.save()

  response.status(201).json(savedBlog)
})


blogRouter.delete('/:id', async (request, response) => {
  if (!request.user) {
    
    return response.status(401).json({ error: 'Authentication needed' })
  }

  const blog = await Blog.findById(request.params.id)
  
  if (!blog) return response.status(404).end()
  
  if (blog.user.toString() !== request.user._id.toString()) {
    return response.status(403).json({ error: 'You do not have permission ' })
  }

  await Blog.findByIdAndDelete(request.params.id)
  
  // Actualizar usuario
  request.user.blogs = request.user.blogs.filter(b => b.toString() !== blog.id)
  await request.user.save()

  response.status(204).end()
})




blogRouter.put('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const updatedBlog = await Blog.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedBlog) {
      return res.status(404).json({ error: 'Blog post not found' });
    }
    res.json(updatedBlog);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error updating blog post' });
  }
});



module.exports = blogRouter