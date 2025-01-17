const blogsRouter = require("express").Router();
const Blog = require("../models/blog");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});

blogsRouter.post("/", async (request, response, next) => {
  // const blog = new Blog(request.body);
  const body = request.body;

  try {
    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes || 0,
    });

    const savedBlog = await blog.save();

    console.log(savedBlog);

    response.status(201).json(savedBlog);
  } catch (error) {
    next(error);
  }
});

// blogsRouter.post("/", (request, response) => {
//   const blog = new Blog(request.body);
//
//   blog.save().then((result) => {
//     response.status(201).json(result);
//   });
// });

module.exports = blogsRouter;
