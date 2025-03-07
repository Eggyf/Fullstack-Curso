const blogRouter = require('express').Router()
// const blog = require('../models/blog');
const Blog = require('../models/blog')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({});
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

blogRouter.post('/',  async (request, response) => {
  const body = request.body

  // if(!body.title || !body.url){
  //   response.status(400).json({ error: 'Title and url are required' });
  // }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes

  })

  const savedBlog = await blog.save()
  response.status(201).json(savedBlog)
})

blogRouter.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const result = await Blog.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).json({ error: 'Blog post not found' });
    }
    res.status(204).end(); // No contenido (204 No Content)
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error deleting blog post' });
  }
});


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