const _ = require("lodash");

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce(
    (accumulator, currentValue) => accumulator + currentValue.likes,
    0,
  );
};

const favoriteBlog = (blogs) => {
  const favorite = blogs.reduce((max, current) =>
    max.likes > current.likes ? max : current,
  );
  return {
    title: favorite.title,
    author: favorite.author,
    likes: favorite.likes,
  };
};

// TODO: not working with empty list
const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return {};
  }
  const result = _.chain(blogs)
    .countBy("author")
    .toPairs()
    .maxBy(([author, count]) => count)
    .value();

  return {
    author: result[0],
    blogs: result[1],
  };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
};
