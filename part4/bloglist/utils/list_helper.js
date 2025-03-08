const User = require('../models/user')
const dummy = (blogs) => {
    if(blogs !== undefined){

        return 1;
    }
    else{
        return 0;
    }
  }
const totalLikes = (blogs) => {
    const reducer = (sum,item) => {
        return sum + item.likes;
    }
    return blogs.reduce(reducer,0)
}

const favoriteBlog = (blogs) => {
    if (blogs.length === 0) {
      return null; 
    }
  
    return blogs.reduce((maxLikesBlog, currentBlog) => {
      return currentBlog.likes > maxLikesBlog.likes ? currentBlog : maxLikesBlog;
    }, blogs[0]);
  }

  const mostBlogs = (blogs) => {
    if (blogs.length === 0) {
      return null; 
    }
  
    const authors = {};
  
    blogs.forEach(blog => {
      if (authors[blog.author]) {
        authors[blog.author]++;
      } else {
        authors[blog.author] = 1;
      }
    });
  
    let maxBlogs = 0;
    let topAuthor = '';
  
    for (const author in authors) {
      if (authors[author] > maxBlogs) {
        maxBlogs = authors[author];
        topAuthor = author;
      }
    }
  
    return {
      author: topAuthor,
      blogs: maxBlogs,
    };
  }


  const mostLikes = (blogs) => {
    if (blogs.length === 0) {
      return null; // Opcionalmente, puedes lanzar un error o devolver un objeto vacío
    }
  
    const authors = {};
  
    blogs.forEach(blog => {
      if (authors[blog.author]) {
        authors[blog.author] += blog.likes;
      } else {
        authors[blog.author] = blog.likes;
      }
    });
  
    let maxLikes = 0;
    let topAuthor = '';
  
    for (const author in authors) {
      if (authors[author] > maxLikes) {
        maxLikes = authors[author];
        topAuthor = author;
      }
    }
  
    return {
      author: topAuthor,
      likes: maxLikes,
    };
  }

  const usersInDb = async () => {
    const users = await User.find({})
    return users.map(u => u.toJSON())
  }
  
  
  module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes,
    usersInDb
  }



