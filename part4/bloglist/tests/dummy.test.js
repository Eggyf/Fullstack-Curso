const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  assert.strictEqual(result, 1)
})

describe('total likes', () => {
    const listWithOneBlog = [
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
        likes: 5,
        __v: 0
      }
    ]
  
    test('when list has only one blog, equals the likes of that', () => {
      const result = listHelper.totalLikes(listWithOneBlog)
      assert.strictEqual(result, 5)
    })
  })



describe('favoriteBlog', () => {
  test('returns the blog with the most likes', () => {
    const blogs = [
      { title: "Canonical string reduction", author: "Edsger W. Dijkstra", likes: 12 },
      { title: "Another blog", author: "Someone Else", likes: 8 },
      { title: "Most liked blog", author: "John Doe", likes: 15 },
    ];

    const expectedBlog = {
      title: "Most liked blog",
      author: "John Doe",
      likes: 15,
    };
    const result = listHelper.favoriteBlog(blogs);
    assert.deepStrictEqual(result,expectedBlog)
  });

  test('returns one of the blogs if there are multiple with the same max likes', () => {
    const blogs = [
      { title: "Blog 1", author: "Author 1", likes: 10 },
      { title: "Blog 2", author: "Author 2", likes: 10 },
      { title: "Blog 3", author: "Author 3", likes: 5 },
    ];

    const result = listHelper.favoriteBlog(blogs);
    assert(result.likes,10);
  });

  test('returns null if the list is empty', () => {
    const blogs = [];

    assert.deepStrictEqual(listHelper.favoriteBlog(blogs),null);
  });
});




describe('mostBlogs', () => {
  test('returns the author with the most blogs', () => {
    const blogs = [
      { title: "Clean Code", author: "Robert C. Martin", likes: 10 },
      { title: "Clean Architecture", author: "Robert C. Martin", likes: 8 },
      { title: "Clean Agile", author: "Robert C. Martin", likes: 12 },
      { title: "Refactoring", author: "Martin Fowler", likes: 5 },
    ];

    const expectedAuthor = {
      author: "Robert C. Martin",
      blogs: 3,
    };

    assert.deepStrictEqual(listHelper.mostBlogs(blogs),expectedAuthor)
  });

  test('returns one of the authors if there are multiple with the same max blogs', () => {
    const blogs = [
      { title: "Blog 1", author: "Author 1", likes: 10 },
      { title: "Blog 2", author: "Author 1", likes: 8 },
      { title: "Blog 3", author: "Author 2", likes: 12 },
      { title: "Blog 4", author: "Author 2", likes: 5 },
    ];

    const result = listHelper.mostBlogs(blogs);
    assert.strictEqual(result.blogs,2);
  });

  test('returns null if the list is empty', () => {
    const blogs = [];
    assert.deepStrictEqual(listHelper.mostBlogs(blogs),null)
  });
});




describe('mostLikes', () => {
  test('returns the author with the most likes', () => {
    const blogs = [
      { title: "Canonical string reduction", author: "Edsger W. Dijkstra", likes: 12 },
      { title: "Another blog", author: "Edsger W. Dijkstra", likes: 5 },
      { title: "Blog by someone else", author: "Someone Else", likes: 8 },
    ];

    const expectedAuthor = {
      author: "Edsger W. Dijkstra",
      likes: 17,
    };

    assert.deepStrictEqual(listHelper.mostLikes(blogs),expectedAuthor);
  });

  test('returns one of the authors if there are multiple with the same max likes', () => {
    const blogs = [
      { title: "Blog 1", author: "Author 1", likes: 10 },
      { title: "Blog 2", author: "Author 1", likes: 7 },
      { title: "Blog 3", author: "Author 2", likes: 10 },
      { title: "Blog 4", author: "Author 2", likes: 7 },
    ];

    const result = listHelper.mostLikes(blogs);
    assert.strictEqual(result.likes,17);
  });

  test('returns null if the list is empty', () => {
    const blogs = [];
    assert.deepStrictEqual(listHelper.mostLikes(blogs),null);
  });
});

